export type CarPhoto = {
  id: string;
  url: string;
  alt: string;
  caption: string;
};

export type CarCategory = {
  slug: string;
  title: string;
  description: string;
  photos: CarPhoto[];
};

const photo = (
  id: string,
  url: string,
  alt: string,
  caption: string,
): CarPhoto => ({ id, url, alt, caption });

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

const images = {
  sedanSilver: "photo-1618843479313-40f8afb4b4d8",
  sedanWhite: "photo-1549399542-7e3f8b79c341",
  sedanRed: "photo-1494976388531-d1058494cdd8",
  sedanGray: "photo-1502877338535-766e1452684a",
  sedanBlue: "photo-1542362567-b07e54358753",
  suvSnow: "photo-1606664515524-ed2f786a0bd6",
  suvRed: "photo-1549317661-bd32c8ce0db2",
  suvLuxury: "photo-1617531653332-bd46c24f2068",
  evCrossover: "photo-1619767886558-efdc259cde1a",
  sportsYellow: "photo-1503376780353-7e6692767b70",
  sportsRed: "photo-1544636331-e26879cd4d9b",
  sportsBlue: "photo-1552519507-da3b142c6e3d",
  sportsWhite: "photo-1580273916550-e323be2ae537",
  sportsBlack: "photo-1492144534655-ae79c964c9d7",
} as const;

export const categories: CarCategory[] = [
  {
    slug: "sedans",
    title: "Sedans",
    description:
      "Comfortable four-door cars built for daily driving, commuting, and long highway miles with balanced efficiency and refinement.",
    photos: [
      photo(
        "sedan-1",
        unsplash(images.sedanSilver),
        "Silver sedan on a city street",
        "Urban executive sedan",
      ),
      photo(
        "sedan-2",
        unsplash(images.sedanWhite),
        "White sedan parked at sunset",
        "Premium midsize sedan",
      ),
      photo(
        "sedan-3",
        unsplash(images.sportsBlack),
        "Black sedan in a showroom",
        "Sport-tuned sedan",
      ),
      photo(
        "sedan-4",
        unsplash(images.sedanRed),
        "Red sedan on an open road",
        "Performance-oriented sedan",
      ),
      photo(
        "sedan-5",
        unsplash(images.sedanGray),
        "Gray sedan front three-quarter view",
        "Luxury sedan profile",
      ),
      photo(
        "sedan-6",
        unsplash(images.sedanBlue),
        "Blue sedan driving through mountains",
        "All-season touring sedan",
      ),
    ],
  },
  {
    slug: "suvs",
    title: "SUVs",
    description:
      "Raised ride height, flexible cargo space, and all-weather capability for families, road trips, and weekend adventures.",
    photos: [
      photo(
        "suv-1",
        unsplash(images.suvRed),
        "White SUV on a dirt trail",
        "Off-road capable SUV",
      ),
      photo(
        "suv-2",
        unsplash(images.suvLuxury),
        "Black SUV in an urban setting",
        "Compact crossover SUV",
      ),
      photo(
        "suv-3",
        unsplash(images.suvSnow),
        "SUV driving through snow",
        "All-wheel-drive SUV",
      ),
      photo(
        "suv-4",
        unsplash(images.suvLuxury),
        "Family SUV at a campsite",
        "Family adventure SUV",
      ),
      photo(
        "suv-5",
        unsplash(images.suvRed),
        "Red SUV on a coastal road",
        "Mid-size SUV",
      ),
      photo(
        "suv-6",
        unsplash(images.suvLuxury),
        "Luxury SUV parked outside a hotel",
        "Luxury three-row SUV",
      ),
    ],
  },
  {
    slug: "electric",
    title: "Electric",
    description:
      "Battery-powered vehicles with instant torque, quiet cabins, and zero tailpipe emissions for modern sustainable mobility.",
    photos: [
      photo(
        "ev-1",
        unsplash(images.evCrossover),
        "White electric car charging",
        "Home charging setup",
      ),
      photo(
        "ev-2",
        unsplash(images.sedanGray),
        "Electric sedan at a charging station",
        "Fast-charging capable EV",
      ),
      photo(
        "ev-3",
        unsplash(images.evCrossover),
        "Electric crossover on a city street",
        "Urban electric crossover",
      ),
      photo(
        "ev-4",
        unsplash(images.sedanSilver),
        "Electric car interior with large screen",
        "Minimalist EV cabin",
      ),
      photo(
        "ev-5",
        unsplash(images.sedanRed),
        "Red electric sports car",
        "Performance electric coupe",
      ),
      photo(
        "ev-6",
        unsplash(images.suvLuxury),
        "Electric SUV in a studio shot",
        "Long-range electric SUV",
      ),
    ],
  },
  {
    slug: "sports",
    title: "Sports Cars",
    description:
      "Low-slung, high-performance machines engineered for sharp handling, rapid acceleration, and pure driving excitement.",
    photos: [
      photo(
        "sports-1",
        unsplash(images.sportsYellow),
        "Yellow sports car on a track",
        "Track-focused sports car",
      ),
      photo(
        "sports-2",
        unsplash(images.sportsRed),
        "Red sports car cornering hard",
        "Mid-engine supercar",
      ),
      photo(
        "sports-3",
        unsplash(images.sportsBlue),
        "Blue sports car in a garage",
        "American muscle coupe",
      ),
      photo(
        "sports-4",
        unsplash(images.sportsWhite),
        "White sports car on a coastal highway",
        "Grand touring coupe",
      ),
      photo(
        "sports-5",
        unsplash(images.sportsBlack),
        "Black sports car at night",
        "Night-drive sports coupe",
      ),
      photo(
        "sports-6",
        unsplash(images.sportsRed),
        "Orange sports car on a mountain road",
        "Lightweight roadster",
      ),
    ],
  },
];

export const categoryNavItems = categories.map(({ slug, title }) => ({
  slug,
  title,
}));
