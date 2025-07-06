// import React from 'react';

// const About = () => {
//   return (
//     <section className="bg-cream-100">
//       {/* Hero section */}
//       <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">About Diksha Foundation</h1>
//           <p className="text-xl max-w-3xl mx-auto">
//             Transforming lives through education and empowerment since 2017
//           </p>
//         </div>
//       </div>

//       {/* Our Story */}
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <div className="md:flex items-center gap-12 mb-20">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <h2 className="text-3xl font-bold text-orange-700 mb-6">Our Story</h2>
//             <p className="text-lg text-gray-700 mb-6">
//               Diksha Foundation was born from a simple idea: every child deserves quality education regardless of socio-economic background. Founded in 2017 by a group of passionate educators and social workers, we began with a single learning center in rural Bihar.
//             </p>
//             <p className="text-lg text-gray-700">
//               What started as a small initiative has grown into a movement, now spanning 15 learning centers across multiple districts. Our holistic approach focuses on developing not just academic skills but emotional intelligence, creative expression, and civic responsibility.
//             </p>
//           </div>
//           <div className="md:w-1/2">
//             <img 
//               src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
//               alt="Children in a classroom" 
//               className="rounded-xl shadow-lg w-full h-auto"
//             />
//           </div>
//         </div>

//         {/* Our Values */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-bold text-orange-700 mb-10 text-center">Our Values</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-500">
//               <h3 className="text-xl font-bold mb-4 text-blue-800">Inclusivity</h3>
//               <p className="text-gray-700">
//                 We believe education should be accessible to all children regardless of gender, caste, religion, or socio-economic status. Our programs are designed to be inclusive and accommodate diverse learning needs.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-700">
//               <h3 className="text-xl font-bold mb-4 text-blue-800">Holistic Development</h3>
//               <p className="text-gray-700">
//                 Education goes beyond textbooks and exams. We nurture creativity, emotional intelligence, physical wellbeing, and social skills to help children become well-rounded individuals.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-500">
//               <h3 className="text-xl font-bold mb-4 text-blue-800">Community Engagement</h3>
//               <p className="text-gray-700">
//                 We believe in the power of communities to drive change. Our programs actively engage parents, local leaders, and community members to create sustainable educational ecosystems.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Team */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-bold text-orange-700 mb-10 text-center">Our Leadership Team</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <img 
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
//                 alt="Priya Sharma" 
//                 className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
//               />
//               <h3 className="text-xl font-bold text-blue-800">Priya Sharma</h3>
//               <p className="text-orange-600 mb-2">Founder & Executive Director</p>
//               <p className="text-gray-700">Former educator with 15+ years of experience in community development</p>
//             </div>
//             <div className="text-center">
//               <img 
//                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
//                 alt="Rajesh Kumar" 
//                 className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
//               />
//               <h3 className="text-xl font-bold text-blue-800">Rajesh Kumar</h3>
//               <p className="text-orange-600 mb-2">Program Director</p>
//               <p className="text-gray-700">Specialist in curriculum development with a focus on marginalized communities</p>
//             </div>
//             <div className="text-center">
//               <img 
//                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
//                 alt="Ananya Patel" 
//                 className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
//               />
//               <h3 className="text-xl font-bold text-blue-800">Ananya Patel</h3>
//               <p className="text-orange-600 mb-2">Director of Operations</p>
//               <p className="text-gray-700">Expert in nonprofit management and strategic planning</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;


import React from 'react';
// Import team images
import gautamImage from '../assets/gautam.png';
import mohitaImage from '../assets/mohita.png';
import nehaImage from '../assets/neha.png';
import nishaImage from '../assets/nisha.png';

const About = () => {
  return (
    <section className="bg-cream-100">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Diksha Foundation</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming lives through education and empowerment since 2017
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="md:flex items-center gap-12 mb-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-orange-700 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Diksha Foundation was born from a simple idea: every child deserves quality education regardless of socio-economic background. Founded in 2017 by a group of passionate educators and social workers, we began with a single learning center in rural Bihar.
            </p>
            <p className="text-lg text-gray-700">
              What started as a small initiative has grown into a movement, now spanning 15 learning centers across multiple districts. Our holistic approach focuses on developing not just academic skills but emotional intelligence, creative expression, and civic responsibility.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
              alt="Children in a classroom" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-orange-700 mb-10 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-500">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Inclusivity</h3>
              <p className="text-gray-700">
                We believe education should be accessible to all children regardless of gender, caste, religion, or socio-economic status. Our programs are designed to be inclusive and accommodate diverse learning needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-700">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Holistic Development</h3>
              <p className="text-gray-700">
                Education goes beyond textbooks and exams. We nurture creativity, emotional intelligence, physical wellbeing, and social skills to help children become well-rounded individuals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-orange-500">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Community Engagement</h3>
              <p className="text-gray-700">
                We believe in the power of communities to drive change. Our programs actively engage parents, local leaders, and community members to create sustainable educational ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-orange-700 mb-10 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <img 
                src={gautamImage}
                alt="Gautam Gauri" 
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-800">Gautam Gauri</h3>
              <p className="text-orange-600 mb-2">Executive Director</p>
              <div className="flex justify-center text-green-400 mt-2">
                <a href="#" className="hover:text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center">
              <img 
                src={mohitaImage}
                alt="Mohita Katriar" 
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-800">Mohita Katriar</h3>
              <p className="text-orange-600 mb-2">Head of Fundraising and Communication</p>
              <div className="flex justify-center text-green-400 mt-2">
                <a href="#" className="hover:text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center">
              <img 
                src={nehaImage}
                alt="Neha Anand" 
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-800">Neha Anand</h3>
              <p className="text-orange-600 mb-2">Program Manager</p>
              <div className="flex justify-center text-green-400 mt-2">
                <a href="#" className="hover:text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center">
              <img 
                src={nishaImage}
                alt="Nisha Kumari" 
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-800">Nisha Kumari</h3>
              <p className="text-orange-600 mb-2">Fundraising and Communication Coordinator</p>
              <div className="flex justify-center text-green-400 mt-2">
                <a href="#" className="hover:text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;