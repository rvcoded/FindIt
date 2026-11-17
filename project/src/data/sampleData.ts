import type { Item, ClaimRequest } from '@/types';

const walletImgs = [
  'https://images.pexels.com/photos/6633804/pexels-photo-6633804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6633602/pexels-photo-6633602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1128240/pexels-photo-1128240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const keyImgs = [
  'https://images.pexels.com/photos/67094/pexels-photo-67094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17026019/pexels-photo-17026019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29726512/pexels-photo-29726512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const laptopImgs = [
  'https://images.pexels.com/photos/3747070/pexels-photo-3747070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20432916/pexels-photo-20432916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1128207/pexels-photo-1128207.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const backpackImgs = [
  'https://images.pexels.com/photos/7683617/pexels-photo-7683617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2676888/pexels-photo-2676888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const bottleImgs = [
  'https://images.pexels.com/photos/31699476/pexels-photo-31699476.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3737800/pexels-photo-3737800.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3737799/pexels-photo-3737799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const headphonesImgs = [
  'https://images.pexels.com/photos/1591/technology-music-sound-things.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5269726/pexels-photo-5269726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17263155/pexels-photo-17263155.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const glassesImgs = [
  'https://images.pexels.com/photos/5530775/pexels-photo-5530775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13743898/pexels-photo-13743898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10024615/pexels-photo-10024615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const umbrellaImgs = [
  'https://images.pexels.com/photos/11585797/pexels-photo-11585797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12348815/pexels-photo-12348815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const phoneImgs = [
  'https://images.pexels.com/photos/14486283/pexels-photo-14486283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/358627/pexels-photo-358627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3999587/pexels-photo-3999587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const watchImgs = [
  'https://images.pexels.com/photos/4070966/pexels-photo-4070966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/11216261/pexels-photo-11216261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export const campusImg =
  'https://images.pexels.com/photos/19554793/pexels-photo-19554793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const sampleItems: Item[] = [
  {
    id: 'itm-001',
    name: 'Brown Leather Wallet',
    description:
      'A brown leather bifold wallet with several cards and a student ID inside. Lost near the library entrance around 2 PM.',
    category: 'Wallets',
    type: 'lost',
    status: 'active',
    date: '2026-11-12',
    location: 'Central Library',
    images: walletImgs,
    reporterName: 'Sarah Chen',
    reporterEmail: 'sarah.chen@university.edu',
    reporterId: 'usr-001',
    createdAt: '2026-11-12T14:30:00Z',
  },
  {
    id: 'itm-002',
    name: 'Set of Car Keys',
    description:
      'Found a set of silver car keys with a red keychain near the science building parking lot. One electronic fob attached.',
    category: 'Keys',
    type: 'found',
    status: 'active',
    date: '2026-11-13',
    location: 'Parking Lot B',
    images: keyImgs,
    reporterName: 'Marcus Johnson',
    reporterEmail: 'marcus.j@university.edu',
    reporterId: 'usr-002',
    createdAt: '2026-11-13T09:15:00Z',
  },
  {
    id: 'itm-003',
    name: 'MacBook Pro 14"',
    description:
      'Silver MacBook Pro left in the engineering building, room 204. Has a sticker on the lid. Please contact if yours.',
    category: 'Electronics',
    type: 'found',
    status: 'active',
    date: '2026-11-14',
    location: 'Engineering Block',
    images: laptopImgs,
    reporterName: 'Priya Patel',
    reporterEmail: 'priya.patel@university.edu',
    reporterId: 'usr-003',
    createdAt: '2026-11-14T16:45:00Z',
  },
  {
    id: 'itm-004',
    name: 'Black North Face Backpack',
    description:
      'Lost a black North Face backpack with textbooks and a calculator inside. Last seen in the cafeteria around lunchtime.',
    category: 'Bags',
    type: 'lost',
    status: 'active',
    date: '2026-11-11',
    location: 'Cafeteria',
    images: backpackImgs,
    reporterName: 'James Wilson',
    reporterEmail: 'j.wilson@university.edu',
    reporterId: 'usr-004',
    createdAt: '2026-11-11T13:00:00Z',
  },
  {
    id: 'itm-005',
    name: 'Insulated Water Bottle',
    description:
      'Found a black insulated water bottle in the gymnasium. Has a name sticker partially peeled off.',
    category: 'Accessories',
    type: 'found',
    status: 'active',
    date: '2026-11-14',
    location: 'Gymnasium',
    images: bottleImgs,
    reporterName: 'Elena Rodriguez',
    reporterEmail: 'e.rodriguez@university.edu',
    reporterId: 'usr-005',
    createdAt: '2026-11-14T18:20:00Z',
  },
  {
    id: 'itm-006',
    name: 'Red and Black Headphones',
    description:
      'Lost a pair of red and black over-ear headphones in the arts center practice room. Very sentimental gift.',
    category: 'Electronics',
    type: 'lost',
    status: 'active',
    date: '2026-11-10',
    location: 'Arts Center',
    images: headphonesImgs,
    reporterName: 'David Kim',
    reporterEmail: 'd.kim@university.edu',
    reporterId: 'usr-006',
    createdAt: '2026-11-10T11:30:00Z',
  },
  {
    id: 'itm-007',
    name: 'Prescription Eyeglasses',
    description:
      'Found a pair of prescription eyeglasses on top of a book stack in the library reading area. Tortoise shell frame.',
    category: 'Accessories',
    type: 'found',
    status: 'claimed',
    date: '2026-11-09',
    location: 'Central Library',
    images: glassesImgs,
    reporterName: 'Aisha Mohammed',
    reporterEmail: 'aisha.m@university.edu',
    reporterId: 'usr-007',
    createdAt: '2026-11-09T15:00:00Z',
  },
  {
    id: 'itm-008',
    name: 'Black Umbrella',
    description:
      'Lost a black umbrella with a wooden handle. Left behind near the lecture hall entrance during the rain on Tuesday.',
    category: 'Clothing',
    type: 'lost',
    status: 'active',
    date: '2026-11-08',
    location: 'Lecture Hall A',
    images: umbrellaImgs,
    reporterName: 'Tom Anderson',
    reporterEmail: 't.anderson@university.edu',
    reporterId: 'usr-008',
    createdAt: '2026-11-08T17:30:00Z',
  },
  {
    id: 'itm-009',
    name: 'Samsung Galaxy Phone',
    description:
      'Found a Samsung Galaxy phone on a desk in the student union study area. Locked screen with a nature wallpaper.',
    category: 'Electronics',
    type: 'found',
    status: 'active',
    date: '2026-11-13',
    location: 'Student Union',
    images: phoneImgs,
    reporterName: 'Lisa Park',
    reporterEmail: 'l.park@university.edu',
    reporterId: 'usr-009',
    createdAt: '2026-11-13T19:00:00Z',
  },
  {
    id: 'itm-010',
    name: 'Digital Wristwatch',
    description:
      'Lost a black digital wristwatch near the science building. Has a cracked screen protector and a fabric strap.',
    category: 'Accessories',
    type: 'lost',
    status: 'resolved',
    date: '2026-11-05',
    location: 'Science Building',
    images: watchImgs,
    reporterName: 'Sarah Chen',
    reporterEmail: 'sarah.chen@university.edu',
    reporterId: 'usr-001',
    createdAt: '2026-11-05T10:00:00Z',
  },
  {
    id: 'itm-011',
    name: 'Scientific Calculator',
    description:
      'Found a TI-84 scientific calculator in the engineering block hallway. Has initials "J.W." engraved on the back.',
    category: 'Electronics',
    type: 'found',
    status: 'active',
    date: '2026-11-14',
    location: 'Engineering Block',
    images: laptopImgs,
    reporterName: 'Marcus Johnson',
    reporterEmail: 'marcus.j@university.edu',
    reporterId: 'usr-002',
    createdAt: '2026-11-14T08:00:00Z',
  },
  {
    id: 'itm-012',
    name: 'Graphing Notebook',
    description:
      'Lost a green graphing notebook with calculus notes from chapters 4-7. Extremely important for upcoming exam.',
    category: 'Books',
    type: 'lost',
    status: 'active',
    date: '2026-11-12',
    location: 'Dormitory Hall',
    images: glassesImgs,
    reporterName: 'Priya Patel',
    reporterEmail: 'priya.patel@university.edu',
    reporterId: 'usr-003',
    createdAt: '2026-11-12T20:15:00Z',
  },
];

export const sampleClaims: ClaimRequest[] = [
  {
    id: 'clm-001',
    itemId: 'itm-003',
    itemName: 'MacBook Pro 14"',
    itemImage: laptopImgs[0],
    claimantName: 'Alex Thompson',
    claimantEmail: 'alex.t@university.edu',
    message:
      'I think this is my laptop! It has a Star Wars sticker on the lid. I left it in room 204 after my 3 PM class.',
    status: 'pending',
    createdAt: '2026-11-14T19:30:00Z',
  },
  {
    id: 'clm-002',
    itemId: 'itm-002',
    itemName: 'Set of Car Keys',
    itemImage: keyImgs[0],
    claimantName: 'Jordan Lee',
    claimantEmail: 'jordan.lee@university.edu',
    message:
      'Those are my keys! The red keychain is from my car dealership. I have the matching registration.',
    status: 'approved',
    createdAt: '2026-11-13T11:00:00Z',
  },
  {
    id: 'clm-003',
    itemId: 'itm-007',
    itemName: 'Prescription Eyeglasses',
    itemImage: glassesImgs[0],
    claimantName: 'Maria Santos',
    claimantEmail: 'm.santos@university.edu',
    message: 'Those are my reading glasses! Tortoise shell frame, prescription -2.5.',
    status: 'approved',
    createdAt: '2026-11-09T16:00:00Z',
  },
];
