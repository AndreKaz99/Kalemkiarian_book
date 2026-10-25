/**
 * Central content & asset configuration.
 * Edit copy, links and image paths here — components read from this file.
 */

export const AMAZON_URL = "https://www.amazon.com/What-Want-Tell-You-Messages/dp/B0HJ6VY2RB";

export const site = {
  url: "https://andrekaz99.github.io/Kalemkiarian_book", // live address — update if a custom domain is added
  title: "What I Want to Tell You Is...",
  subtitle: "Messages From Your Child About Divorce",
  author: "Sharon L. Kalemkiarian",
  publisher: "Sahag-Mesrob Press West",
  description:
    "A powerful collection of messages that invites parents to experience divorce through the eyes of their children. By Sharon L. Kalemkiarian.",
};

/** Prefixes a /public path with the deployment base path (needed for GitHub Pages). */
export const withBasePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

/**
 * Image assets.
 * Set `src` to a file in /public/images (e.g. "/images/book-cover.jpg") to
 * replace a placeholder. While `src` is null, a clearly labelled placeholder renders.
 */
export const assets = {
  bookCover: {
    src: "/images/book-cover.jpg" as string | null,
    alt: "Cover of What I Want to Tell You Is... by Judge Sharon L. Kalemkiarian",
  },
  bookBackCover: {
    src: "/images/book-back-cover.jpg",
    alt: "Back cover of What I Want to Tell You Is...",
  },
  titlePage: {
    src: "/images/title-page.jpg",
    alt: "Title page of What I Want to Tell You Is..., Sahag-Mesrob Press West, San Diego, California",
  },
  authorPortrait: {
    src: "/images/sharon-kalemkiarian.jpg" as string | null, // replace with a higher-resolution photo when available
    alt: "Judge Sharon L. Kalemkiarian smiling, arms folded, in front of framed artwork and Armenian embroidery",
  },
  pressArchive: {
    src: null as string | null, // e.g. "/images/sahag-mesrob-press.jpg" — historical photograph, any landscape ratio
    alt: "Historical photograph of the original Sahag-Mesrob Press",
  },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "The Book", href: "#the-book" },
  { label: "About the Author", href: "#author" },
  { label: "Why She Wrote It", href: "#why" },
  { label: "Our Publishing Legacy", href: "#legacy" },
];

export const themes = [
  {
    key: "conflict",
    title: "The weight of conflict",
    summary: "The emotional impact of parental conflict",
    body:
      "Children feel the tension between their parents long before they can name it. The book considers how disagreement, even when unspoken, settles on a child, and why an end to the conflict matters so deeply to them.",
  },
  {
    key: "listening",
    title: "Learning to listen",
    summary: "Hearing what children struggle to say",
    body:
      "Confused, frightened, or afraid of upsetting a parent, children often stay silent, or speak through their behavior instead. The messages invite parents to listen for what lies beneath.",
  },
  {
    key: "coparenting",
    title: "Difficult decisions",
    summary: "Co-parenting through schedules, moves & holidays",
    body:
      "Parenting schedules, relocation, holidays, and life between two households: the everyday decisions of co-parenting, seen from the perspective of the child who lives them.",
  },
  {
    key: "safety",
    title: "Safe & loved",
    summary: "Helping children feel protected by both parents",
    body:
      "Beneath every message is a simple wish: to feel loved and protected by both parents. The book helps parents make more compassionate choices with that wish in mind.",
  },
];

export const coparentingTopics = [
  "Parenting schedules",
  "Relocation",
  "Holidays",
  "Parental conflict",
  "Two households",
];
