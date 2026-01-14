const afterHours = {
  cover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768395280/afterHours_xelwg2.jpg",
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768226152/afterHours_vinyl_utwxsx.jpg"],
  tracklist: "",
};

const dawnFM = {
  cover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226154/dawnFM_eu62ye.jpg",
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768226155/dawnFM_vinyl_qranjt.jpg"],
  tracklist: ""
};

const hurryUpTomorrow = {
  cover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226158/hurryUpTomorrow_tqkjsu.png",
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768320957/hurryUpTomorrow_vinyl_uczbnq.png"],
  tracklist: ""
};

const rodeo = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226174/rodeo_arm5ez.jpg',
  vinyl: [],
  tracklist: ""
};

const collegeDropout = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226175/theCollegeDropout_asoeiz.jpg',
  vinyl: [],
  tracklist: ""
};

const musicWhite = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226167/musicWhite_nd1rsi.jpg',
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768226171/musicWhite_vinyl_wfsgve.jpg"],
  tracklist: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226167/musicWhite_tl_m74a4g.png",
  features: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226166/musicWhite_feats_go3pmr.jpg"
};

const wholeLottaRed = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226181/WLR_llw1gy.png',
  vinyl: ["https://res.cloudinary.com/deroy68n9/image/upload/v1768319053/WLR_Vinyl_gi2cye.png"],
  tracklist: ""
};

const callMeIfYouGetLost = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226152/callMeIfYouGetLost_acytlc.jpg',
  vinyl: [],
  tracklist: ""
};

const weStillDontTrustYou = {
  cover: 'https://res.cloudinary.com/deroy68n9/image/upload/v1768226181/weStillDontTrustYou_tqhqf6.jpg',
  vinyl: [],
  tracklist: ""
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
    isExplicit: true,
    image: hurryUpTomorrow.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768299871/hurryUpTomorrow_animated_klrcv2.gif",
    vinylImages: hurryUpTomorrow.vinyl,
    tracklistImage: hurryUpTomorrow.tracklist,
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
    isExplicit: true,
    image: rodeo.cover,
    vinylImages: rodeo.vinyl,
    tracklistImage: rodeo.tracklist,
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
    isExplicit: true,
    image: collegeDropout.cover,
    vinylImages: collegeDropout.vinyl,
    tracklistImage: collegeDropout.tracklist,
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
    isExplicit: true,
    image: wholeLottaRed.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768226187/WLR_Animated_v6qd6j.gif",
    vinylImages: wholeLottaRed.vinyl,
    tracklistImage: wholeLottaRed.tracklist,
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
    isExplicit: true,
    image: callMeIfYouGetLost.cover,
    vinylImages: callMeIfYouGetLost.vinyl,
    tracklistImage: callMeIfYouGetLost.tracklist,
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
    isExplicit: true,
    image: weStillDontTrustYou.cover,
    vinylImages: weStillDontTrustYou.vinyl,
    tracklistImage: weStillDontTrustYou.tracklist,
    vinylColor: "purple",
    sleeveColor: "gray",
    accentColor: "purple",
    description: "Future və Metro Boomin birlikdə əla duet olduqlarını sübut etməyə davam edirlər."
  },
  {
    id: 7,
    title: "After Hours",
    artist: "The Weeknd",
    price: 150,
    genre: "R&B/Soul",
    year: 2020,
    isNew: true,
    isExplicit: true,
    image: afterHours.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768330013/afterHours_animated_siuhga.gif",
    vinylImages: afterHours.vinyl,
    tracklistImage: afterHours.tracklist,
    vinylColor: "black",
    sleeveColor: "yellow",
    accentColor: "yellow",
    description: "The Weeknd tərəfindən inanılmaz bir trilogiyanın başlanğıcı."
  },
  {
    id: 8,
    title: "Dawn FM",
    artist: "The Weeknd",
    price: 150,
    genre: "R&B/Soul",
    year: 2022,
    isNew: true,
    isExplicit: true,
    image: dawnFM.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768395800/dawnFM_animated_e7930y.gif",
    vinylImages: dawnFM.vinyl,
    tracklistImage: dawnFM.tracklist,
    vinylColor: "black",
    sleeveColor: "blue",
    accentColor: "blue",
    description: "The Weeknd tərəfindən inanılmaz bir trilogiyanın ortası."
  },
  {
    id: 9,
    title: "MUSIC (White)",
    artist: "Playboi Carti",
    price: 150,
    genre: "Hip-Hop/Rap",
    year: 2025,
    isNew: true,
    isExplicit: true,
    image: musicWhite.cover,
    animatedCover: "https://res.cloudinary.com/deroy68n9/image/upload/v1768399223/music_syouu6.gif",
    vinylImages: musicWhite.vinyl,
    tracklistImage: musicWhite.tracklist,
    featuresImage: musicWhite.features,
    vinylColor: "black",
    sleeveColor: "white",
    accentColor: "white",
    description: "Playboi Carti-nin 30 mahnıdan ibarət son albomu 5 illik gözləmədən sonra işıq üzü gördü."
  },
];