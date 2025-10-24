import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersAPI, CreateOrderRequest } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useOrders = (page = 0, size = 10) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['orders', page, size],
    queryFn: async () => {
      const response = await ordersAPI.getMyOrders(page, size);
      return response.data;
    },
    enabled: isAuthenticated,
  });
};

export const useOrderHistory = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['orders', 'history'],
    queryFn: async () => {
      const response = await ordersAPI.getMyOrderHistory();
      return response.data;
    },
    enabled: isAuthenticated,
  });
};

export const useOrder = (id: number) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await ordersAPI.getById(id);
      return response.data;
    },
    enabled: isAuthenticated && !!id,
  });
};

export const useOrderByNumber = (orderNumber: string) => {
  return useQuery({
    queryKey: ['order', 'number', orderNumber],
    queryFn: async () => {
      const response = await ordersAPI.getByNumber(orderNumber);
      return response.data;
    },
    enabled: !!orderNumber,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => ordersAPI.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Commande créée',
        description: `Votre commande ${response.data.orderNumber} a été créée avec succès`,
      });
      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de créer la commande',
        variant: 'destructive',
      });
    },
  });
};
