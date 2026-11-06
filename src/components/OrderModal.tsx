import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, UploadCloud, CheckCircle2, Shield, Mail, Phone, Link2 } from 'lucide-react';
import { ServiceItem, SERVICES_LIST, AGENCY_CONTACT } from '../data/servicesData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServiceItem | null;
  customBundleServices?: ServiceItem[];
  customBundlePrice?: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedService,
  customBundleServices,
  customBundlePrice,
}) => {
  const [serviceId, setServiceId] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [fileLinks, setFileLinks] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize when opened with a specific service
  useEffect(() => {
    if (customBundleServices && customBundleServices.length > 0) {
      setServiceId('custom-bundle');
    } else if (selectedService) {
      setServiceId(selectedService.id);
    } else if (SERVICES_LIST.length > 0) {
      setServiceId(SERVICES_LIST[0].id);
    }
    setErrorMsg('');
    setIsSuccess(false);
  }, [selectedService, customBundleServices, isOpen]);

  if (!isOpen) return null;

  const isCustomBundle = serviceId === 'custom-bundle' && customBundleServices && customBundleServices.length > 0;
  
  const currentService = SERVICES_LIST.find(s => s.id === serviceId);

  const activeTitle = isCustomBundle 
    ? `باقة مخصصة (${customBundleServices.length} خدمات: ${customBundleServices.map(s => s.title).join(' + ')})`
    : currentService?.title || 'خدمة مخصصة';

  const activePrice = isCustomBundle 
    ? (customBundlePrice || 0)
    : (currentService?.price || 0);

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      if (!fileLinks) {
        setFileLinks(`ملف مرفق محلياً: ${file.name}`);
      }
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setErrorMsg('برجاء كتابة الاسم الكامل للمتابعة.');
      return;
    }
    if (!clientPhone.trim()) {
      setErrorMsg('برجاء إدخال رقم الهاتف أو رقم الواتساب الخاص بك.');
      return;
    }

    // Build the formatted Arabic WhatsApp text
    const messageParts = [
      '⚡ *طلب خدمة جديد عبر موقع نكست فيجن*',
      '----------------------------------------',
      `👤 *الاسم الكامل:* ${clientName.trim()}`,
      `📱 *رقم الهاتف / الواتساب:* ${clientPhone.trim()}`,
      `🛠️ *نوع الخدمة:* ${activeTitle}`,
      `💰 *السعر المقدر:* ${activePrice.toLocaleString('ar-EG')} جنيه مصري`,
    ];

    if (projectDetails.trim()) {
      messageParts.push(`📝 *تفاصيل المشروع:* ${projectDetails.trim()}`);
    }

    if (fileLinks.trim()) {
      messageParts.push(`📂 *رابط الملفات / الملحقات:* ${fileLinks.trim()}`);
    }

    messageParts.push('----------------------------------------');
    messageParts.push('مرحباً، أرجو تأكيد استلام الطلب وبدء التنفيذ.');

    const fullMessage = messageParts.join('\n');
    const waUrl = `https://wa.me/${AGENCY_CONTACT.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    setIsSuccess(true);

    // Open WhatsApp in a new tab/window
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 text-right overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              جاري توجيهك إلى واتساب الآن!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              تم تجهيز رسالة طلبك بالكامل مع السعر والتفاصيل. سيتم فتح محادثة الواتساب مع فريق نكست فيجن فوراً.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                إغلاق النافذة
              </button>
              <a
                href={`https://wa.me/${AGENCY_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-400"
              >
                <MessageCircle className="h-4 w-4" />
                <span>إعادة فتح الواتساب</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitWhatsApp} className="space-y-5">
            
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400 mb-2">
                <Shield className="h-3 w-3" />
                <span>طلب مباشر بدون شراء إلكتروني</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                تأكيد طلب الخدمة والتواصل السريع
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                املأ البيانات وسيتم نقلك مباشرة لمحادثة واتساب لبدء التنفيذ والاتفاق على كافة المتطلبات.
              </p>
            </div>

            {/* Service & Price Highlight Box */}
            <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block mb-1">الخدمة المختارة:</span>
                <span className="font-bold text-sm sm:text-base text-white">
                  {activeTitle}
                </span>
              </div>
              <div className="sm:text-left shrink-0">
                <span className="text-xs text-slate-400 block mb-1">السعر المعتمد:</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl font-black text-emerald-400 tabular-nums">
                    {activePrice.toLocaleString('ar-EG')}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">جنيه مصري</span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Select Service (if user wants to change service from inside popup) */}
              {!isCustomBundle && (
                <div>
                  <label htmlFor="service-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    تغيير نوع الخدمة (اختياري)
                  </label>
                  <select
                    id="service-select"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    {SERVICES_LIST.map((service) => (
                      <option key={service.id} value={service.id} className="bg-slate-900 text-white">
                        {service.title} — {service.price.toLocaleString('ar-EG')} ج.م
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم الكامل <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    رقم الهاتف / الواتساب <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="مثال: 01115409186"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="project-details" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  تفاصيل ومتطلبات المشروع (اختياري)
                </label>
                <textarea
                  id="project-details"
                  rows={3}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="اكتب نبذة عن متجرك، منتجاتك، أو ما ترغب في تنفيذه بدقة..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* File Attachment / Cloud link */}
              <div>
                <label htmlFor="file-links" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رفع الملفات أو رابط صور المنتجات (Google Drive / WeTransfer / Dropbox)
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      id="file-links"
                      type="text"
                      value={fileLinks}
                      onChange={(e) => setFileLinks(e.target.value)}
                      placeholder="ضع رابط درايف أو مجلد الصور هنا..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 pl-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <Link2 className="absolute left-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
                  </div>

                  {/* Local file picker */}
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors">
                      <UploadCloud className="h-3.5 w-3.5 text-cyan-400" />
                      <span>اختيار ملف محلي</span>
                      <input
                        type="file"
                        onChange={handleFileUploadSim}
                        className="hidden"
                      />
                    </label>
                    {uploadedFileName && (
                      <span className="text-xs text-emerald-400 truncate max-w-xs">
                        تم اختيار: {uploadedFileName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact & Email Note */}
            <div className="rounded-lg bg-slate-950/50 p-3 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span>البريد المعتمد: {AGENCY_CONTACT.primaryEmail}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span dir="ltr">{AGENCY_CONTACT.whatsappFormatted}</span>
              </div>
            </div>

            {/* Submit to WhatsApp Button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>إرسال الطلب فوراً إلى واتساب ({AGENCY_CONTACT.whatsappFormatted})</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 لا يلزم أي دفع بالفيزا أو كروت بنكية داخل الموقع. يتم الاتفاق المالي بالكامل في محادثة الواتساب.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
