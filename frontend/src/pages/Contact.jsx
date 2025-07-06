import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formState);
    // Show success message
    setIsSubmitted(true);
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="bg-cream-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Send us a message</h2>
            
            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" />
                <span>Thank you for your message! We'll get back to you soon.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Our Location</h3>
                  <p className="text-gray-700">123 Education Lane, Patna, Bihar, India</p>
                  <p className="text-gray-700">Pin Code: 800001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                  <p className="text-gray-700">Main: +91 98765 43210</p>
                  <p className="text-gray-700">Office: +91 12345 67890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-700">info@dikshafoundation.org</p>
                  <p className="text-gray-700">support@dikshafoundation.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaClock className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-8 bg-gray-200 rounded-xl h-64 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.51391068215!2d85.0730023781853!3d25.608020764031082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed585f2ff9f8cf%3A0xd31468065afacd4e!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1656518951099!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Diksha Foundation Location"
              ></iframe>
            </div>
            
            {/* FAQ Teaser */}
            <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Have more questions?</h3>
              <p className="text-gray-700 mb-4">
                Check our Frequently Asked Questions or reach out to us directly.
              </p>
              <a 
                href="/faq" 
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                View FAQ
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Volunteer Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Volunteer Team</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Make a difference in children's lives by volunteering your time and skills. 
            We have various opportunities available for passionate individuals.
          </p>
          <a 
            href="/volunteer" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition font-semibold inline-block"
          >
            Become a Volunteer
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;