import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "212771300358"; // Replace with actual WhatsApp number
  const message = "Bonjour, je suis intéressé par vos œuvres d'art.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse-glow"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Contactez-nous sur WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
