import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Minimize2, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAgentMessage(
          "Bonjour ! 👋 Je suis Amina, votre conseillère Naniart. Comment puis-je vous aider aujourd'hui ?"
        );
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate unread messages
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "agent") {
        setUnreadCount((prev) => prev + 1);
      }
    } else {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const addAgentMessage = (text: string, agentName = "Amina") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "agent",
      timestamp: new Date(),
      agentName,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate agent typing
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = getAutoResponse(inputValue.toLowerCase());
      addAgentMessage(responses);
    }, 1500 + Math.random() * 1000);
  };

  const getAutoResponse = (message: string): string => {
    if (message.includes("prix") || message.includes("coût") || message.includes("tarif")) {
      return "Nos œuvres sont disponibles à partir de 2,500 MAD. Le prix varie selon la taille et le cadre choisi. Souhaitez-vous en savoir plus sur un produit spécifique ?";
    }
    if (message.includes("livraison") || message.includes("délai") || message.includes("expédition")) {
      return "Nous livrons dans tout le Maroc ! La livraison est gratuite pour les commandes supérieures à 500 MAD. Le délai est de 2-5 jours ouvrables. 📦";
    }
    if (message.includes("taille") || message.includes("dimension") || message.includes("format")) {
      return "Nous proposons plusieurs formats : Petit (30x40cm), Moyen (50x70cm), Grand (80x100cm), et plus encore. Je peux vous envoyer notre guide des tailles complet si vous le souhaitez !";
    }
    if (message.includes("cadre") || message.includes("encadrement")) {
      return "Nous offrons 4 options d'encadrement : Toile tendue, Cadre noir, Cadre bois, et Cadre doré. Chaque option apporte un style différent à votre œuvre. 🖼️";
    }
    if (message.includes("retour") || message.includes("remboursement") || message.includes("échange")) {
      return "Vous avez 14 jours pour retourner votre achat si vous n'êtes pas satisfait. Le remboursement est complet et les frais de retour sont à notre charge. Votre satisfaction est notre priorité ! ✨";
    }
    if (message.includes("paiement") || message.includes("carte") || message.includes("cash")) {
      return "Nous acceptons les cartes bancaires, le paiement à la livraison, et les virements bancaires. Le paiement est 100% sécurisé. 💳";
    }
    if (message.includes("merci") || message.includes("thank")) {
      return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider ! 😊";
    }
    if (message.includes("bonjour") || message.includes("salut") || message.includes("hello")) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser vos questions sur nos œuvres, la livraison, ou tout autre sujet ! 🎨";
    }
    
    return "Merci pour votre message ! Un de nos conseillers va vous répondre dans quelques instants. En attendant, vous pouvez consulter notre FAQ ou nous appeler au +212 5XX-XXXXXX. 📞";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const quickActions = [
    { label: "Voir les prix", message: "Quels sont vos prix ?" },
    { label: "Infos livraison", message: "Quels sont les délais de livraison ?" },
    { label: "Guide des tailles", message: "Pouvez-vous m'envoyer le guide des tailles ?" },
    { label: "Politique de retour", message: "Quelle est votre politique de retour ?" },
  ];

  const handleQuickAction = (message: string) => {
    setInputValue(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <Card
          className={`fixed bottom-24 right-24 w-96 max-w-[calc(100vw-3rem)] shadow-2xl z-50 transition-all ${
            isMinimized ? "h-16" : "h-[600px] max-h-[calc(100vh-8rem)]"
          }`}
        >
          {/* Header */}
          <CardHeader className="p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Support Naniart</h3>
                <p className="text-xs opacity-90">En ligne • Répond en ~2 min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <CardContent className="p-4 h-[calc(100%-8rem)] overflow-y-auto space-y-4">
                {/* Quick Actions */}
                {messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      Questions fréquentes :
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-2 px-3"
                          onClick={() => handleQuickAction(action.message)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {message.sender === "agent" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      {message.sender === "agent" && message.agentName && (
                        <p className="text-xs font-semibold mb-1 text-primary">
                          {message.agentName}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écrivez votre message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Appuyez sur Entrée pour envoyer
                </p>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        size="lg"
        className="fixed bottom-6 right-24 h-14 w-14 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </>
        )}
      </Button>
    </>
  );
};

export default LiveChat;
