import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="w-full bg-cream-100 text-gray-800">
    {/* Hero Section - Dark Blue - Matching Donate Page Header */}
    <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Creating Joyful Learning for Every Child</h1>
        <p className="text-xl mb-8">
          Empowering children from marginalized communities through holistic education
        </p>
        <Link to="/donate" className="bg-orange-600 hover:bg-orange-700 text-white transition px-8 py-3 rounded-lg font-semibold text-lg inline-block">
          Support Our Cause
        </Link>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Mission Section */}
      <div className="md:flex items-center gap-12 mb-20">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&q=80"
            alt="Children learning together"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            We go beyond traditional academics by nurturing creativity, emotional intelligence, 
            empathy, and civic values through community-driven learning spaces.
          </p>
          <p className="text-lg text-gray-700">
            Diksha Foundation believes every child deserves access to quality education that 
            develops not just their minds, but their hearts and spirits too.
          </p>
        </div>
      </div>

      {/* Impact Numbers - Orange Middle Section */}
      <div className="bg-orange-600 text-white rounded-xl shadow-lg p-10 mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">1000+</p>
            <p className="text-lg">Children Educated</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">15+</p>
            <p className="text-lg">Learning Centers</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">95%</p>
            <p className="text-lg">Attendance Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">8</p>
            <p className="text-lg">Years of Service</p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1542652184-04fe6599aac7?auto=format&fit=crop&q=80"
                alt="Student portrait"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-bold text-lg">Rani Kumari, 14</h4>
                <p className="text-orange-600">Digital Literacy Program</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Before joining Diksha, I had never used a computer. Now I confidently lead digital 
              literacy sessions for younger students! The mentors believed in me when I didn't 
              believe in myself."
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1595074475099-699a8812c8d3?auto=format&fit=crop&q=80"
                alt="Student portrait" 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-bold text-lg">Arjun, 12</h4>
                <p className="text-orange-600">Children's Parliament</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Diksha helped me discover my voice. I now lead our Children's Parliament and have 
              spoken in front of hundreds! I'm learning how to be a leader who listens and works 
              for positive change."
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              "The impact Diksha makes is truly inspiring — empowering children to grow with 
              confidence and purpose."
            </p>
            <p className="font-medium text-blue-800">– Volunteer Teacher</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              "Diksha's blend of emotional and academic education sets it apart. We're proud to 
              support their mission."
            </p>
            <p className="font-medium text-blue-800">– NGO Partner</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <p className="text-gray-700 italic mb-4">
              "I've seen my daughter blossom in confidence since joining. Thank you for believing 
              in every child!"
            </p>
            <p className="font-medium text-blue-800">– Parent</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Join Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Together, we can create transformative learning experiences for children who need it most.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition font-semibold">
            Donate Now
          </Link>
          <Link to="/contact" className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition font-semibold">
            Get Involved
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Home;