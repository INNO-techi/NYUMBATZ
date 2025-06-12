export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    district: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  houseType: 'house' | 'apartment' | 'studio';
  amenities: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  createdDate: string;
  updatedDate: string;
}

export interface ViewingRequest {
  id: string;
  houseId: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  requestedDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  adminNotes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'tenant' | 'owner';
  isVerified: boolean;
  profileImage?: string;
  registrationDate: string;
}

export interface Payment {
  id: string;
  houseId: string;
  tenantId: string;
  amountTotal: number;
  commissionAmount: number;
  ownerAmount: number;
  paymentMethod: 'mpesa' | 'tigo-pesa' | 'airtel-money' | 'bank-transfer';
  transactionReference: string;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
}

export interface SearchFilters {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms: number | null;
  bathrooms: number | null;
  houseType: string;
  amenities: string[];
}