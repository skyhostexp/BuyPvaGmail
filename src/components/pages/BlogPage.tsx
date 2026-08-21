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
  Bookmark, 
  ChevronRight,
  Share2,
  ThumbsUp,
  ArrowLeft
} from 'lucide-react';
import { blogGuides, allGuideTopics } from '../../data/blogData';
import { BlogGuide } from '../../types';

interface BlogPageProps {
  onNavigateHome?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome }) => {
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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Blog & Documentation</span>
          </div>

          {activeArticle && (
            <button
              onClick={() => setActiveArticle(null)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>50+ Guides & Documentation Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Agency Knowledge Base & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">Warmup Guides</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Master high-deliverability cold email, avoid Google phone checkpoints, bypass Google Ads billing suspensions, and manage multi-account antidetect browser profiles.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 50+ articles, tools, warmup strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* If Active Article is Selected, Show Full Article Reader */}
        {activeArticle ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-6">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
                <span>{activeArticle.date}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
              {activeArticle.title}
            </h1>

            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 mb-8">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Executive Summary</span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {activeArticle.excerpt}
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-5 text-slate-700 leading-relaxed">
              {activeArticle.content.map((paragraph, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500">Related Tags:</span>
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Back to All Guides
              </button>
            </div>
          </div>
        ) : (
          /* Guides Grid View */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => setActiveArticle(guide)}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {guide.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {guide.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                      {guide.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {guide.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 50+ Extended Knowledge Topics Cloud */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">50+ Additional Topics & Tutorials</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Explore our comprehensive documentation archive for agency growth hacks</p>
                </div>
                <button
                  onClick={() => setShowAllTopics(!showAllTopics)}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {showAllTopics ? 'Show Less' : 'View All 50+ Topics'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(showAllTopics ? allGuideTopics : allGuideTopics.slice(0, 18)).map((topic, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchQuery(topic.split(' ')[0]);
                    }}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-medium border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3 h-3 text-slate-400" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </section>
    </div>
  );
};
