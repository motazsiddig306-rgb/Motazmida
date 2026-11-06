import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/servicesData';

interface NavbarProps {
  onQuickOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuickOrderClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display font-black text-xl bg-gradient-to-l from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            نكست فيجن <span className="text-emerald-400 text-sm font-normal">AI Studio</span>
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            الخدمات والأسعار
          </a>
          <a href="#calculator" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            حاسبة الباقات الذكية
          </a>
          <a href="#showcase" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            نماذج الأعمال
          </a>
          <a href="#brand-prompt" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            برومبت الوصف
          </a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            التواصل المباشر
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={AGENCY_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-400 hover:to-teal-500 active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            <span>طلب واتساب مباشر</span>
          </a>
        </div>

      </div>
    </header>
  );
};
