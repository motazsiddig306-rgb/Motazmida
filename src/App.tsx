import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BundleCalculator } from './components/BundleCalculator';
import { VisualShowcase } from './components/VisualShowcase';
import { BrandPromptSection } from './components/BrandPromptSection';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { ServiceItem, SERVICES_LIST, AGENCY_CONTACT } from './data/servicesData';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [customBundleServices, setCustomBundleServices] = useState<ServiceItem[]>([]);
  const [customBundlePrice, setCustomBundlePrice] = useState<number>(0);

  const handleOpenGenericModal = () => {
    setSelectedService(SERVICES_LIST[0]);
    setCustomBundleServices([]);
    setIsModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCustomBundleServices([]);
    setIsModalOpen(true);
  };

  const handleOrderCustomBundle = (
    services: ServiceItem[],
    finalPrice: number,
    _discountAmount: number
  ) => {
    setCustomBundleServices(services);
    setCustomBundlePrice(finalPrice);
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Navigation Top Bar */}
      <Navbar onQuickOrderClick={handleOpenGenericModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenOrderModal={handleOpenGenericModal} />

        {/* Services & Pricing Cards */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Smart Interactive Bundle Builder & Auto Discount */}
        <BundleCalculator onOrderCustomBundle={handleOrderCustomBundle} />

        {/* Visual Showcase Reel */}
        <VisualShowcase onQuickOrderClick={handleOpenGenericModal} />

        {/* Brand Prompt & Description Box */}
        <BrandPromptSection />
      </main>

      {/* Footer and Direct Contacts */}
      <Footer onOpenOrderModal={handleOpenGenericModal} />

      {/* Interactive Quick Order Popup Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
        customBundleServices={customBundleServices}
        customBundlePrice={customBundlePrice}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="التواصل السريع" className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <a
          href={AGENCY_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 sm:px-4 sm:py-3 shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/50"
          title="تواصل مباشر عبر واتساب"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            تواصل واتساب فوري
          </span>
        </a>
      </aside>

    </div>
  );
}
