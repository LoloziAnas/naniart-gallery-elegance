import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI, CreateReviewRequest } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useProductReviews = (productId: number, page = 0, size = 10) => {
  return useQuery({
    queryKey: ['reviews', productId, page, size],
    queryFn: async () => {
      const response = await reviewsAPI.getProductReviews(productId, page, size);
      return response.data;
    },
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewsAPI.create(data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
      toast({
        title: 'Avis publié',
        description: 'Merci pour votre avis!',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de publier l\'avis',
        variant: 'destructive',
      });
    },
  });
};
