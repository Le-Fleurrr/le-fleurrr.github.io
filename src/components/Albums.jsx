// Import all album images
import hurryUpTomorrow from '../assets/img/hurryUpTomorrow.jpg';
import rodeo from '../assets/img/rodeo.jpg';
import collegeDropout from '../assets/img/collegeDropout.png';
import wholeLottaRed from '../assets/img/WLR_FullRed.jpg';
import callMeIfYouGetLost from '../assets/img/callMeIfYouGetLost.jpg';
import weStillDontTrustYou from '../assets/img/weStillDontTrustYou.jpg';

// Export albums array
export const albums = [
  {
    id: 1,
    title: "Hurry Up Tomorrow",
    artist: "The Weeknd",
    price: 150,
    genre: "R&B/Soul",
    year: 2025,
    isNew: true,
    image: hurryUpTomorrow,
    description: "The highly anticipated latest album from The Weeknd."
  },
  {
    id: 2,
    title: "Rodeo",
    artist: "Travis Scott",
    price: 130,
    genre: "Hip-Hop/Rap",
    year: 2015,
    image: rodeo,
    description: "Travis Scott's debut studio album featuring hit tracks."
  },
  {
    id: 3,
    title: "The College Dropout",
    artist: "Kanye West",
    price: 150,
    genre: "Hip-Hop",
    year: 2004,
    image: collegeDropout,
    description: "Kanye West's groundbreaking debut album."
  },
  {
    id: 4,
    title: "Whole Lotta Red",
    artist: "Playboi Carti",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2024,
    isNew: true,
    image: wholeLottaRed,
    description: "The latest and best rage album of the '20's."
  },
  {
    id: 5,
    title: "Call Me If You Get Lost",
    artist: "Tyler, The Creator",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2021,
    image: callMeIfYouGetLost,
    description: "Tyler's Grammy-winning masterpiece."
  },
  {
    id: 6,
    title: "We Still Don't Trust You",
    artist: "Future & Metro Boomin",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2024,
    isNew: true,
    image: weStillDontTrustYou,
    description: "Future & Metro Boomin keep proving that they're a great duo together."
  },
];

export const getAlbumById = (id) => {
  return albums.find(album => album.id === id);
};

export const getNewAlbums = () => {
  return albums.filter(album => album.isNew);
};

export const getAlbumsByGenre = (genre) => {
  return albums.filter(album => album.genre === genre);
};