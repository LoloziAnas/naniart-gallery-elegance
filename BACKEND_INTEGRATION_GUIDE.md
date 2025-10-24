# 🔗 Backend Integration Guide

Complete guide for connecting your React frontend to the Spring Boot backend.

---

## ✅ Step 1: Install Dependencies

```bash
cd /home/alolozi/SideProjects/naniart/naniart-gallery-elegance

# Install axios if not already installed
npm install axios
```

---

## ✅ Step 2: Files Created

### API Layer
- ✅ `/src/lib/api.ts` - Axios instance and API functions
- ✅ `/src/contexts/AuthContext.tsx` - Authentication context
- ✅ `/src/hooks/useProducts.ts` - Product data fetching hooks
- ✅ `/src/hooks/useWishlistAPI.ts` - Wishlist management hooks
- ✅ `/src/hooks/useOrders.ts` - Order management hooks
- ✅ `/src/hooks/useReviews.ts` - Review management hooks

### Configuration
- ✅ Updated `/src/App.tsx` - Added AuthProvider

---

## 📋 Step 3: Update Pages

### Gallery Page Example

Replace mock data with real API calls:

```typescript
// src/pages/Gallery.tsx
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { Product } from '@/lib/api';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  // Use real data from backend
  const { data, isLoading, error } = searchQuery 
    ? useProductSearch(searchQuery, page, 20)
    : useProducts(page, 20, sortBy, sortDir);

  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading) return <ArtworkGridSkeleton />;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {/* Search */}
      <Input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher..."
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ArtworkCard
            key={product.id}
            id={product.id.toString()}
            title={product.title}
            price={`${product.price} MAD`}
            image={product.images[0]}
            isNew={product.newArrival}
            isBestseller={product.bestseller}
            inStock={product.inStock}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        <Button 
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span>Page {page + 1} of {totalPages}</span>
        <Button 
          onClick={() => setPage(p => p + 1)}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
```

---

### Product Page Example

```typescript
// src/pages/Product.tsx
import { useParams } from 'react-router-dom';
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { useProductReviews, useCreateReview } from '@/hooks/useReviews';
import { useWishlistAPI } from '@/hooks/useWishlistAPI';
import { useCart } from '@/contexts/CartContext';

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  const { data: relatedProducts } = useRelatedProducts(Number(id));
  const { data: reviewsData } = useProductReviews(Number(id));
  const { toggleWishlist, isInWishlist } = useWishlistAPI();
  const { addToCart } = useCart();
  const createReview = useCreateReview();

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      title: product.title,
      price: product.price.toString(),
      image: product.images[0],
      quantity: 1,
    });
  };

  const handleAddReview = (data: { rating: number; title: string; comment: string }) => {
    createReview.mutate({
      productId: product.id,
      ...data,
    });
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price} MAD</p>
      <p>{product.description}</p>
      
      <Button onClick={handleAddToCart}>
        Add to Cart
      </Button>
      
      <Button onClick={() => toggleWishlist(product.id)}>
        {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </Button>

      {/* Reviews */}
      <div>
        <h2>Reviews ({product.reviewCount})</h2>
        {reviewsData?.content.map(review => (
          <div key={review.id}>
            <p>{review.userName} - {review.rating}/5</p>
            <p>{review.title}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Related Products */}
      <div>
        <h2>Related Products</h2>
        {relatedProducts?.map(p => (
          <ArtworkCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
};
```

---

### Home Page Example

```typescript
// src/pages/Home.tsx
import { useFeaturedProducts, useBestsellers, useNewArrivals } from '@/hooks/useProducts';

const Home = () => {
  const { data: featured, isLoading: loadingFeatured } = useFeaturedProducts(0, 8);
  const { data: bestsellers, isLoading: loadingBestsellers } = useBestsellers(0, 8);
  const { data: newArrivals, isLoading: loadingNew } = useNewArrivals(0, 8);

  return (
    <div>
      {/* Featured Products */}
      <section>
        <h2>Featured</h2>
        {loadingFeatured ? (
          <ArtworkGridSkeleton />
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {featured?.map(product => (
              <ArtworkCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* Bestsellers */}
      <section>
        <h2>Bestsellers</h2>
        {loadingBestsellers ? (
          <ArtworkGridSkeleton />
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {bestsellers?.map(product => (
              <ArtworkCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section>
        <h2>New Arrivals</h2>
        {loadingNew ? (
          <ArtworkGridSkeleton />
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {newArrivals?.map(product => (
              <ArtworkCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
```

---

### Wishlist Page Example

```typescript
// src/pages/Wishlist.tsx
import { useWishlistAPI } from '@/hooks/useWishlistAPI';
import { useAuth } from '@/contexts/AuthContext';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, isLoading, removeFromWishlist } = useWishlistAPI();

  if (!isAuthenticated) {
    return <div>Please login to view your wishlist</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (wishlist.length === 0) {
    return <div>Your wishlist is empty</div>;
  }

  return (
    <div>
      <h1>My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id}>
            <ArtworkCard {...product} />
            <Button onClick={() => removeFromWishlist(product.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

### Checkout Page Example

```typescript
// src/pages/Checkout.tsx
import { useCreateOrder } from '@/hooks/useOrders';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: Number(item.id),
          quantity: item.quantity,
        })),
        paymentMethod: formData.paymentMethod,
        shippingFirstName: formData.firstName,
        shippingLastName: formData.lastName,
        shippingEmail: formData.email,
        shippingPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingPostalCode: formData.postalCode,
        shippingCountry: 'Morocco',
        notes: formData.notes,
      };

      const order = await createOrder.mutateAsync(orderData);
      clearCart();
      navigate(`/order-confirmation?orderNumber=${order.orderNumber}`);
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={createOrder.isPending}>
        {createOrder.isPending ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
};
```

---

## 🔐 Authentication Example

### Login Component

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      // Redirect or close modal
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" required />
      <input {...register('password')} type="password" required />
      <button type="submit">Login</button>
    </form>
  );
};
```

### Protected Route

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};

// Usage in App.tsx
<Route 
  path="/checkout" 
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  } 
/>
```

---

## 🧪 Testing the Integration

### 1. Start Backend
```bash
cd /home/alolozi/SideProjects/naniart/naniart-backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev -s settings.xml
```

### 2. Start Frontend
```bash
cd /home/alolozi/SideProjects/naniart/naniart-gallery-elegance
npm run dev
```

### 3. Test Flow
1. ✅ Visit http://localhost:5173
2. ✅ Browse products (should load from backend)
3. ✅ Login with test@naniart.ma / password123
4. ✅ Add products to cart
5. ✅ Add products to wishlist
6. ✅ Create an order
7. ✅ View order history

---

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📝 Type Safety

The API layer includes full TypeScript types for:
- ✅ Product
- ✅ User
- ✅ Order
- ✅ Review
- ✅ All request/response types

---

## 🚨 Common Issues

### CORS Error
**Problem:** API calls blocked by CORS  
**Solution:** Backend already configured for http://localhost:5173

### 401 Unauthorized
**Problem:** Token expired or invalid  
**Solution:** Login again, token auto-refreshes

### Cannot find module 'axios'
**Problem:** Axios not installed  
**Solution:** `npm install axios`

---

## ✨ Next Steps

1. Update Gallery page with real data
2. Update Product page with real data
3. Update Home page with real data
4. Test authentication flow
5. Test order creation
6. Test wishlist sync

---

**You're ready to connect your frontend to the backend!** 🎉
