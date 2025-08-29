import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Clock, Users, Star, CheckCircle, TrendingUp, BarChart, PieChart } from 'lucide-react';

const Courses = () => {
  const coursesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.courses-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.course-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.courses-grid',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.feature-item', 
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.features-section',
            start: "top 80%",
          }
        }
      );
    }, coursesRef);

    return () => ctx.revert();
  }, []);

  const courses = [
    {
      title: "Stock Market Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      students: 1200,
      rating: 4.9,
      price: "$299",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Perfect for beginners, this course covers market basics, terminology, and foundational concepts.",
      features: [
        "Market structure and participants",
        "Types of securities and exchanges",
        "Basic analysis techniques",
        "Risk management principles"
      ]
    },
    {
      title: "Technical Analysis Mastery",
      level: "Intermediate",
      duration: "8 weeks",
      students: 950,
      rating: 4.8,
      price: "$599",
      icon: <BarChart className="h-8 w-8" />,
      description: "Master chart patterns, indicators, and technical analysis tools used by professional traders.",
      features: [
        "Chart patterns and candlesticks",
        "Technical indicators (RSI, MACD, etc.)",
        "Support and resistance levels",
        "Trend analysis and momentum"
      ]
    },
    {
      title: "Options Trading Strategies",
      level: "Advanced",
      duration: "10 weeks",
      students: 600,
      rating: 4.9,
      price: "$899",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Advanced options strategies for hedging, income generation, and directional plays.",
      features: [
        "Options basics and Greeks",
        "Covered calls and cash-secured puts",
        "Spreads and complex strategies",
        "Risk management and position sizing"
      ]
    },
    {
      title: "Day Trading Bootcamp",
      level: "Intermediate",
      duration: "12 weeks",
      students: 800,
      rating: 4.7,
      price: "$1299",
      icon: <Clock className="h-8 w-8" />,
      description: "Intensive program covering day trading strategies, psychology, and risk management.",
      features: [
        "Intraday trading strategies",
        "Scalping and momentum trading",
        "Level 2 order book analysis",
        "Trading psychology and discipline"
      ]
    },
    {
      title: "Portfolio Management",
      level: "Intermediate",
      duration: "8 weeks",
      students: 700,
      rating: 4.8,
      price: "$699",
      icon: <PieChart className="h-8 w-8" />,
      description: "Learn to build and manage diversified portfolios for long-term wealth creation.",
      features: [
        "Asset allocation strategies",
        "Risk assessment and management",
        "Rebalancing techniques",
        "Performance measurement"
      ]
    },
    {
      title: "Algorithmic Trading",
      level: "Advanced",
      duration: "14 weeks",
      students: 400,
      rating: 4.9,
      price: "$1599",
      icon: <BarChart className="h-8 w-8" />,
      description: "Develop and implement automated trading systems using programming and backtesting.",
      features: [
        "Strategy development and coding",
        "Backtesting and optimization",
        "Risk management algorithms",
        "Live trading deployment"
      ]
    }
  ];

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  return (
    <div ref={coursesRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="courses-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Master Trading with Expert-Led Courses</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Choose from our comprehensive range of courses designed to take you from beginner to professional trader. 
              Each course includes live sessions, practical exercises, and ongoing support.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span>5,000+ Students</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>4.8 Average Rating</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span>15+ Courses Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-grid py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="course-card bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      {course.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>

                  <div className="space-y-2 mb-6">
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({course.rating})</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="features-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What's Included in Every Course</h2>
            <p className="text-xl text-gray-600">Comprehensive learning experience designed for maximum success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-item text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Sessions</h3>
              <p className="text-gray-600 text-sm">Interactive live classes with Q&A sessions</p>
            </div>

            <div className="feature-item text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Access</h3>
              <p className="text-gray-600 text-sm">Join our exclusive trading community</p>
            </div>

            <div className="feature-item text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Platform</h3>
              <p className="text-gray-600 text-sm">Paper trading with real market data</p>
            </div>

            <div className="feature-item text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Certification</h3>
              <p className="text-gray-600 text-sm">Industry-recognized completion certificate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;