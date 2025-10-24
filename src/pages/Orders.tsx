import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Loader2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: ordersData, isLoading: ordersLoading } = useOrders(0, 20);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <Package className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-serif font-bold">Connexion requise</h2>
            <p className="text-muted-foreground">
              Veuillez vous connecter pour voir vos commandes
            </p>
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const orders = ordersData?.content || [];

  return (
    <div className="min-h-screen bg-secondary/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Mes Commandes</h1>
            <p className="text-muted-foreground">
              Suivez l'état de vos commandes et consultez votre historique
            </p>
          </div>

          {ordersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center space-y-4">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Aucune commande</h3>
                <p className="text-muted-foreground">
                  Vous n'avez pas encore passé de commande
                </p>
                <Button asChild>
                  <Link to="/gallery">Découvrir nos œuvres</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Commande #{order.orderNumber}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          order.status === "DELIVERED"
                            ? "default"
                            : order.status === "CANCELLED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {order.status === "PENDING" && "En attente"}
                        {order.status === "CONFIRMED" && "Confirmée"}
                        {order.status === "PROCESSING" && "En préparation"}
                        {order.status === "SHIPPED" && "Expédiée"}
                        {order.status === "DELIVERED" && "Livrée"}
                        {order.status === "CANCELLED" && "Annulée"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Articles:</span>
                        <span className="font-medium">
                          {order.items?.length || 0} article(s)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold text-lg text-primary">
                          {order.totalAmount?.toFixed(2)} MAD
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Paiement:</span>
                        <span className="font-medium">
                          {order.paymentMethod === "CASH_ON_DELIVERY" && "Paiement à la livraison"}
                          {order.paymentMethod === "CREDIT_CARD" && "Carte bancaire"}
                          {order.paymentMethod === "BANK_TRANSFER" && "Virement bancaire"}
                          {order.paymentMethod === "MOBILE_PAYMENT" && "Paiement mobile"}
                        </span>
                      </div>
                      {order.shippingAddress && (
                        <div className="pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-1">
                            Adresse de livraison:
                          </p>
                          <p className="text-sm">
                            {order.shippingAddress}, {order.shippingCity}
                          </p>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        asChild
                      >
                        <Link to={`/orders/${order.id}`}>
                          Voir les détails
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
