import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/servicesData';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (in RTL, this is start): Text & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>وكالة تصميم رقمي وذكاء اصطناعي من الجيل الجديد</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight lg:leading-tight">
              حوّل فكرة متجرك وعلامتك إلى <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">واقع مرئي احترافي</span> يضاعف مبيعاتك
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              نقدم باقات تصميم متكاملة لأصحاب المتاجر الإلكترونية وصناع المحتوى: جلسات تصوير منتجات بذكاء اصطناعي 4K، متاجر شوبيفاي كاملة، هويات بصرية مميزة، وفيديوهات قصيرة تخطف الأنظار — مع طلب مباشر عبر واتساب دون تعقيدات وبأسعار شفافة بالجنيه المصري.
            </p>

            {/* Quick Guarantees & Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>تسليم سريع يبدأ من 24 ساعة</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>تعديل مضمون وتسليم ملفات أصلية</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>طلب بضغطة زر إلى واتساب فوراً</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <span>ابدأ طلب خدمة مخصصة</span>
                <Sparkles className="h-4 w-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <span>تصفح قائمة الأسعار</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href={AGENCY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-900/40 hover:border-emerald-400"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>محادثة واتساب سريعة</span>
              </a>
            </div>

          </div>

          {/* Left Column: Visual Focal Carrier */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto rounded-2xl border border-slate-700/80 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm group">
              <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-slate-950">
                <img
                  src="/src/assets/images/hero_cyber_studio_1793949256712.jpg"
                  alt="نكست فيجن استوديو التصميم والذكاء الاصطناعي"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Float tag on image */}
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs rounded-lg bg-slate-950/80 backdrop-blur-md px-3.5 py-2 border border-slate-800 text-slate-200">
                  <span className="font-medium text-emerald-400">استوديو نكست فيجن للذكاء الاصطناعي</span>
                  <span className="text-slate-400">NextVision Digital Suite</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Metric Strip in a full-width row below hero */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm text-center">
          <div className="p-3 border-l border-slate-800/80 last:border-l-0">
            <div className="font-display text-2xl lg:text-3xl font-extrabold text-white tabular-nums">
              10+
            </div>
            <div className="text-xs lg:text-sm text-slate-400 mt-1">خدمات تصميم رقمية متكاملة</div>
          </div>

          <div className="p-3 border-l border-slate-800/80 last:border-l-0">
            <div className="font-display text-2xl lg:text-3xl font-extrabold text-emerald-400 tabular-nums">
              100 ج.م
            </div>
            <div className="text-xs lg:text-sm text-slate-400 mt-1">فيديوهات قصيرة تبدأ من 100 ج.م</div>
          </div>

          <div className="p-3 border-l border-slate-800/80 last:border-l-0">
            <div className="font-display text-2xl lg:text-3xl font-extrabold text-cyan-400 tabular-nums">
              24-48 ساعة
            </div>
            <div className="text-xs lg:text-sm text-slate-400 mt-1">متوسط سرعة الإنجاز والتسليم</div>
          </div>

          <div className="p-3">
            <div className="font-display text-2xl lg:text-3xl font-extrabold text-white tabular-nums">
              0%
            </div>
            <div className="text-xs lg:text-sm text-slate-400 mt-1">رسوم وسيط - تواصل مباشر مع المنفذ</div>
          </div>
        </div>

      </div>
    </section>
  );
};
