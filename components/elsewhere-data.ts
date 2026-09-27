/**
 * Elsewhere chapter source.
 * `photographs` is the eventual gallery order. The cover is only the
 * representative frame used by the landing selector — it is not necessarily first.
 */

export type ElsewherePhoto = {
  title: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  caption?: string;
  date: string;
  location: string;
};

export type ElsewhereCollection = {
  id: string;
  number: string;
  name: string;
  line: string;
  coverTitle: string;
  coverCaption: string;
  featuredPosition: string;
  slicePosition: string;
  photographs: readonly ElsewherePhoto[];
};

function photo(
  folder: string,
  file: string,
  width: number,
  height: number,
  alt: string,
  title: string,
  caption: string | undefined,
  date: string,
  location: string,
): ElsewherePhoto {
  return {
    title,
    alt,
    width,
    height,
    caption,
    date,
    location,
    src: encodeURI(`/elsewhere/${folder}/${file}.png`),
  };
}

const stJohnsFile = "St. John\u2019s, Between";

export const elsewhereCollections: readonly ElsewhereCollection[] = [
  {
    id: "roots",
    number: "01",
    name: "Roots",
    line: "Where the story started.",
    coverTitle: "Sonar Bangla",
    coverCaption: "The sky the country is named for.",
    featuredPosition: "center 50%",
    slicePosition: "center 52%",
    photographs: [
      photo(
        "roots",
        "Before Elsewhere",
        1086,
        1448,
        "Two children on a concrete bridge above green fields, silhouetted against a sunset sky",
        "Before Elsewhere",
        "Childhood, when the road was still a place to play.",
        "Feb 18, 2018",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
      photo(
        "roots",
        "In Between",
        1448,
        1086,
        "A child by rocks in front of a weathered shrine and a pink-railed mosque, with sun through the trees",
        "In Between",
        "Two faiths. One childhood.",
        "Apr 6, 2018",
        "Ratargul, Sylhet, Bangladesh",
      ),
      photo(
        "roots",
        "Ekla Cholo",
        1448,
        1086,
        "Two people in a small boat on a wide river under a pale blue sky",
        "Ekla Cholo",
        "Some distances stay yours alone, even when shared.",
        "May 18, 2018",
        "Hakaluki Haor, Sylhet, Bangladesh",
      ),
      photo(
        "roots",
        "Sonar Bangla",
        1672,
        941,
        "A wide river at sunset, the sun on the horizon and two figures in a narrow boat",
        "Sonar Bangla",
        "The sky the country is named for.",
        "Dec 18, 2020",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
    ],
  },
  {
    id: "ordinary-days",
    number: "02",
    name: "Ordinary Days",
    line: "The things that would be easy to walk past.",
    coverTitle: "2936",
    coverCaption: "One last departure before dark.",
    featuredPosition: "66% 48%",
    slicePosition: "74% 44%",
    photographs: [
      photo(
        "ordinary-days",
        "Before Morning",
        1447,
        1087,
        "A person walking along a foggy road as a motorcycle headlight approaches through the mist",
        "Before Morning",
        "The fields don't wait for the sun.",
        "Dec 5, 2020",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
      photo(
        "ordinary-days",
        "Same Sun",
        1447,
        1087,
        "A person carrying shoulder baskets across a flooded field at sunset, the sun reflected in the water",
        "Same Sun",
        "I stopped for the sunset. He kept walking home.",
        "Jan 24, 2020",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
      photo(
        "ordinary-days",
        "The Third",
        1447,
        1087,
        "Birds perched on power lines against a pale grey sky, with a utility pole at the left",
        "The Third",
        "No place stays empty for long.",
        "Aug 22, 2020",
        "Dhanmondi, Dhaka, Bangladesh",
      ),
      photo(
        "ordinary-days",
        "A Living Bridge",
        1524,
        1032,
        "A person standing in a narrow boat with a long pole beside a steep riverbank",
        "A Living Bridge",
        "Where nothing connects the two sides, someone does.",
        "Jun 13, 2020",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
      photo(
        "ordinary-days",
        "2936",
        1447,
        1087,
        "A blue and yellow locomotive numbered 2936 beside a station platform at dusk",
        "2936",
        "One last departure before dark.",
        "Mar 30, 2020",
        "Maijgaon Railway Station, Sylhet, Bangladesh",
      ),
      photo(
        "ordinary-days",
        "Still, the Light",
        1445,
        1089,
        "A barred window in a dark room, with the sun setting behind trees outside",
        "Still, the Light",
        "The room stayed dark. The window didn't.",
        "May 28, 2023",
        "Fenchuganj, Sylhet, Bangladesh",
      ),
    ],
  },
  {
    id: "new-ground",
    number: "03",
    name: "New Ground",
    line: "Learning to look at somewhere unfamiliar.",
    coverTitle: "St. John's, Between",
    coverCaption: "The sun leaves the horizon just as the city begins to glow.",
    featuredPosition: "center 42%",
    slicePosition: "center 67%",
    photographs: [
      photo(
        "new-ground",
        "Fourteen Days Away",
        1446,
        1087,
        "A glass of coffee on a windowsill, looking through a screen at a parking lot and distant hills",
        "Fourteen Days Away",
        "My first days in Canada, seen through a quarantine window.",
        "May 25, 2021",
        "Macpherson College, St. John\u2019s, NL, Canada",
      ),
      photo(
        "new-ground",
        stJohnsFile,
        1445,
        1089,
        "St. John's at dusk, with city lights along the harbour, a crescent moon, and cars on a hillside road",
        "St. John's, Between",
        "The sun leaves the horizon just as the city begins to glow.",
        "Jun 4, 2020",
        "Signal Hill, St. John\u2019s, NL, Canada",
      ),
      photo(
        "new-ground",
        "Smoke Through the Trees",
        1445,
        1089,
        "A bare tree lit by a streetlamp under a deep blue evening sky, with a thin moon above",
        "Smoke Through the Trees",
        "The camera saw branches. I saw smoke.",
        "Feb 20, 2022",
        "Memorial University, St. John\u2019s, NL, Canada",
      ),
      photo(
        "new-ground",
        "Out of Focus",
        1462,
        1076,
        "A bright moon in a cloudy night sky above houses and distant city lights",
        "Out of Focus",
        "Some nights, even the moon is better left a little unclear.",
        "May 15, 2022",
        "Freshwater Road, St. John\u2019s, NL, Canada",
      ),
      photo(
        "new-ground",
        "Where We Land",
        1398,
        1038,
        "A small stack of stones on a pebble beach, with water and a far shore under heavy clouds",
        "Where We Land",
        "Someone else stood here too, and left something behind.",
        "Jul 9, 2020",
        "Bell Island, NL, Canada",
      ),
      photo(
        "new-ground",
        "A Little More Alive",
        1519,
        1035,
        "A fallen tree with exposed roots on a shoreline at dusk, the sky fading from blue to peach",
        "A Little More Alive",
        "The tree didn't change. I did, by the time I left.",
        "Apr 29, 2022",
        "Frenchman\u2019s Bay, Pickering, ON, Canada",
      ),
    ],
  },
  {
    id: "beyond",
    number: "04",
    name: "Beyond",
    line: "Places that asked me to look a little longer.",
    coverTitle: "From Where It Flies",
    coverCaption: "To us, the water is thunder. To the gull, it's just another flight.",
    featuredPosition: "42% 46%",
    slicePosition: "40% 43%",
    photographs: [
      photo(
        "beyond",
        "The Living Gallery",
        1088,
        1445,
        "People browsing paintings hung outside a shop on a cobbled street",
        "The Living Gallery",
        "Even old stone can hold something new for a while.",
        "Sep 4, 2025",
        "Qu\u00e9bec City, QC, Canada",
      ),
      photo(
        "beyond",
        "Through the Years",
        1445,
        1088,
        "Two people walking away down a long carved stone colonnade",
        "Through the Years",
        "My parents, side by side among centuries of stories.",
        "Jul 2, 2023",
        "Ekambareswarar Temple, Kanchipuram, Tamil Nadu, India",
      ),
      photo(
        "beyond",
        "Toward the Sacred",
        1086,
        1448,
        "A long staircase of visitors leading up to a large seated Buddha statue",
        "Toward the Sacred",
        "No one comes here for the same reason. Everyone still comes.",
        "Apr 27, 2026",
        "Ngong Ping, Hong Kong",
      ),
      photo(
        "beyond",
        "Two in a City",
        1527,
        1030,
        "Two birds on a rooftop ledge against a sunlit city skyline",
        "Two in a City",
        "Out of the whole skyline, they ended up on the same ledge.",
        "Jun 26, 2023",
        "Vellore, Tamil Nadu, India",
      ),
      photo(
        "beyond",
        "From Where It Flies",
        1536,
        1024,
        "A gull in flight against the white water of a waterfall",
        "From Where It Flies",
        "To us, the water is thunder. To the gull, it's just another flight.",
        "Apr 27, 2022",
        "Niagara Falls, ON, Canada",
      ),
    ],
  },
  {
    id: "at-home",
    number: "05",
    name: "At Home",
    line: "The smaller world waiting when I come back.",
    coverTitle: "Rhaenys & Vivi",
    coverCaption: "Named after dragons. No fire, no wings. Still somehow ruling the house.",
    featuredPosition: "center 62%",
    slicePosition: "center 58%",
    photographs: [
      photo(
        "at-home",
        "Rhaenys & Vivi",
        704,
        1520,
        "Two long-haired cats sitting side by side, one tabby and one black and white",
        "Rhaenys & Vivi",
        "Named after dragons. No fire, no wings. Still somehow ruling the house.",
        "Feb 14, 2025",
        "St. John\u2019s, NL, Canada",
      ),
      photo(
        "at-home",
        "Restless Paws",
        1448,
        1086,
        "A black-and-white cat lying on its side on a patterned carpet beside a yellow spring toy",
        "Restless Paws",
        "Vivi is happiest with the door closed, and a natural escape artist the moment it opens.",
        "Sep 24, 2026",
        "St. John\u2019s, NL, Canada",
      ),
      photo(
        "at-home",
        "Resting Paws",
        1088,
        1445,
        "A tabby cat asleep inside a black bag on a sofa",
        "Resting Paws",
        "Rhaenys, while her sister plots an escape, is usually deciding between her next meal and her next nap.",
        "Oct 5, 2024",
        "St. John\u2019s, NL, Canada",
      ),
    ],
  },
];

export function collectionCover(collection: ElsewhereCollection) {
  const cover = collection.photographs.find((item) => item.title === collection.coverTitle);
  if (!cover) {
    throw new Error(`Elsewhere cover not found for ${collection.id}`);
  }
  return cover;
}

export function collectionCountLabel(collection: ElsewhereCollection) {
  return `${String(collection.photographs.length).padStart(2, "0")} photographs`;
}
