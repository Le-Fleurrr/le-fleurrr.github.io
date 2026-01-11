// Import all album images
import hurryUpTomorrow from '../assets/img/hurryUpTomorrow.png';
import rodeo from '../assets/img/rodeo.jpg';
import collegeDropout from '../assets/img/theCollegeDropout.jpg';
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
    vinylColor: "clear",
    sleeveColor: "orange",
    description: "The Weeknd çoxdan gözlənilən son albomu."
  },
  {
    id: 2,
    title: "Rodeo",
    artist: "Travis Scott",
    price: 130,
    genre: "Hip-Hop/Rap",
    year: 2015,
    image: rodeo,
    vinylColor: "orange",
    sleeveColor: "brown",
    description: "Travis Skottun hit mahnılardan ibarət debüt studiya albomu."
  },
  {
    id: 3,
    title: "The College Dropout",
    artist: "Kanye West",
    price: 150,
    genre: "Hip-Hop",
    year: 2004,
    image: collegeDropout,
    vinylColor: "black",
    sleeveColor: "yellow",
    description: "Kanye West-in debüt albomu."
  },
  {
    id: 4,
    title: "Whole Lotta Red",
    artist: "Playboi Carti",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2020,
    isNew: true,
    image: wholeLottaRed,
    vinylColor: "red",
    sleeveColor: "red",
    description: "20-ci illərin ən son və ən yaxşı qəzəb albomu."
  },
  {
    id: 5,
    title: "Call Me If You Get Lost",
    artist: "Tyler, The Creator",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2021,
    image: callMeIfYouGetLost,
    vinylColor: "blue",
    sleeveColor: "green",
    description: "Taylerin Qremmi mükafatı qazanan şah əsəri."
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
    vinylColor: "purple",
    sleeveColor: "gray",
    description: "Future və Metro Boomin birlikdə əla duet olduqlarını sübut etməyə davam edirlər."
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