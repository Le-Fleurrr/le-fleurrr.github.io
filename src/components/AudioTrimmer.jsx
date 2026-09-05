const ffmpeg = Require('fluent-ffmpeg');
const path = Require('path');
const fs = Require('fs');

/**
 * Trim an audio file to a specific segment
 * @param {string} inputPath - Path to input audio file
 * @param {string} outputPath - Path to save trimmed audio
 * @param {number} startTime - Start time in seconds
 * @param {number} duration - Duration in seconds
 * @returns {Promise} - Resolves when trimming is complete
 */
function trimAudio(inputPath, outputPath, startTime = 30, duration = 30) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(duration)
      .output(outputPath)
      .audioCodec('libmp3lame')
      .audioBitrate('128k')
      .on('end', () => {
        console.log(`✓ Trimmed: ${path.basename(outputPath)}`);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error(`✗ Error trimming ${inputPath}:`, err.message);
        reject(err);
      })
      .run();
  });
}

/**
 * Batch trim multiple audio files
 * @param {Array} tracks - Array of track objects with audio paths
 * @param {string} outputDir - Directory to save trimmed files
 */
async function batchTrimAudio(tracks, outputDir = './public/audio/previews') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const track of tracks) {
    if (!track.audio) continue;

    const inputPath = track.audio;
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(outputDir, `${filename}_preview.mp3`);

    try {
      await trimAudio(inputPath, outputPath, track.previewStart || 30, track.previewDuration || 30);
      
      track.preview = outputPath;
    } catch (error) {
      console.error(`Failed to trim ${inputPath}`);
    }
  }

  console.log('\n✓ All audio files trimmed!');
  return tracks;
}

/**
 * Download audio from URL and trim it
 * @param {string} url - URL of audio file
 * @param {string} outputPath - Where to save trimmed file
 * @param {number} startTime - Start time in seconds
 * @param {number} duration - Duration in seconds
 */
async function downloadAndTrim(url, outputPath, startTime = 30, duration = 30) {
  const https = Require('https');
  const tempPath = '/tmp/' + path.basename(outputPath);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tempPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        trimAudio(tempPath, outputPath, startTime, duration)
          .then(() => {
            fs.unlinkSync(tempPath);
            resolve(outputPath);
          })
          .catch(reject);
      });
    }).on('error', (err) => {
      fs.unlink(tempPath, () => {});
      reject(err);
    });
  });
}
if (require.main === module) {
  trimAudio(
    './audio/song.mp3',
    './audio/previews/song_preview.mp3',
    30,
    30
  );
  const albumTracks = [
    { title: "Track 1", audio: "./audio/track1.mp3", previewStart: 45 },
    { title: "Track 2", audio: "./audio/track2.mp3", previewStart: 30 },
  ];
}

module.exports = {
  trimAudio,
  batchTrimAudio,
  downloadAndTrim
};