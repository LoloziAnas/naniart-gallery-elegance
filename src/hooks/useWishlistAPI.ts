import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useWishlistAPI = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await wishlistAPI.get();
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: number) => wishlistAPI.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Ajouté aux favoris',
        description: 'Le produit a été ajouté à votre liste de souhaits',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible d\'ajouter aux favoris',
        variant: 'destructive',
      });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: number) => wishlistAPI.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Retiré des favoris',
        description: 'Le produit a été retiré de votre liste de souhaits',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de retirer des favoris',
        variant: 'destructive',
      });
    },
  });

  const isInWishlist = (productId: number) => {
    return wishlist.some((product) => product.id === productId);
  };

  const toggleWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlistMutation.mutate(productId);
    } else {
      addToWishlistMutation.mutate(productId);
    }
  };

  return {
    wishlist,
    isLoading,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    toggleWishlist,
    isInWishlist,
  };
};
