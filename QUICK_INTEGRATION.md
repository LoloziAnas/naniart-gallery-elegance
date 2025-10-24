# ⚡ Quick Integration Reference

## 🚀 Get Started in 3 Steps

### 1. Install Axios
```bash
npm install axios
```

### 2. Start Both Servers
```bash
# Terminal 1: Backend
cd /home/alolozi/SideProjects/naniart/naniart-backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev -s settings.xml

# Terminal 2: Frontend
cd /home/alolozi/SideProjects/naniart/naniart-gallery-elegance
npm run dev
```

### 3. Test Login
- Visit: http://localhost:5173
- Login: test@naniart.ma / password123

---

## 📦 What You Have

✅ **API Layer** - `/src/lib/api.ts`  
✅ **Auth Context** - `/src/contexts/AuthContext.tsx`  
✅ **Product Hooks** - `/src/hooks/useProducts.ts`  
✅ **Wishlist Hooks** - `/src/hooks/useWishlistAPI.ts`  
✅ **Order Hooks** - `/src/hooks/useOrders.ts`  
✅ **Review Hooks** - `/src/hooks/useReviews.ts`  

---

## 💡 Common Use Cases

### Get All Products
```typescript
import { useProducts } from '@/hooks/useProducts';

const { data, isLoading } = useProducts(0, 20);
const products = data?.content || [];
```

### Get Single Product
```typescript
import { useProduct } from '@/hooks/useProducts';

const { data: product } = useProduct(productId);
```

### Search Products
```typescript
import { useProductSearch } from '@/hooks/useProducts';

const { data } = useProductSearch(searchQuery);
```

### Manage Wishlist
```typescript
import { useWishlistAPI } from '@/hooks/useWishlistAPI';

const { wishlist, toggleWishlist, isInWishlist } = useWishlistAPI();
```

### Create Order
```typescript
import { useCreateOrder } from '@/hooks/useOrders';

const createOrder = useCreateOrder();
createOrder.mutate(orderData);
```

### Authentication
```typescript
import { useAuth } from '@/contexts/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

---

## 📋 Update Your Pages

### Gallery.tsx
```typescript
const { data, isLoading } = useProducts();
```

### Product.tsx
```typescript
const { data: product } = useProduct(id);
const { toggleWishlist } = useWishlistAPI();
```

### Home.tsx
```typescript
const { data: featured } = useFeaturedProducts();
const { data: bestsellers } = useBestsellers();
```

### Wishlist.tsx
```typescript
const { wishlist, removeFromWishlist } = useWishlistAPI();
```

---

## 🔗 API Endpoints Available

- `GET /api/products` - All products
- `GET /api/products/{id}` - Single product
- `GET /api/products/featured` - Featured
- `GET /api/products/bestsellers` - Bestsellers
- `GET /api/products/new-arrivals` - New arrivals
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/orders` - Create order
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/{id}` - Add to wishlist

---

## 📚 Full Documentation

- **Integration Guide:** `BACKEND_INTEGRATION_GUIDE.md`
- **Summary:** `INTEGRATION_SUMMARY.md`
- **Backend API:** `/naniart-backend/API_ENDPOINTS.md`

---

**Ready to integrate!** 🎉
