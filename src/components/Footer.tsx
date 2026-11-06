import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Sparkles, Check, Copy, ArrowUp, ShieldCheck } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/servicesData';

interface FooterProps {
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#060910] text-slate-300 border-t border-slate-800">
      
      {/* Contact & Inquiry Banner */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>جاهزون لبدء مشروعك الآن</span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                هل لديك فكرة أو متجر ترغب في تطويره؟
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                تواصل معنا مباشرة عبر محادثة واتساب الشخصية أو من خلال نموذج الطلب السريع للحصول على استشارة مجانية وعرض سعر فوري.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenOrderModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                >
                  <span>فتح نموذج الطلب السريع</span>
                  <Sparkles className="h-4 w-4" />
                </button>

                <a
                  href={AGENCY_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-5 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>محادثة واتساب مباشرة</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cards (5 Columns) */}
            <div className="lg:col-span-5 space-y-3">
              
              {/* WhatsApp direct card */}
              <a
                href={AGENCY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-emerald-500/60 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">رقم الواتساب المعتمد</div>
                    <div className="text-sm font-bold text-white font-mono" dir="ltr">{AGENCY_CONTACT.whatsappFormatted}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400">تواصل الآن ←</span>
              </a>

              {/* Primary Email */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">البريد الإلكتروني الرئيسي</div>
                    <div className="text-xs sm:text-sm font-medium text-white font-mono break-all">{AGENCY_CONTACT.primaryEmail}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(AGENCY_CONTACT.primaryEmail)}
                  className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="نسخ البريد"
                >
                  {copiedEmail === AGENCY_CONTACT.primaryEmail ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Secondary Email */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">البريد الإلكتروني الإضافي</div>
                    <div className="text-xs sm:text-sm font-medium text-white font-mono break-all">{AGENCY_CONTACT.secondaryEmail}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(AGENCY_CONTACT.secondaryEmail)}
                  className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="نسخ البريد"
                >
                  {copiedEmail === AGENCY_CONTACT.secondaryEmail ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Quiet Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">نكست فيجن (NextVision AI Studio)</span>
            <span aria-hidden="true">·</span>
            <span>جميع الحقوق محفوظة 2026</span>
            <span aria-hidden="true">·</span>
            <span>الأسعار بالجنيه المصري (EGP)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ضمان جودة وتسليم رسمي</span>
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
