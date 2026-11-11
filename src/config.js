// ============================================================
//  EDIT THIS FILE to change the site. No code changes needed.
//  While demoMode is true, demo images, demo video, demo reviews
//  and demo numbers are shown with a DEMO label.
//  When you set demoMode to false (launch), everything marked
//  demo is HIDDEN automatically, so fake content cannot go live.
// ============================================================
window.STORE = {
  demoMode: true,

  name: 'Sinila',
  tagline: 'Kitchen helpers for small homes',
  announcement: 'Pay online and save ₹50  ·  Cash on delivery available',

  product: {
    name: '2-in-1 Glass Oil Sprayer & Pourer, 500 ml',
    capacity: '500 ml',
    body: 'Clear glass',
    lid: 'Food-grade, BPA-free polypropylene',
    pack: 'Pack of 1 bottle',
    origin: 'India'
  },

  // Packs shown in the order form. The first one is the main price.
  packs: [
    { id: 'one', label: '1 bottle', qty: 1, price: 349 },
    { id: 'two', label: '2 bottles', qty: 2, price: 599, badge: 'Best value' }
  ],

  // Rupees off the whole order when paying online.
  prepaidDiscount: 50,
  // Advance paid online on cash on delivery orders (keeps fake orders out). 0 = off.
  codAdvance: 49,

  deliveryText: 'Delivery in 7-10 working days',
  shippingNote: 'Free delivery across India',   // confirm this is true before launch

  contactEmail: 'you@example.com',
  contactPhone: '+91 00000 00000',
  whatsapp: '',                                  // e.g. '919XXXXXXXXX'
  instagram: '',                                 // e.g. 'https://instagram.com/yourpage'

  // Google Apps Script web app URL (we connect this in the next step).
  scriptUrl: 'https://script.google.com/macros/s/AKfycbwzWE-OYAlzTL3Tx4ioSJIgW0jVEEahHJk1H2SYFcuvnvAt-KWwZA5wao45iPG3ffIa1w/exec',

  // ---- REAL content goes here when your sample arrives ----
  images: [],        // e.g. ['img/1.jpg', 'img/2.jpg']  (your own photos)
  videoUrl: '',      // e.g. 'video/demo.mp4'            (your own video)
  videoPoster: '',   // e.g. 'img/poster.jpg'

  // The honest proof section. Measure it yourself:
  // pour oil into a spoon once, then spray 10 times into another spoon.
  proof: { pourMl: 15, sprayMl: 3, oil: 'sunflower oil', demo: true },   // set demo:false after YOUR measurement

  // ---- Languages shown in the toggle ----
  languages: [
    { code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' },
    { code: 'ml', label: 'മലയാളം' }, { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'ta', label: 'தமிழ்' }
  ],

  // YouTube review videos, one list per language. Paste only the video ID
  // (the part after v= in the link). Leave a language empty until you record it.
  youtube: { en: [], hi: [], ml: [], kn: [], ta: [] },
  // Example: en: [ { id: 'dQw4w9WgXcQ', title: 'Sinila oil sprayer review' } ]

  // Videos posted by real customers (only with their permission).
  // { src: 'video/a.mp4', poster: 'img/a.jpg', handle: '@name', platform: 'Instagram' }
  customerVideos: [],

  // Your own posts. { platform: 'Instagram', url: 'https://...', image: 'img/post1.jpg', caption: '...' }
  socialPosts: [],

  company: {
    address: 'Your address, Whitefield, Bengaluru 560066',
    hours: 'Mon to Sat, 10 am to 6 pm',
    mapsUrl: '',      // paste the Google Maps share link
    mapEmbed: '',     // paste the embed link (src of the iframe from Google Maps > Share > Embed)
    demo: true
  },

  // Only add REAL reviews from your own customers, with their permission.
  // Anything with demo:true is hidden automatically at launch.
  reviews: [
    { name: 'Demo Customer', city: 'Pune', stars: 5, demo: true,
      text: 'Demo text. Replace with what a real customer wrote about the sprayer.' },
    { name: 'Demo Customer', city: 'Bengaluru', stars: 4, demo: true,
      text: 'Demo text. Replace with a real review after your first deliveries.' },
    { name: 'Demo Customer', city: 'Kochi', stars: 5, demo: true,
      text: 'Demo text. Real reviews only. Never copy reviews from other sellers.' }
  ]
};

// ---------- HOME PAGE CONTENT (demo until launch) ----------
window.STORE.company = {
  name: 'Sinila',
  legalName: 'Your registered business name',   // fill when registered
  address: 'Your street, area, Bengaluru 560066',  // real address
  phone: '+91 00000 00000',
  email: 'you@example.com',
  hours: 'Mon-Sat, 10:00-18:00',
  mapEmbedUrl: ''   // Google Maps embed link, e.g. https://www.google.com/maps/embed?pb=...
};

window.STORE.socials = [
  { platform: 'Instagram', url: '', handle: '@sinila' },
  { platform: 'YouTube', url: '', handle: 'Sinila' },
  { platform: 'Facebook', url: '', handle: 'Sinila' }
];

// Our own social posts. Each one links to the real post.
window.STORE.posts = [
  { caption: 'Demo post. Replace with your real Instagram post.', url: '', demo: true },
  { caption: 'Demo post. Replace with a real post.', url: '', demo: true },
  { caption: 'Demo post. Replace with a real post.', url: '', demo: true }
];

// Customer and review videos. Each video can have a version per language.
// Add a language by adding its code to `languages` below and to the videos.
window.STORE.languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'kn', label: 'ಕನ್ನಡ' }
];
window.STORE.videos = [
  { title: 'Demo: first-week review', city: 'Kochi', demo: true,
    languages: { en: { src: '', poster: '' }, ml: { src: '', poster: '' } } },
  { title: 'Demo: how I cut oil use', city: 'Pune', demo: true,
    languages: { en: { src: '', poster: '' }, hi: { src: '', poster: '' } } },
  { title: 'Demo: kitchen tour', city: 'Bengaluru', demo: true,
    languages: { en: { src: '', poster: '' }, ta: { src: '', poster: '' } } }
];

// ---------- PRODUCTS (add a new item here when you launch it) ----------
window.STORE.products = [
  { slug: 'oil-sprayer', name: '2-in-1 Glass Oil Sprayer & Pourer', short: 'Spray and pour, 500 ml',
    price: 349, image: '', status: 'live', badge: 'Best seller' },
  { slug: 'coming-1', name: 'New product', short: 'Coming soon', price: null, image: '', status: 'soon' },
  { slug: 'coming-2', name: 'New product', short: 'Coming soon', price: null, image: '', status: 'soon' },
  { slug: 'coming-3', name: 'New product', short: 'Coming soon', price: null, image: '', status: 'soon' }
];
// Short social videos for the horizontal strip. Each product can have its own.
window.STORE.socialReels = [
  { title: 'Oil sprayer in action', product: 'oil-sprayer', src: '', poster: '', demo: true },
  { title: 'Pour mode for tadka', product: 'oil-sprayer', src: '', poster: '', demo: true },
  { title: 'Kitchen tour', product: 'oil-sprayer', src: '', poster: '', demo: true },
  { title: 'Customer reel', product: 'oil-sprayer', src: '', poster: '', demo: true }
];

// ---------- PRODUCT PAGE ----------
// Your own YouTube review of the product (shown above the customer reviews).
window.STORE.channelVideo = { title: 'Our review: 2-in-1 oil sprayer', youtubeId: '', src: '', poster: '', demo: true };
