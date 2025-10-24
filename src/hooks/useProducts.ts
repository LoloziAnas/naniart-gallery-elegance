import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsAPI, Product } from '@/lib/api';

export const useProducts = (page = 0, size = 20, sortBy = 'createdAt', sortDir = 'desc') => {
  return useQuery({
    queryKey: ['products', page, size, sortBy, sortDir],
    queryFn: async () => {
      const response = await productsAPI.getAll(page, size, sortBy, sortDir);
      return response.data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productsAPI.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: async () => {
      const response = await productsAPI.getBySlug(slug);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useFeaturedProducts = (page = 0, size = 8) => {
  return useQuery({
    queryKey: ['products', 'featured', page, size],
    queryFn: async () => {
      const response = await productsAPI.getFeatured(page, size);
      return response.data.content;
    },
  });
};

export const useBestsellers = (page = 0, size = 8) => {
  return useQuery({
    queryKey: ['products', 'bestsellers', page, size],
    queryFn: async () => {
      const response = await productsAPI.getBestsellers(page, size);
      return response.data.content;
    },
  });
};

export const useNewArrivals = (page = 0, size = 8) => {
  return useQuery({
    queryKey: ['products', 'new-arrivals', page, size],
    queryFn: async () => {
      const response = await productsAPI.getNewArrivals(page, size);
      return response.data.content;
    },
  });
};

export const useFlashSales = (page = 0, size = 8) => {
  return useQuery({
    queryKey: ['products', 'flash-sales', page, size],
    queryFn: async () => {
      const response = await productsAPI.getFlashSales(page, size);
      return response.data.content;
    },
  });
};

export const useProductsByCategory = (category: string, page = 0, size = 20) => {
  return useQuery({
    queryKey: ['products', 'category', category, page, size],
    queryFn: async () => {
      const response = await productsAPI.getByCategory(category, page, size);
      return response.data.content;
    },
    enabled: !!category,
  });
};

export const useProductSearch = (keyword: string, page = 0, size = 20) => {
  return useQuery({
    queryKey: ['products', 'search', keyword, page, size],
    queryFn: async () => {
      const response = await productsAPI.search(keyword, page, size);
      return response.data.content;
    },
    enabled: !!keyword && keyword.length > 0,
  });
};

export const useRelatedProducts = (productId: number) => {
  return useQuery({
    queryKey: ['products', 'related', productId],
    queryFn: async () => {
      const response = await productsAPI.getRelated(productId);
      return response.data;
    },
    enabled: !!productId,
  });
};
