import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Users, Award, TrendingUp } from 'lucide-react';

const Gallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.gallery-item', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.video-item', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.videos-section',
            start: "top 80%",
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={galleryRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Gallery & Success Stories</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Take a look at our vibrant learning community, student achievements, and memorable moments 
              from our trading workshops and seminars.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Learning in Action</h2>
            <p className="text-xl text-gray-600">Moments from our interactive trading sessions and workshops</p>
          </div>

          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Trading Session */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Live Trading Session</h3>
                  <p className="text-sm opacity-90">Students analyzing real-time market data during our intensive day trading workshop</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>

            {/* Graduation Ceremony */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Graduation Ceremony</h3>
                  <p className="text-sm opacity-90">Celebrating our students' completion of the Advanced Options Trading course</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Technical Analysis Lab</h3>
                  <p className="text-sm opacity-90">Hands-on chart analysis session with our expert instructors</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>

            {/* Workshop */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Risk Management Workshop</h3>
                  <p className="text-sm opacity-90">Interactive session on portfolio protection and position sizing strategies</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>

            {/* Success Story */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Student Success Story</h3>
                  <p className="text-sm opacity-90">Former student sharing their trading journey and achievements with current students</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>

            {/* Networking Event */}
            <div className="gallery-item relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-lg font-semibold mb-2">Networking Event</h3>
                  <p className="text-sm opacity-90">Monthly trader meetup bringing together students and alumni for knowledge sharing</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white bg-opacity-90 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="videos-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Student Success Videos</h2>
            <p className="text-xl text-gray-600">Watch our students share their transformation stories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="video-item bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-sm font-semibold">Success Story: From Beginner to Profitable Trader</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 text-blue-600 p-4 rounded-full">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Sarah's Trading Journey</h3>
                <p className="text-gray-600 text-sm">How MarketPro helped Sarah transition from her corporate job to full-time trading</p>
              </div>
            </div>

            <div className="video-item bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-sm font-semibold">Portfolio Growth: 300% in 6 Months</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 text-blue-600 p-4 rounded-full">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Mike's Portfolio Success</h3>
                <p className="text-gray-600 text-sm">Learn how Mike achieved consistent profits using our taught strategies</p>
              </div>
            </div>

            <div className="video-item bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-sm font-semibold">Options Trading Success Story</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 text-blue-600 p-4 rounded-full">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Lisa's Options Mastery</h3>
                <p className="text-gray-600 text-sm">How Lisa mastered complex options strategies for consistent income</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Community Achievements</h2>
            <p className="text-xl text-blue-200">Numbers that speak for our students' success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <p className="text-blue-200">Successful Graduates</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$50M+</div>
              <p className="text-blue-200">Student Profits Generated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <p className="text-blue-200">Course Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <p className="text-blue-200">Average Student Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;