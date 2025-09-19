import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, ArrowRight, TrendingUp, BarChart, PieChart, Clock } from 'lucide-react';

const Blog = () => {
  const blogRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.blog-post', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.blog-grid',
            start: "top 80%",
          }
        }
      );
    }, blogRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = {
    title: "The Ultimate Guide to Technical Analysis in 2025",
    excerpt: "Master the art of reading charts and identifying profitable trading opportunities with modern technical analysis techniques.",
    author: "Michael Davis",
    date: "January 15, 2025",
    readTime: "12 min read",
    category: "Technical Analysis",
    image: "featured"
  };

  const blogPosts = [
    {
      title: "5 Risk Management Rules Every Trader Must Follow",
      excerpt: "Learn the fundamental principles of protecting your capital and managing risk in volatile markets.",
      author: "Sarah Kim",
      date: "January 12, 2025",
      readTime: "8 min read",
      category: "Risk Management",
      icon: <PieChart className="h-6 w-6" />
    },
    {
      title: "How to Build a Diversified Trading Portfolio",
      excerpt: "Strategies for balancing different asset classes and trading styles to optimize returns while minimizing risk.",
      author: "James Rodriguez",
      date: "January 10, 2025",
      readTime: "10 min read",
      category: "Portfolio Management",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Options Trading: Weekly vs Monthly Strategies",
      excerpt: "Compare the pros and cons of weekly and monthly options strategies for different market conditions.",
      author: "Michael Davis",
      date: "January 8, 2025",
      readTime: "15 min read",
      category: "Options Trading",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Market Psychology: Understanding Crowd Behavior",
      excerpt: "Dive into the psychological aspects of trading and how to avoid common behavioral pitfalls.",
      author: "Sarah Kim",
      date: "January 5, 2025",
      readTime: "12 min read",
      category: "Trading Psychology",
      icon: <User className="h-6 w-6" />
    },
    {
      title: "Day Trading vs Swing Trading: Which Is Right for You?",
      excerpt: "Comprehensive comparison of day trading and swing trading strategies to help you choose your path.",
      author: "James Rodriguez",
      date: "January 3, 2025",
      readTime: "9 min read",
      category: "Trading Strategies",
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: "Cryptocurrency Trading: Opportunities and Risks",
      excerpt: "Navigate the exciting world of crypto trading with insights on opportunities and risk management.",
      author: "Michael Davis",
      date: "December 30, 2024",
      readTime: "11 min read",
      category: "Cryptocurrency",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const categories = [
    "All Posts", "Technical Analysis", "Risk Management", "Options Trading", 
    "Trading Psychology", "Market News", "Beginner Guides"
  ];

  return (
    <div ref={blogRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Trading Insights & Market Analysis</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Stay ahead of the markets with expert analysis, trading strategies, and educational content 
              from our team of professional traders and market analysts.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <span>Expert Authors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12 text-white">
                <div className="inline-block bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured Article
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-200 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center group">
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="p-8 lg:p-12">
                <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                  <TrendingUp className="h-24 w-24 text-white opacity-60 mx-auto mb-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">Chart Analysis</div>
                    <div className="text-blue-200 text-sm">Advanced Technical Indicators</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-600 hover:text-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="blog-post bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      {post.icon}
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center group">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;