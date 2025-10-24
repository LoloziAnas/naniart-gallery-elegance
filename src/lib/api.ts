import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('naniart-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('naniart-token');
      localStorage.removeItem('naniart-user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  tags: string[];
  images: string[];
  size: string;
  frame: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  limitedEdition: boolean;
  flashSale: boolean;
  viewCount: number;
  salesCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  roles: string[];
  enabled: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  paymentMethod: 'CREDIT_CARD' | 'CASH_ON_DELIVERY' | 'BANK_TRANSFER' | 'MOBILE_PAYMENT';
  shippingFirstName: string;
  shippingLastName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode?: string;
  shippingCountry: string;
  notes?: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface CreateReviewRequest {
  productId: number;
  rating: number;
  title: string;
  comment: string;
}

// API Services
export const authAPI = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', data),
  
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data),
};

export const productsAPI = {
  getAll: (page = 0, size = 20, sortBy = 'createdAt', sortDir = 'desc') =>
    api.get<{ content: Product[]; totalElements: number; totalPages: number }>(
      `/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    ),
  
  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),
  
  getBySlug: (slug: string) =>
    api.get<Product>(`/products/slug/${slug}`),
  
  getFeatured: (page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/featured?page=${page}&size=${size}`),
  
  getBestsellers: (page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/bestsellers?page=${page}&size=${size}`),
  
  getNewArrivals: (page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/new-arrivals?page=${page}&size=${size}`),
  
  getFlashSales: (page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/flash-sales?page=${page}&size=${size}`),
  
  getByCategory: (category: string, page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/category/${category}?page=${page}&size=${size}`),
  
  search: (keyword: string, page = 0, size = 20) =>
    api.get<{ content: Product[] }>(`/products/search?keyword=${keyword}&page=${page}&size=${size}`),
  
  getRelated: (id: number) =>
    api.get<Product[]>(`/products/${id}/related`),
};

export const ordersAPI = {
  create: (data: CreateOrderRequest) =>
    api.post('/orders', data),
  
  getMyOrders: (page = 0, size = 10) =>
    api.get(`/orders/my-orders?page=${page}&size=${size}`),
  
  getMyOrderHistory: () =>
    api.get('/orders/my-orders/history'),
  
  getById: (id: number) =>
    api.get(`/orders/${id}`),
  
  getByNumber: (orderNumber: string) =>
    api.get(`/orders/number/${orderNumber}`),
};

export const reviewsAPI = {
  create: (data: CreateReviewRequest) =>
    api.post<Review>('/reviews', data),
  
  getProductReviews: (productId: number, page = 0, size = 10) =>
    api.get<{ content: Review[] }>(`/reviews/product/${productId}?page=${page}&size=${size}`),
};

export const wishlistAPI = {
  get: () =>
    api.get<Product[]>('/users/wishlist'),
  
  add: (productId: number) =>
    api.post(`/users/wishlist/${productId}`),
  
  remove: (productId: number) =>
    api.delete(`/users/wishlist/${productId}`),
};

export const userAPI = {
  getCurrentUser: () =>
    api.get<User>('/users/me'),
  
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }) =>
    api.put('/users/me', data),
  
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) =>
    api.put('/users/me/password', data),
};
