export const agency = {
  name: 'Prosperity International Travel Services',
  phone: '0917 875 0596', phoneIntl: '+639178750596', email: 'info@prosperityintltravel.com',
  facebook: 'https://www.facebook.com/prosperityinternationaltravelservices',
  messenger: 'https://m.me/prosperityinternationaltravelservices',
  whatsapp: 'https://wa.me/639178750596',
  viber: 'viber://chat?number=%2B639178750596',
  address: '#001 Rosario Village, Brgy. Sala, Cabuyao, Laguna',
  addressDetail: 'Stall 8, Sukimart', hours: '9:00 AM – 6:00 PM',
};
export type Destination = { slug: string; name: string; region: string; image: string; alt: string; phrase: string; intro: string; moods: string[]; position?: string };
export const destinations: Destination[] = [
 {slug:'japan', name:'Japan', region:'East Asia', image:'/images/japan-fuji.webp', alt:'Mount Fuji beyond a lake framed by cherry blossoms', phrase:'A little wonder, everywhere.', intro:'Cherry blossoms by the lake. The quiet of a temple garden. A city that comes alive after dark. Tell us what draws you to Japan, and we can help you explore travel arrangements that fit your plans.', moods:['City discoveries','Scenery & seasons','Culture & food']},
 {slug:'korea', name:'Korea', region:'East Asia', image:'/images/korea-palace.webp', alt:'Traditional tiled gate of Gyeongbokgung Palace in Seoul', phrase:'Old soul. New discoveries.', intro:'Palace courtyards, neighborhood cafés and lively city streets. Discover a different side of Korea at your own pace, with personal assistance for the practical details.', moods:['Palaces & culture','City breaks','Food & neighborhoods']},
 {slug:'turkey', name:'Türkiye', region:'Europe & Asia', image:'/images/turkey-cappadocia.webp', alt:'Hot air balloons above the rocky valleys of Cappadocia', phrase:'Let your imagination take flight.', intro:'Cappadocia’s extraordinary landscapes set the scene for a journey full of discovery. Share the places you hope to see in Türkiye, and ask our team about available travel arrangements.', moods:['Extraordinary landscapes','Cultural discoveries','Private travel']},
 {slug:'greece', name:'Greece', region:'Europe', image:'/images/greece-santorini.webp', alt:'Blue-domed church overlooking the Aegean Sea in Santorini', phrase:'Stay a little longer.', intro:'Whitewashed streets, blue horizons and unhurried moments by the sea. Let us know the kind of Greece journey you have in mind, from a quiet escape to time exploring with loved ones.', moods:['Island scenery','Time together','Coastal escapes']},
 {slug:'dubai', name:'Dubai', region:'United Arab Emirates', image:'/images/dubai-skyline.webp', alt:'Dubai skyline with the Burj Khalifa under a clear blue sky', phrase:'See a different kind of skyline.', intro:'Modern architecture and a skyline made for looking up. Ask us about travel arrangements for Dubai, whether you are planning a short city break, a family trip or group travel.', moods:['City experiences','Family travel','Group getaways']},
];
export const serviceGroups = [
 {title:'Trips made for you', description:'Make room for the places, people and experiences that matter to you.', image:'/images/santorini-alternate.webp', alt:'Whitewashed buildings along a sunny Santorini hillside', items:['Domestic tour packages','International tour packages','Customized & private tours','Cruise packages','Corporate & group travel','School tours']},
 {title:'The details, taken care of', description:'Bring your travel plans together with help from a real person.', image:'/images/japan-fuji.webp', alt:'Cherry blossoms framing Mount Fuji', items:['Airline ticketing','Hotel & resort reservations','Travel insurance']},
 {title:'Guidance before you go', description:'Get assistance preparing your travel documents and understanding the next steps.', image:'/images/korea-palace.webp', alt:'Gyeongbokgung Palace gate in Seoul', items:['Visa assistance','Passport assistance']},
];
export const testimonials = [
 {name:'Ms. Anne', context:'Beijing & Shanghai private tour', quote:'We booked our China trip last minute, but everything went incredibly well.'},
 {name:'Lorie', context:'Da Nang group travel', quote:'Your team was kind, helpful, and always ready to assist us.'},
 {name:'Rosalie', context:'Zhangjiajie group travel', quote:'Hindi talaga natapos ang service nyo sa pagbili lang Ng package but until to flight back home'},
];
