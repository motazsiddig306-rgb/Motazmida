import React, { useState } from 'react';
import { Check, Clock, MessageCircle, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { SERVICES_LIST, ServiceItem, AGENCY_CONTACT } from '../data/servicesData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'branding' | 'video' | 'add-on'>('all');

  const filteredServices = activeFilter === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(item => item.category === activeFilter);

  const getDirectWhatsAppUrl = (service: ServiceItem) => {
    const text = `مرحباً نكست فيجن، أرغب في حجز خدمة: *${service.title}* بسعر: *${service.price.toLocaleString('ar-EG')} جنيه مصري*. برجاء تزويدي بتفاصيل البدء.`;
    return `https://wa.me/${AGENCY_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <span>تسعير واضح وشفاف 100% بالجنيه المصري</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            خدمات التصميم الرقمي، المتاجر، والذكاء الاصطناعي
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            اختر الخدمة المناسبة لمشروعك، اضغط على &quot;اطلب الخدمة&quot; لملء التفاصيل أو انتقل فوراً إلى واتساب لإتمام الاتفاق وبدء التنفيذ مباشرة.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-2xl mx-auto rounded-xl bg-slate-900/90 border border-slate-800 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            كافة الخدمات ({SERVICES_LIST.length})
          </button>
          <button
            onClick={() => setActiveFilter('ecommerce')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'ecommerce'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            المتاجر وشوبيفاي
          </button>
          <button
            onClick={() => setActiveFilter('branding')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'branding'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            الهوية والشعارات
          </button>
          <button
            onClick={() => setActiveFilter('video')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'video'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            الفيديو وريلز الـ AI
          </button>
          <button
            onClick={() => setActiveFilter('add-on')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'add-on'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            إضافات جديدة مقترحة
          </button>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isHighlight = service.isFeatured || service.id === 'product-shorts-10s';

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 relative group backdrop-blur-sm ${
                  isHighlight
                    ? 'border-emerald-500/60 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-950/90 shadow-xl shadow-emerald-500/10'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Optional Tag badge */}
                {service.tag && (
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                    <Tag className="h-3 w-3" />
                    <span>{service.tag}</span>
                  </div>
                )}

                {/* Card Top: Category and Title */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-medium text-emerald-400">{service.categoryLabel}</span>
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{service.deliveryTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="mb-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">التكلفة الإجمالية</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                          {service.price.toLocaleString('ar-EG')}
                        </span>
                        <span className="text-sm font-semibold text-emerald-400">جنيه مصري</span>
                        {service.originalPrice && (
                          <span className="text-xs text-slate-500 line-through mr-1 tabular-nums">
                            {service.originalPrice.toLocaleString('ar-EG')} ج.م
                          </span>
                        )}
                      </div>
                    </div>

                    {service.freeRevisionNote && (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-800/60 rounded px-2 py-1">
                          <ShieldCheck className="h-3 w-3" />
                          <span>{service.freeRevisionNote}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Feature checklist */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions: Primary Popup Form & Direct WhatsApp */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-95 cursor-pointer"
                  >
                    <span>طلب الخدمة وكتابة التفاصيل</span>
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>

                  <a
                    href={getDirectWhatsAppUrl(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>طلب فوري مباشر عبر الواتساب</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
