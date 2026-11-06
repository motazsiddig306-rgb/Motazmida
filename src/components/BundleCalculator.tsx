import React, { useState, useMemo } from 'react';
import { Calculator, Check, MessageCircle, Percent, Sparkles, Plus, Trash2 } from 'lucide-react';
import { SERVICES_LIST, ServiceItem, AGENCY_CONTACT } from '../data/servicesData';

interface BundleCalculatorProps {
  onOrderCustomBundle: (selectedServices: ServiceItem[], finalPrice: number, discountAmount: number) => void;
}

export const BundleCalculator: React.FC<BundleCalculatorProps> = ({ onOrderCustomBundle }) => {
  // Pre-select 2 popular services as default for great UX
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'ai-product-store',
    'facebook-posts'
  ]);

  const toggleService = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedServices = useMemo(() => {
    return SERVICES_LIST.filter(s => selectedIds.includes(s.id));
  }, [selectedIds]);

  const subtotal = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.price, 0);
  }, [selectedServices]);

  // Discount rule: 2 services = 10%, 3+ services = 15%
  const discountRate = useMemo(() => {
    if (selectedServices.length >= 3) return 0.15;
    if (selectedServices.length === 2) return 0.10;
    return 0;
  }, [selectedServices.length]);

  const discountAmount = Math.round(subtotal * discountRate);
  const finalPrice = subtotal - discountAmount;

  const generateWhatsAppBundleUrl = () => {
    const serviceTitles = selectedServices.map((s, idx) => `${idx + 1}. ${s.title} (${s.price.toLocaleString('ar-EG')} ج.م)`).join('\n');
    const discountText = discountRate > 0 
      ? `\n🎁 *نسبة الخصم:* ${discountRate * 100}%\n💰 *وفرت:* ${discountAmount.toLocaleString('ar-EG')} جنيه`
      : '';

    const text = `مرحباً نكست فيجن، قمت بتجميع باقة مخصصة عبر حاسبة الموقع:\n\n*الخدمات المختارة:*\n${serviceTitles}\n\n*الإجمالي قبل الخصم:* ${subtotal.toLocaleString('ar-EG')} جنيه${discountText}\n*المبلغ المطلوب النهائي:* ${finalPrice.toLocaleString('ar-EG')} جنيه مصري\n\nأود بدء تنفيذ هذه الباقة معكم.`;

    return `https://wa.me/${AGENCY_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>حاسبة الباقات المخصصة والخصم التلقائي</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            اصنع باقتك بنفسك واحصل على خصم فوري يصل إلى 15%
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            حدد الخدمات التي يحتاجها متجرك الآن، وستقوم الحاسبة بدمجها تلقائياً وتطبيق خصم حصري للباقة مع تجهيز رابط الواتساب بضغطة زر واحدة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Selector (8 Columns) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 text-sm text-slate-300">
              <span className="font-semibold text-white">اختر الخدمات لإضافتها للباقة:</span>
              <span className="text-xs text-slate-400">
                (تم اختيار {selectedServices.length} من أصل {SERVICES_LIST.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {SERVICES_LIST.map((service) => {
                const isSelected = selectedIds.includes(service.id);

                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span className={`h-4 w-4 rounded flex items-center justify-center text-xs shrink-0 ${isSelected ? 'bg-emerald-500 text-white' : 'border border-slate-700 bg-slate-800'}`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </span>
                        <span className="line-clamp-1">{service.title}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {service.categoryLabel}
                      </div>
                      <div className="text-xs font-semibold text-emerald-400 tabular-nums">
                        {service.price.toLocaleString('ar-EG')} ج.م
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Summary Card (5 Columns) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-display font-bold text-lg text-white">ملخص الباقة الذكية</h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={() => setSelectedIds([])}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>تفريغ</span>
                  </button>
                )}
              </div>

              {/* Selected List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedServices.length === 0 ? (
                  <div className="text-center py-6 text-sm text-slate-400">
                    لم تقم باختيار أي خدمة بعد. انقر على أي خدمة من القائمة لإضافتها.
                  </div>
                ) : (
                  selectedServices.map(s => (
                    <div key={s.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60 last:border-b-0">
                      <span className="text-slate-200 line-clamp-1">{s.title}</span>
                      <span className="font-semibold text-emerald-400 tabular-nums shrink-0 mr-2">
                        {s.price.toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-sm">
                <div className="flex items-center justify-between text-slate-300">
                  <span>المجموع الأساسي:</span>
                  <span className="font-medium text-white tabular-nums">
                    {subtotal.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>

                {discountRate > 0 ? (
                  <div className="flex items-center justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Percent className="h-3.5 w-3.5" />
                      <span>خصم الباقة المجمعة ({discountRate * 100}%):</span>
                    </span>
                    <span className="tabular-nums">- {discountAmount.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                ) : selectedServices.length === 1 ? (
                  <div className="text-xs text-cyan-400 bg-cyan-950/40 p-2 rounded-lg border border-cyan-800/50">
                    💡 أضف خدمة ثانية لتحصل على خصم 10% فوري، أو 3 خدمات لخصم 15%!
                  </div>
                ) : null}

                <div className="flex items-baseline justify-between pt-3 border-t border-slate-700/80">
                  <div>
                    <span className="block text-xs text-slate-400">السعر النهائي بعد التخفيض:</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-display text-3xl font-black text-white tabular-nums">
                        {finalPrice.toLocaleString('ar-EG')}
                      </span>
                      <span className="text-sm font-bold text-emerald-400">جنيه مصري</span>
                    </div>
                  </div>

                  {discountAmount > 0 && (
                    <div className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-md font-semibold">
                      وفرت {discountAmount.toLocaleString('ar-EG')} ج.م
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={selectedServices.length > 0 ? generateWhatsAppBundleUrl() : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold text-white shadow-lg transition-all ${
                    selectedServices.length > 0
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 active:scale-95 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>طلب الباقة المجمعة عبر واتساب فوراً</span>
                </a>

                <button
                  onClick={() => {
                    if (selectedServices.length > 0) {
                      onOrderCustomBundle(selectedServices, finalPrice, discountAmount);
                    }
                  }}
                  disabled={selectedServices.length === 0}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border py-2.5 px-4 text-xs font-semibold transition-all ${
                    selectedServices.length > 0
                      ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-500 hover:text-white cursor-pointer'
                      : 'border-slate-800 bg-slate-900/50 text-slate-600 pointer-events-none'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>تعبئة بيانات الطلب المجمع في النموذج</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
