// Product catalog scraped from https://my-store-fa717a.creator-spring.com/
// Each product links back to the Creator-Spring listing for checkout.

export const CATEGORIES = [
  { slug: "all",        name: "All Drops",        blurb: "Every design, every fit." },
  { slug: "graphic",    name: "Graphic Tees",     blurb: "Bold print, statement energy." },
  { slug: "vintage",    name: "Vintage",          blurb: "Worn-in Americana with attitude." },
  { slug: "travel",     name: "Travel & Surf",    blurb: "Beach club approved." },
  { slug: "streetwear", name: "Streetwear",       blurb: "Hoodies, heavy tees, layers." },
  { slug: "minimal",    name: "Minimal",          blurb: "Clean lines, quiet flex." },
  { slug: "trendy",     name: "Trendy Designs",   blurb: "Right now, right here." },
];

const img = (id) => `https://mockup-api.teespring.com/v3/image/${id}/800/800.jpg`;

export const PRODUCTS = [
  // ───────── Find Yourself and Be That (motivational / minimal / trendy)
  { id: "fy-1",  design: "Find Yourself and Be That", type: "Classic Crew Neck T-Shirt",   price: 22.99, image: img("IPVczzPtuJRsWQjlbfARe9p15po"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=2&variation=6046",   colors:["Denim Blue","Black","Forest","Smoke Gray","Purple"], categories:["minimal","trendy","graphic"] },
  { id: "fy-2",  design: "Find Yourself and Be That", type: "Heavy Tee",                   price: 44.99, image: img("KwnTVvzGeC26-arE7t022qmH_Wk"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=2256&variation=106465", colors:["Black"], categories:["streetwear","minimal"] },
  { id: "fy-3",  design: "Find Yourself and Be That", type: "Premium Pullover Hoodie",     price: 40.99, image: img("TytDaTFXjkGmHQMEDbK5sEr2-Go"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=227&variation=2664",   colors:["Black","Dark Heather"], categories:["streetwear","minimal"] },
  { id: "fy-4",  design: "Find Yourself and Be That", type: "Crewneck Sweatshirt",         price: 32.99, image: img("DIuguN3QVpB0txyUPRoUg_1u0g4"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=345&variation=6354",   colors:["Black","Deep Forest"], categories:["streetwear","minimal"] },
  { id: "fy-5",  design: "Find Yourself and Be That", type: "Comfort Tee",                 price: 23.99, image: img("Y2dlXwwUZ_wmITfBYdIylPmQuTw"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=369&variation=6513",   colors:["Black","Purple"], categories:["minimal","trendy"] },
  { id: "fy-6",  design: "Find Yourself and Be That", type: "Long Sleeve Tee",             price: 30.99, image: img("YwUPyi0VBQZin8fqCK1S6OKZaZI"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=11&variation=360",     colors:["Black","Forest","Heather","Purple"], categories:["minimal","streetwear"] },
  { id: "fy-7",  design: "Find Yourself and Be That", type: "Women's Classic Tee",         price: 23.99, image: img("r9ZSY451CTR_m5b-jPRDVZPHXCg"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=87&variation=2325",    colors:["Black","Charcoal","Purple"], categories:["minimal","trendy"] },
  { id: "fy-8",  design: "Find Yourself and Be That", type: "Women's Crop Tee",            price: 26.99, image: img("MeaTioaN5MLQoXhPLL3bVPMACWM"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=2442&variation=106864", colors:["Black"], categories:["trendy","minimal"] },
  { id: "fy-9",  design: "Find Yourself and Be That", type: "Mug",                          price: 15.99, image: img("SLi3HC9qxgXBjgN0-byNA_SwP5o"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=1565&variation=104921", colors:["White"], categories:["minimal"] },
  { id: "fy-10", design: "Find Yourself and Be That", type: "Die Cut Sticker",             price: 6.99,  image: img("doVXDUhJUnPM28WJC6eXuNcCRXs"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=794&variation=103544",  colors:["—"], categories:["trendy","minimal"] },
  { id: "fy-11", design: "Find Yourself and Be That", type: "Slides",                       price: 50.99, image: img("NMddf0N_xxYKZaObFBIqWD6jpzk"), url: "https://my-store-fa717a.creator-spring.com/listing/find-yourself-and-be-that-2026?product=1896&variation=105384", colors:["Black"], categories:["streetwear","trendy"] },

  // ───────── Beach Club Party Time (travel/surf)
  { id: "bc-1", design: "Beach Club Party Time", type: "Classic Pullover Hoodie", price: 40.99, image: img("Vn6nOST-NhjxAGHDcy_By0u3zIs"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=212&variation=5819", colors:["Black","Royal","Charcoal","Navy"], categories:["travel","streetwear"] },
  { id: "bc-2", design: "Beach Club Party Time", type: "Premium Hoodie",          price: 40.99, image: img("mAFd9vd9booRbQDNbPo7a1okTPE"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=227&variation=2664", colors:["Black","Heather","Royal"], categories:["travel","streetwear"] },
  { id: "bc-3", design: "Beach Club Party Time", type: "Women's Crop Tee",        price: 26.99, image: img("HAhl-8g4WML54Cj9ysD9spbiwGI"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=2442&variation=106867", colors:["Coal","Navy"], categories:["travel","trendy"] },
  { id: "bc-4", design: "Beach Club Party Time", type: "Women's Classic Tee",     price: 23.99, image: img("HpYjhBwW3Vach0GUPWJ6SkGne1Y"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=87&variation=2325",  colors:["Black","Navy","Charcoal","Royal"], categories:["travel","graphic"] },
  { id: "bc-5", design: "Beach Club Party Time", type: "Tote Bag",                price: 29.99, image: img("V17N_gB828t7US0H7sUDTY_K9rQ"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=526&variation=101936", colors:["Natural"], categories:["travel"] },
  { id: "bc-6", design: "Beach Club Party Time", type: "Die Cut Sticker",         price: 6.99,  image: img("qjY7DxfoIzgAw0H0aPtRLxFTza0"), url: "https://my-store-fa717a.creator-spring.com/listing/get-beach-club-party-time?product=794&variation=103544", colors:["—"], categories:["travel"] },

  // ───────── Texas Rodeo (vintage)
  { id: "tx-1", design: "Texas Rodeo", type: "Classic Pullover Hoodie",   price: 40.99, image: img("oCTt0FQKv8IxssKqOwXbUy4f3Q4"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=212&variation=5818",  colors:["White","Charcoal","Sport Grey"], categories:["vintage","streetwear"] },
  { id: "tx-2", design: "Texas Rodeo", type: "Premium Pullover Hoodie",   price: 40.99, image: img("XYS7yfh5ACvadrEtiz3oo75VESY"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=227&variation=6083",  colors:["White","Heather"], categories:["vintage","streetwear"] },
  { id: "tx-3", design: "Texas Rodeo", type: "Heavy Tee",                  price: 44.99, image: img("d3VS_TzHauASmGIHwW-BYvc1gKw"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=2256&variation=106464", colors:["White"], categories:["vintage","graphic"] },
  { id: "tx-4", design: "Texas Rodeo", type: "Classic Crew Neck Tee",     price: 22.99, image: img("J3U_nGcnr2Y8Agpj71o7T5jvdoI"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=2&variation=2122",    colors:["White","Smoke Gray"], categories:["vintage","graphic"] },
  { id: "tx-5", design: "Texas Rodeo", type: "Women's Crop Tee",          price: 26.99, image: img("r_HKBU2vv5Vnl6RiKLfQyXsA338"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=2442&variation=106865", colors:["Vintage"], categories:["vintage","trendy"] },
  { id: "tx-6", design: "Texas Rodeo", type: "Women's Classic Tee",       price: 23.99, image: img("1bcPLo0xWj-UjgulxP9PUSFvM1U"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=87&variation=2335",    colors:["Pink","White","Charcoal","Heliconia","Sport Grey"], categories:["vintage","trendy"] },
  { id: "tx-7", design: "Texas Rodeo", type: "Tote Bag",                  price: 29.99, image: img("F36-cOZ8uiMY9v6s7uQ348EBvc0"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=526&variation=101936",   colors:["Natural"], categories:["vintage","travel"] },
  { id: "tx-8", design: "Texas Rodeo", type: "Black Mug",                 price: 18.99, image: img("P64Lg3A5YX7e2JEPo9Nz78yRHQ8"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=1637&variation=105025", colors:["Black"], categories:["vintage"] },
  { id: "tx-9", design: "Texas Rodeo", type: "Die Cut Sticker",           price: 6.99,  image: img("wiEAZEu1igN2fVyzhFsBus8nTJQ"), url: "https://my-store-fa717a.creator-spring.com/listing/texas-rodeo-2026?product=794&variation=103544",   colors:["—"], categories:["vintage"] },

  // ───────── You don't always need a plan (minimal/trendy)
  { id: "pl-1", design: "You don't always need a plan", type: "Premium Ring-Spun Tee",   price: 24.99, image: img("CcT8eYBM4qKskO9c5IWG-yWr3eU"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=46&variation=2742", colors:["Black","Navy"], categories:["minimal","trendy","graphic"] },
  { id: "pl-2", design: "You don't always need a plan", type: "Classic Pullover Hoodie", price: 40.99, image: img("JdvjPrJ_iaxdZM7ErrND5M3baSQ"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=212&variation=5832", colors:["Heather","Black","Purple","Navy","Forest"], categories:["minimal","streetwear"] },
  { id: "pl-3", design: "You don't always need a plan", type: "Premium Hoodie",          price: 40.99, image: img("L9dXDxzqVo6hh6JyROVtsnEJ06Y"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=227&variation=2666", colors:["Heather","Black"], categories:["streetwear","minimal"] },
  { id: "pl-4", design: "You don't always need a plan", type: "Comfort Tee",             price: 23.99, image: img("H5xGg4qAPm1oTcXuDT3iIjeBnC4"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=369&variation=6513", colors:["Black","Navy","Purple"], categories:["minimal","trendy"] },
  { id: "pl-5", design: "You don't always need a plan", type: "Mug",                      price: 15.99, image: img("KsjJp45u_zdrFJdGJHgS_qYfcWc"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=1565&variation=104921", colors:["White","Navy"], categories:["minimal"] },
  { id: "pl-6", design: "You don't always need a plan", type: "Long Sleeve Tee",         price: 30.99, image: img("VWhIerRJb71OWRWvvi4hJYkjDKc"), url: "https://my-store-fa717a.creator-spring.com/listing/you-don-t-always-need-a-p-2024?product=11&variation=365", colors:["Heather","Forest","Black","Navy","Purple"], categories:["minimal","streetwear"] },

  // ───────── You are what you watch (graphic/streetwear)
  { id: "yw-1", design: "You are what you watch", type: "Premium Ring-Spun Tee",  price: 24.99, image: img("1Sy_qtgXyCARQkZL4HzcJAv17Go"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=46&variation=2739", colors:["White","Royal"], categories:["graphic","streetwear","trendy"] },
  { id: "yw-2", design: "You are what you watch", type: "Classic Pullover Hoodie",price: 40.99, image: img("uvHH_MgBS7iECe6kfLTguLGeH50"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=212&variation=5818", colors:["White","Royal","Forest"], categories:["graphic","streetwear"] },
  { id: "yw-3", design: "You are what you watch", type: "Comfort Tee",            price: 23.99, image: img("UOvxq82VxyarwSjJ_QL3tsckwBc"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=369&variation=6512", colors:["White","Royal"], categories:["graphic","trendy"] },
  { id: "yw-4", design: "You are what you watch", type: "Crew Neck Tee",          price: 22.99, image: img("wLu_xwUJqD9mfzNEm7qN9l58JFU"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=2&variation=103056", colors:["Pink","Royal","Denim","Forest","White"], categories:["graphic","trendy"] },
  { id: "yw-5", design: "You are what you watch", type: "Crewneck Sweatshirt",    price: 32.99, image: img("anNDFmAHrf3UsSiRjaajvmqxt6Q"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=345&variation=6356", colors:["Royal","Forest"], categories:["streetwear","graphic"] },
  { id: "yw-6", design: "You are what you watch", type: "Long Sleeve Tee",        price: 30.99, image: img("Qu3M9vmL6dQWHtdDdL3gNxQ0RfU"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=11&variation=2486", colors:["White","Forest","Royal"], categories:["graphic","streetwear"] },
  { id: "yw-7", design: "You are what you watch", type: "Mug",                     price: 15.99, image: img("21d4ZWwm8StaiD5O00Zh5WU4Ksw"), url: "https://my-store-fa717a.creator-spring.com/listing/you-are-what-you-watch-2024?product=1565&variation=104920", colors:["White"], categories:["graphic"] },

  // ───────── Welcome to America (vintage/streetwear)
  { id: "wa-1", design: "Welcome to America", type: "Premium Ring-Spun Tee",   price: 24.99, image: img("MpCNZAdhSWRJZ_og_Ypq6ek1Fys"), url: "https://my-store-fa717a.creator-spring.com/listing/welcome-to-america-august-2024?product=46&variation=2742", colors:["Black","Navy"], categories:["vintage","streetwear","graphic"] },
  { id: "wa-2", design: "Welcome to America", type: "Classic Pullover Hoodie", price: 40.99, image: img("DWMR30UMIwn1HlT_jpR1XGe5Qmw"), url: "https://my-store-fa717a.creator-spring.com/listing/welcome-to-america-august-2024?product=212&variation=5832", colors:["Heather","Black","Purple","Navy","Forest"], categories:["vintage","streetwear"] },
];

// Round-robin interleave by design so the "All" view shows variety,
// not 11 same-design tees in a row.
const interleaveByDesign = (list) => {
  const buckets = {};
  list.forEach(p => { (buckets[p.design] ||= []).push(p); });
  const queues = Object.values(buckets);
  const out = [];
  while (queues.some(q => q.length)) {
    queues.forEach(q => q.length && out.push(q.shift()));
  }
  return out;
};

export const getProductsByCategory = (slug) => {
  if (slug === "all") return interleaveByDesign(PRODUCTS);
  return interleaveByDesign(PRODUCTS.filter(p => p.categories.includes(slug)));
};

export const getDesigns = () => {
  const seen = new Set();
  return PRODUCTS.filter(p => {
    if (seen.has(p.design)) return false;
    seen.add(p.design); return true;
  });
};
