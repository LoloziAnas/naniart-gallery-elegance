import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  Printer,
  Download,
  ArrowLeft,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { ordersAPI } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch order details
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await ordersAPI.getById(parseInt(id!));
      return response.data;
    },
    enabled: !!id && isAuthenticated,
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: number) => {
      return await ordersAPI.cancel(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Commande annulée",
        description: "Votre commande a été annulée avec succès",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Impossible d'annuler la commande",
        variant: "destructive",
      });
    },
  });

  const handleCancelOrder = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
      cancelOrderMutation.mutate(parseInt(id!));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // Generate invoice PDF (simplified version)
    const invoiceContent = `
      FACTURE - ${order?.orderNumber}
      
      Date: ${new Date(order?.createdAt || "").toLocaleDateString("fr-FR")}
      
      Client:
      ${order?.shippingFirstName} ${order?.shippingLastName}
      ${order?.shippingAddress}
      ${order?.shippingCity}, ${order?.shippingPostalCode}
      ${order?.shippingCountry}
      
      Articles:
      ${order?.items.map(item => `${item.productTitle} x${item.quantity} - ${item.subtotal} MAD`).join("\n")}
      
      Sous-total: ${order?.subtotal} MAD
      Frais de livraison: ${order?.shippingCost} MAD
      Remise: ${order?.discount} MAD
      
      TOTAL: ${order?.total} MAD
    `;
    
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `facture-${order?.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Facture téléchargée",
      description: "La facture a été téléchargée avec succès",
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          label: "En attente",
          icon: Clock,
          color: "bg-yellow-500",
          textColor: "text-yellow-700",
          bgColor: "bg-yellow-50",
        };
      case "CONFIRMED":
        return {
          label: "Confirmée",
          icon: CheckCircle2,
          color: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
        };
      case "PROCESSING":
        return {
          label: "En préparation",
          icon: Package,
          color: "bg-purple-500",
          textColor: "text-purple-700",
          bgColor: "bg-purple-50",
        };
      case "SHIPPED":
        return {
          label: "Expédiée",
          icon: Truck,
          color: "bg-indigo-500",
          textColor: "text-indigo-700",
          bgColor: "bg-indigo-50",
        };
      case "DELIVERED":
        return {
          label: "Livrée",
          icon: CheckCircle2,
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
        };
      case "CANCELLED":
        return {
          label: "Annulée",
          icon: XCircle,
          color: "bg-red-500",
          textColor: "text-red-700",
          bgColor: "bg-red-50",
        };
      default:
        return {
          label: status,
          icon: AlertCircle,
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
        };
    }
  };

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "En attente", color: "bg-yellow-500" };
      case "PAID":
        return { label: "Payée", color: "bg-green-500" };
      case "FAILED":
        return { label: "Échouée", color: "bg-red-500" };
      case "REFUNDED":
        return { label: "Remboursée", color: "bg-blue-500" };
      default:
        return { label: status, color: "bg-gray-500" };
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de la commande...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Commande introuvable
            </CardTitle>
            <CardDescription>
              La commande demandée n'existe pas ou vous n'avez pas accès à celle-ci.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/orders")} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux commandes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const paymentStatusInfo = getPaymentStatusInfo(order.paymentStatus);
  const StatusIcon = statusInfo.icon;
  const canCancel = order.status === "PENDING" || order.status === "CONFIRMED";

  return (
    <div className="min-h-screen bg-secondary/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 print:mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/orders")}
              className="mb-4 print:hidden"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux commandes
            </Button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  Commande {order.orderNumber}
                </h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex gap-2 print:hidden">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
                <Button variant="outline" onClick={handleDownloadInvoice}>
                  <Download className="h-4 w-4 mr-2" />
                  Facture
                </Button>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${statusInfo.bgColor}`}>
                    <StatusIcon className={`h-6 w-6 ${statusInfo.textColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Statut de la commande</p>
                    <p className={`text-xl font-semibold ${statusInfo.textColor}`}>
                      {statusInfo.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Statut du paiement</p>
                    <Badge className={`${paymentStatusInfo.color} text-white`}>
                      {paymentStatusInfo.label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className={`h-full ${statusInfo.color} transition-all duration-500`}
                      style={{
                        width:
                          order.status === "PENDING"
                            ? "0%"
                            : order.status === "CONFIRMED"
                            ? "25%"
                            : order.status === "PROCESSING"
                            ? "50%"
                            : order.status === "SHIPPED"
                            ? "75%"
                            : order.status === "DELIVERED"
                            ? "100%"
                            : "0%",
                      }}
                    />
                  </div>

                  {/* Status Steps */}
                  {["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].map(
                    (status, index) => {
                      const isActive =
                        ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].indexOf(
                          order.status
                        ) >= index;
                      const info = getStatusInfo(status);
                      const Icon = info.icon;

                      return (
                        <div key={status} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isActive ? info.color : "bg-gray-200"
                            } text-white`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-xs mt-2 text-center hidden md:block">
                            {info.label}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Numéro de suivi
                  </p>
                  <p className="text-lg font-mono text-blue-700">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Articles commandés</CardTitle>
                  <CardDescription>
                    {order.items.length} article{order.items.length > 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <img
                          src={item.productImage}
                          alt={item.productTitle}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.productTitle}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.productSize} • {item.productFrame}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.subtotal.toFixed(2)} MAD</p>
                          <p className="text-sm text-muted-foreground">
                            {item.price.toFixed(2)} MAD / unité
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{order.subtotal.toFixed(2)} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frais de livraison</span>
                      <span>
                        {order.shippingCost === 0
                          ? "Gratuit"
                          : `${order.shippingCost.toFixed(2)} MAD`}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Remise</span>
                        <span>-{order.discount.toFixed(2)} MAD</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{order.total.toFixed(2)} MAD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">
                      {order.shippingFirstName} {order.shippingLastName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.shippingAddress}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingCity}, {order.shippingPostalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.shippingCountry}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{order.shippingEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.shippingPhone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Méthode de paiement</p>
                  <p className="font-medium">
                    {order.paymentMethod === "CASH_ON_DELIVERY"
                      ? "Paiement à la livraison"
                      : order.paymentMethod === "CREDIT_CARD"
                      ? "Carte bancaire"
                      : order.paymentMethod}
                  </p>
                </CardContent>
              </Card>

              {/* Notes */}
              {order.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              {canCancel && (
                <Card className="print:hidden">
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancelOrder}
                      disabled={cancelOrderMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {cancelOrderMutation.isPending
                        ? "Annulation..."
                        : "Annuler la commande"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Vous pouvez annuler cette commande tant qu'elle n'est pas en préparation
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
