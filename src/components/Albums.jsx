const hurryUpTomorrow = {
  cover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226158/hurryUpTomorrow_tqkjsu.png",
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768320957/hurryUpTomorrow_vinyl_uczbnq.png"]
};

const rodeo = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226174/rodeo_arm5ez.jpg',
  vinyl: []
};

const collegeDropout = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226175/theCollegeDropout_asoeiz.jpg',
  vinyl: []
};

const wholeLottaRed = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226181/WLR_llw1gy.png',
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768319053/WLR_Vinyl_gi2cye.png"]
};

const callMeIfYouGetLost = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226152/callMeIfYouGetLost_acytlc.jpg',
  vinyl: []
};

const weStillDontTrustYou = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226181/weStillDontTrustYou_tqhqf6.jpg',
  vinyl: []
};

export const albums = [
  {
    id: 1,
    title: "Hurry Up Tomorrow",
    artist: "The Weeknd",
    price: 150,
    genre: "R&B/Soul",
    year: 2025,
    isNew: true,
    image: hurryUpTomorrow.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768299871/hurryUpTomorrow_animated_klrcv2.gif",
    vinylImages: hurryUpTomorrow.vinyl ? [hurryUpTomorrow.vinyl] : [],
    vinylColor: "clear",
    sleeveColor: "orange",
    accentColor: "orange",
    description: "The Weeknd çoxdan gözlənilən son albomu."
  },
  {
    id: 2,
    title: "Rodeo",
    artist: "Travis Scott",
    price: 130,
    genre: "Hip-Hop/Rap",
    year: 2015,
    image: rodeo.cover,
    vinylImages: rodeo.vinyl ? [rodeo.vinyl] : [],
    vinylColor: "orange",
    sleeveColor: "brown",
    accentColor: "amber",
    description: "Travis Skottun hit mahnılardan ibarət debüt studiya albomu."
  },
  {
    id: 3,
    title: "The College Dropout",
    artist: "Kanye West",
    price: 150,
    genre: "Hip-Hop",
    year: 2004,
    image: collegeDropout.cover,
    vinylImages: collegeDropout.vinyl ? [collegeDropout.vinyl] : [],
    vinylColor: "orange",
    sleeveColor: "yellow",
    accentColor: "yellow",
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
    image: wholeLottaRed.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226187/WLR_Animated_v6qd6j.gif",
    vinylImages: wholeLottaRed.vinyl,
    vinylColor: "red",
    sleeveColor: "red",
    accentColor: "red",
    description: "20-ci illərin ən son və ən yaxşı qəzəb albomu."
  },
  {
    id: 5,
    title: "Call Me If You Get Lost",
    artist: "Tyler, The Creator",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2021,
    image: callMeIfYouGetLost.cover,
    vinylImages: callMeIfYouGetLost.vinyl ? [callMeIfYouGetLost.vinyl] : [],
    vinylColor: "green",
    sleeveColor: "green",
    accentColor: "green",
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
    image: weStillDontTrustYou.cover,
    vinylImages: weStillDontTrustYou.vinyl ? [weStillDontTrustYou.vinyl] : [],
    vinylColor: "purple",
    sleeveColor: "gray",
    accentColor: "purple",
    description: "Future və Metro Boomin birlikdə əla duet olduqlarını sübut etməyə davam edirlər."
  },
];