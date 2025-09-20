export const modelsData = [
  {
    id: 1,
    name: "Ana",
    age: 25,
    height: "179cm",
    bust: "80cm",
    waist: "62cm",
    hips: "87cm",
    shoes: "40",
    experience: "2 años",
    location: "Madrid",
    photos: [
      "/placeholder-1-1.jpg",
      "/placeholder-1-2.jpg",
      "/placeholder-1-3.jpg",
      "/placeholder-1-4.jpg"
    ],
    description: "Modelo profesional con experiencia en moda y editorial. Especializada en fotografía de moda y pasarela.",
    specialties: ["Moda", "Editorial", "Pasarela"],
    availability: "Disponible",
    contact: "ana@linemodels.com"
  },
  {
    id: 2,
    name: "María",
    age: 23,
    height: "175cm",
    bust: "85cm",
    waist: "60cm",
    hips: "90cm",
    shoes: "39",
    experience: "3 años",
    location: "Barcelona",
    photos: [
      "/placeholder-2-1.jpg",
      "/placeholder-2-2.jpg",
      "/placeholder-2-3.jpg"
    ],
    description: "Modelo versátil con experiencia en publicidad y catálogos. Trabaja tanto en estudio como en exteriores.",
    specialties: ["Publicidad", "Catálogos", "Estudio"],
    availability: "Disponible",
    contact: "maria@linemodels.com"
  },
  {
    id: 3,
    name: "Carlos",
    age: 28,
    height: "185cm",
    bust: "95cm",
    waist: "80cm",
    hips: "95cm",
    shoes: "42",
    experience: "4 años",
    location: "Valencia",
    photos: [
      "/placeholder-3-1.jpg",
      "/placeholder-3-2.jpg",
      "/placeholder-3-3.jpg",
      "/placeholder-3-4.jpg",
      "/placeholder-3-5.jpg"
    ],
    description: "Modelo masculino especializado en moda masculina y editorial. Experiencia internacional.",
    specialties: ["Moda Masculina", "Editorial", "Internacional"],
    availability: "Disponible",
    contact: "carlos@linemodels.com"
  },
  {
    id: 4,
    name: "Luis",
    age: 26,
    height: "182cm",
    bust: "90cm",
    waist: "75cm",
    hips: "92cm",
    shoes: "41",
    experience: "1 año",
    location: "Sevilla",
    photos: [
      "/placeholder-4-1.jpg",
      "/placeholder-4-2.jpg"
    ],
    description: "Modelo emergente con gran potencial. Especializado en fotografía de producto y lifestyle.",
    specialties: ["Producto", "Lifestyle", "Emergente"],
    availability: "Disponible",
    contact: "luis@linemodels.com"
  },
  {
    id: 5,
    name: "Sofia",
    age: 24,
    height: "177cm",
    bust: "82cm",
    waist: "58cm",
    hips: "85cm",
    shoes: "38",
    experience: "5 años",
    location: "Madrid",
    photos: [
      "/placeholder-5-1.jpg",
      "/placeholder-5-2.jpg",
      "/placeholder-5-3.jpg",
      "/placeholder-5-4.jpg"
    ],
    description: "Modelo senior con amplia experiencia en alta costura y editorial de lujo. Trabaja con las mejores marcas.",
    specialties: ["Alta Costura", "Lujo", "Editorial"],
    availability: "Disponible",
    contact: "sofia@linemodels.com"
  },
  {
    id: 6,
    name: "Diego",
    age: 27,
    height: "188cm",
    bust: "98cm",
    waist: "82cm",
    hips: "98cm",
    shoes: "43",
    experience: "3 años",
    location: "Bilbao",
    photos: [
      "/placeholder-6-1.jpg",
      "/placeholder-6-2.jpg",
      "/placeholder-6-3.jpg"
    ],
    description: "Modelo atlético especializado en deporte y lifestyle. Perfecto para campañas deportivas.",
    specialties: ["Deporte", "Lifestyle", "Atlético"],
    availability: "Disponible",
    contact: "diego@linemodels.com"
  },
  {
    id: 7,
    name: "Elena",
    age: 22,
    height: "173cm",
    bust: "78cm",
    waist: "56cm",
    hips: "82cm",
    shoes: "37",
    experience: "2 años",
    location: "Málaga",
    photos: [
      "/placeholder-7-1.jpg",
      "/placeholder-7-2.jpg",
      "/placeholder-7-3.jpg",
      "/placeholder-7-4.jpg"
    ],
    description: "Modelo joven y versátil. Especializada en moda juvenil y redes sociales.",
    specialties: ["Moda Juvenil", "Redes Sociales", "Versátil"],
    availability: "Disponible",
    contact: "elena@linemodels.com"
  },
  {
    id: 8,
    name: "Roberto",
    age: 30,
    height: "190cm",
    bust: "100cm",
    waist: "85cm",
    hips: "100cm",
    shoes: "44",
    experience: "6 años",
    location: "Madrid",
    photos: [
      "/placeholder-8-1.jpg",
      "/placeholder-8-2.jpg"
    ],
    description: "Modelo senior con experiencia en moda masculina de lujo y editorial. Referente en el sector.",
    specialties: ["Lujo", "Editorial", "Senior"],
    availability: "Disponible",
    contact: "roberto@linemodels.com"
  }
];

export const getModelById = (id) => {
  return modelsData.find(model => model.id === parseInt(id));
};
