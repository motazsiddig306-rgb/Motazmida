import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Terminal } from 'lucide-react';
import { AGENCY_PROMPT_COPY } from '../data/servicesData';

export const BrandPromptSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'agency' | 'ai_prompts'>('agency');

  const aiPromptsPresets = [
    {
      title: 'برومبت توليد صور منتجات AI فاخرة',
      prompt: 'Commercial 8k studio product photography of [اسم المنتج], placed on modern obsidian architectural stone pedestal, cinematic rim lighting in emerald and cyan neon tones, crisp water droplets, luxury cosmetics/perfume advertising style, ultra-realistic.'
    },
    {
      title: 'برومبت تصميم متجر شوبيفاي احترافي',
      prompt: 'High-converting modern minimalist Shopify storefront UI/UX design for [نوع المتجر], dark luxury aesthetics, clean typography, conversion-optimized product grid, seamless mobile checkout experience, 4k interface design.'
    },
    {
      title: 'برومبت فيديو ريلز وشورتس للمنتجات (10 ثواني)',
      prompt: 'Dynamic fast-paced 10-second product showcase video for [اسم المنتج], 9:16 vertical format, 3 fast cinematic camera cuts, product benefits text overlays, high-energy viral audio pacing, TikTok and Reels ready.'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="brand-prompt" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>برومبت ووصف تسويقي جاهز للموقع</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            برومبت الوصف التسويقي والترويجي لنكست فيجن
          </h2>
          <p className="text-slate-300 text-base">
            تم تجهيز هذا الوصف والبرومبتات خصيصاً لاستخدامها في الحملات الإعلانية، أو تغذية نماذج الذكاء الاصطناعي، أو وضعه في النبذة التعريفية (Bio) لمتجرك وصفحاتك.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto mb-8 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('agency')}
            className={`w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'agency'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            وصف الوكالة الرسمي
          </button>
          <button
            onClick={() => setActiveTab('ai_prompts')}
            className={`w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'ai_prompts'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            برومبتات AI مقترحة لتوليد المحتوى
          </button>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'agency' ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md relative group">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span>نص النبذة التعريفية للوكالة (قابل للنسخ والاستخدام الفوري)</span>
                </div>
                <button
                  onClick={() => handleCopy(AGENCY_PROMPT_COPY)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/50 px-3.5 py-1.5 text-xs font-semibold text-purple-200 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>تم النسخ بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-5 border border-slate-800/80 font-sans text-sm sm:text-base text-slate-200 leading-relaxed space-y-4">
                <p className="font-semibold text-purple-300">
                  وكالة نكست فيجن للخدمات الرقمية والذكاء الاصطناعي (NextVision AI & Digital Studio):
                </p>
                <p>
                  &quot;وكالة رقمية متطورة رائدة في تمكين أصحاب المتاجر والمشاريع الناشئة من خلال دمج التصميم الفاخر مع أحدث تقنيات الذكاء الاصطناعي التوليدي. نقدم حلولاً متكاملة تشمل تصوير منتجات AI بدقة سينمائية 4K، وتطوير متاجر شوبيفاي عالية التحويل، وهويات بصرية وشعارات فريدة، وصناعة فيديوهات قصيرة وريلز تخطف الانتباه وتضاعف المبيعات. نتميز بالسرعة الفائقة، الأسعار التنافسية بالجنيه المصري، ودعم مباشر ومرن عبر واتساب لتحويل أفكارك إلى نتائج ملموسة دون تعقيدات.&quot;
                </p>
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span>📍 مصر والشرق الأوسط</span>
                  <span>⚡ التسليم: 24 - 72 ساعة</span>
                  <span>💬 واتساب: 00201115409186</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {aiPromptsPresets.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-purple-400" />
                      {item.title}
                    </span>
                    <button
                      onClick={() => handleCopy(item.prompt)}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Copy className="h-3 w-3" />
                      <span>نسخ البرومبت</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-950 text-xs font-mono text-purple-300/90 whitespace-pre-wrap break-all border border-slate-800/80">
                    {item.prompt}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
