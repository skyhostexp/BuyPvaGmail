import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  X, 
  CheckCircle2,
  FileText,
  Bookmark
} from 'lucide-react';
import { blogGuides, allGuideTopics } from '../data/blogData';
import { BlogGuide } from '../types';

export const GuidesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogGuide | null>(null);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const categories = ['All', 'Cold Outreach', 'Antidetect & Proxies', 'Google Ads', 'Google Reviews', 'Account Security'];

  const filteredGuides = blogGuides.filter((guide) => {
    const matchesCat = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog" className="py-16 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>50+ Guides & Documentation Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Agency Knowledge Base & Warmup Guides
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Master the art of high-deliverability cold email, avoiding Google phone checkpoints, and optimizing antidetect browser profiles.
          </p>

          {/* Search Bar & Filters */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 50+ guides & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setActiveArticle(guide)}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                  <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-md border border-blue-200">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {guide.excerpt}
                </p>
              </div>

              {/* Tags and CTA */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {guide.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* 50+ Topics Directory Drawer */}
        <div className="mt-14 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400" />
                Complete 50+ Agency Playbook Index
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Included free with every purchase. Access all blueprints in your order dashboard.
              </p>
            </div>
            <button
              onClick={() => setShowAllTopics(!showAllTopics)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              {showAllTopics ? 'Collapse Topic List' : 'Expand All 50+ Topics'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(showAllTopics ? allGuideTopics : allGuideTopics.slice(0, 6)).map((topic, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 ml-3">
                  {activeArticle.date} • {activeArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 leading-tight">
              {activeArticle.title}
            </h2>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-b border-slate-100 py-4 my-4">
              {activeArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                {activeArticle.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
