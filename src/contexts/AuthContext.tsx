import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, userAPI, User, LoginRequest, RegisterRequest } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('naniart-token');
      const storedUser = localStorage.getItem('naniart-user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid by fetching current user
          const response = await userAPI.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('naniart-token');
          localStorage.removeItem('naniart-user');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authAPI.login(data);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('naniart-token', newToken);
      localStorage.setItem('naniart-user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);

      toast({
        title: 'Connexion réussie',
        description: `Bienvenue ${newUser.firstName}!`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.response?.data?.message || 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authAPI.register(data);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('naniart-token', newToken);
      localStorage.setItem('naniart-user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);

      toast({
        title: 'Inscription réussie',
        description: `Bienvenue ${newUser.firstName}!`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.response?.data?.message || 'Une erreur est survenue',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('naniart-token');
    localStorage.removeItem('naniart-user');
    setToken(null);
    setUser(null);

    toast({
      title: 'Déconnexion',
      description: 'À bientôt!',
    });
  };

  const refreshUser = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      setUser(response.data);
      localStorage.setItem('naniart-user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
