import React from 'react';
import { ExternalLink, Layers, Sparkles, Video, ShoppingCart } from 'lucide-react';

interface VisualShowcaseProps {
  onQuickOrderClick: () => void;
}

export const VisualShowcase: React.FC<VisualShowcaseProps> = ({ onQuickOrderClick }) => {
  const showcaseItems = [
    {
      title: 'تصوير رقمي احترافي للمنتجات بالذكاء الاصطناعي',
      subtitle: 'دقة فائقة 4K وإضاءة سينمائية للمنتجات والعبوات الفاخرة',
      image: '/src/assets/images/ai_product_showcase_1793949255935.jpg',
      category: 'Ai Product Render',
      icon: Sparkles,
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'متاجر شوبيفاي وتجارة إلكترونية متكاملة',
      subtitle: 'واجهات مستخدم سريعة مصممة لتحقيق أقصى معدل تحويل وسلال شرائية',
      image: '/src/assets/images/ecommerce_store_mockup_1793949257345.jpg',
      category: 'Shopify & Storefronts',
      icon: ShoppingCart,
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'فيديوهات ريلز وشورتس ومونتاج بالذكاء الاصطناعي',
      subtitle: 'مقاطع خاطفة للمنتجات ومحتوى فيرال سريع الانتشار لمنصات التواصل',
      image: '/src/assets/images/motion_video_reel_1793949256530.jpg',
      category: 'Shorts & AI Motion',
      icon: Video,
      aspect: 'aspect-[4/3]',
    },
  ];

  return (
    <section id="showcase" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <Layers className="h-3.5 w-3.5" />
              <span>جودة تنفيذ معتمدة</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              نماذج من جودة الإخراج البصري والتنفيذ
            </h2>
            <p className="text-slate-300 text-base">
              نجمع بين أحدث محركات الذكاء الاصطناعي التوليدي واللمسة الفنية الاحترافية لنصنع لعلامتك حضوراً استثنائياً يتفوق على المنافسين.
            </p>
          </div>

          <button
            onClick={onQuickOrderClick}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-500 hover:text-white shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>طلب تنفيذ مشروع مماثل</span>
            <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
          </button>
        </div>

        {/* 3-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseItems.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-500/5"
              >
                {/* Visual Media with fallback */}
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-slate-950`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback styled gradient if image fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Category Chip */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md px-3 py-1.5 border border-slate-800 text-xs text-emerald-400 font-medium">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
