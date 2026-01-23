const AntagonistDaggerShirt = {
  front: "https://res.cloudinary.com/deroy68n9/image/upload/v1769007844/Antagonist-Tour-2.0-Dagger-T-Shi_q4fagc.png",
  additionalImages: ["https://res.cloudinary.com/deroy68n9/image/upload/v1769007842/Antagonist-Tour-2.0-Dagger-T-Shirt1_zvfoyr.png"],
};

const OpiumAntagonistShirt = {
  front: "https://res.cloudinary.com/deroy68n9/image/upload/v1769008335/Opium-Antagonist-Tour-2.0-T-Shirt_xfz5h4.png",
  additionalImages: ["https://res.cloudinary.com/deroy68n9/image/upload/v1769008334/Opium-Antagonist-Tour-2.0-T-Shir_onzpbw.png"]
};

export const Merch = [
  {
    id: 1,
    title: "ANTAGONIST 2.0 DAGGER T-SHIRT",
    artist: ["Playboi Carti"],
    price: 75,
    year: 2025,
    isNew: true,
    size: ["S", "M", "L", "XL"],
    image: AntagonistDaggerShirt.front,
    additionalImages: AntagonistDaggerShirt.additionalImages,
    color: "Qara",
    category: "Apparel",
    description: "Heavyweight T-Shirt with screen printed graphics.",
    material: "100% Cotton"
  },
  {
    id: 2,
    title: "OPIUM ANTAGONIST 2.0 T-SHIRT",
    artist: ["Playboi Carti"],
    price: 75,
    year: 2025,
    isNew: true,
    size: ["S", "M", "L", "XL"],
    image: OpiumAntagonistShirt.front,
    additionalImages: OpiumAntagonistShirt.additionalImages,
    color: "Qara",
    category: "Apparel",
    description: "Heavyweight T-Shirt with screen printed graphics.",
    material: "100% Cotton"
  },
];
