export type ItemType = 'lost' | 'found';

export type ItemStatus = 'active' | 'claimed' | 'resolved' | 'expired';

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  type: ItemType;
  status: ItemStatus;
  date: string;
  location: string;
  images: string[];
  reporterName: string;
  reporterEmail: string;
  reporterId: string;
  createdAt: string;
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  claimantName: string;
  claimantEmail: string;
  message: string;
  status: ClaimStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  joinDate: string;
}

export const CATEGORIES = [
  'Electronics',
  'Keys',
  'Wallets',
  'Bags',
  'Clothing',
  'Accessories',
  'Books',
  'Documents',
  'Other',
] as const;

export const LOCATIONS = [
  'Central Library',
  'Science Building',
  'Student Union',
  'Cafeteria',
  'Gymnasium',
  'Engineering Block',
  'Arts Center',
  'Parking Lot B',
  'Dormitory Hall',
  'Lecture Hall A',
] as const;
