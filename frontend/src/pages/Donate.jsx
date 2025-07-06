// // import React, { useState } from 'react';
// // import { FaHandHoldingHeart, FaGraduationCap, FaBook, FaApple } from 'react-icons/fa';

// // const Donate = () => {
// //   const [donationAmount, setDonationAmount] = useState('');
// //   const [customAmount, setCustomAmount] = useState('');
// //   const [donationType, setDonationType] = useState('one-time');

// //   const handleAmountClick = (amount) => {
// //     setDonationAmount(amount);
// //     setCustomAmount('');
// //   };

// //   const handleCustomAmountChange = (e) => {
// //     setCustomAmount(e.target.value);
// //     setDonationAmount('custom');
// //   };

// //   return (
// //     <section className="bg-cream-100 min-h-screen">
// //       {/* Header */}
// //       <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
// //         <div className="max-w-6xl mx-auto px-6 text-center">
// //           <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cause</h1>
// //           <p className="text-xl max-w-3xl mx-auto">
// //             Your donation helps us provide quality education to children who need it most
// //           </p>
// //         </div>
// //       </div>

// //       {/* Main content */}
// //       <div className="max-w-6xl mx-auto px-6 py-16">
// //         <div className="grid md:grid-cols-2 gap-12">
// //           {/* Left side - Impact */}
// //           <div>
// //             <h2 className="text-3xl font-bold text-orange-700 mb-8">Your Impact</h2>
// //             <p className="text-lg text-gray-700 mb-8">
// //               Your generous contribution directly supports our educational programs and makes a lasting difference in children's lives. Here's how your donation helps:
// //             </p>

// //             <div className="space-y-6">
// //               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
// //                 <div className="bg-orange-100 p-3 rounded-full mr-4">
// //                   <FaBook className="text-orange-600 text-xl" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-bold text-lg text-blue-800">Learning Materials</h3>
// //                   <p className="text-gray-700">
// //                     ₹1000 provides books, stationery, and learning materials for one child for an entire school year.
// //                   </p>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
// //                 <div className="bg-orange-100 p-3 rounded-full mr-4">
// //                   <FaGraduationCap className="text-orange-600 text-xl" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-bold text-lg text-blue-800">Teacher Training</h3>
// //                   <p className="text-gray-700">
// //                     ₹5000 funds professional development for one teacher, improving education for dozens of children.
// //                   </p>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
// //                 <div className="bg-orange-100 p-3 rounded-full mr-4">
// //                   <FaApple className="text-orange-600 text-xl" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-bold text-lg text-blue-800">Nutritional Support</h3>
// //                   <p className="text-gray-700">
// //                     ₹2500 provides nutritious meals for a classroom for one month, ensuring children can focus on learning.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-10 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
// //               <h3 className="font-bold text-lg text-blue-800 mb-2">Our Commitment</h3>
// //               <p className="text-gray-700">
// //                 We ensure that at least 85% of all donations go directly to our educational programs. Financial transparency is one of our core values, and we publish annual reports detailing how funds are used.
// //               </p>
// //             </div>
// //           </div>
          
// //           {/* Right side - Donation form */}
// //           <div className="bg-white p-8 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
// //               <FaHandHoldingHeart className="mr-2 text-orange-600" /> Make a Donation
// //             </h2>
            
// //             <form>
// //               {/* Donation type */}
// //               <div className="mb-6">
// //                 <label className="block text-gray-700 font-medium mb-2">Donation Type</label>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <button 
// //                     type="button"
// //                     className={`py-3 px-4 rounded-lg border ${donationType === 'one-time' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
// //                     onClick={() => setDonationType('one-time')}
// //                   >
// //                     One-time
// //                   </button>
// //                   <button 
// //                     type="button"
// //                     className={`py-3 px-4 rounded-lg border ${donationType === 'monthly' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
// //                     onClick={() => setDonationType('monthly')}
// //                   >
// //                     Monthly
// //                   </button>
// //                 </div>
// //               </div>
              
// //               {/* Amount */}
// //               <div className="mb-6">
// //                 <label className="block text-gray-700 font-medium mb-2">Donation Amount</label>
// //                 <div className="grid grid-cols-3 gap-2 mb-2">
// //                   {[500, 1000, 2500, 5000, 10000, 'custom'].map(amount => (
// //                     <button 
// //                       key={amount}
// //                       type="button"
// //                       className={`py-3 px-4 rounded-lg border ${donationAmount === amount ? 'bg-blue-100 border-blue-700 text-blue-800' : 'bg-white text-gray-700'}`}
// //                       onClick={() => handleAmountClick(amount)}
// //                     >
// //                       {amount === 'custom' ? 'Custom' : `₹${amount}`}
// //                     </button>
// //                   ))}
// //                 </div>
// //                 {donationAmount === 'custom' && (
// //                   <div className="mt-3">
// //                     <label htmlFor="customAmount" className="sr-only">Custom amount</label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         <span className="text-gray-500 sm:text-sm">₹</span>
// //                       </div>
// //                       <input
// //                         type="number"
// //                         id="customAmount"
// //                         className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         placeholder="Enter amount"
// //                         value={customAmount}
// //                         onChange={handleCustomAmountChange}
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
              
// //               {/* Personal Info */}
// //               <div className="space-y-4 mb-6">
// //                 <div>
// //                   <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
// //                   <input 
// //                     type="text" 
// //                     id="name" 
// //                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                     placeholder="Your name"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
// //                   <input 
// //                     type="email" 
// //                     id="email" 
// //                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                     placeholder="Your email"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
// //                   <input 
// //                     type="tel" 
// //                     id="phone" 
// //                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                     placeholder="Your phone number"
// //                   />
// //                 </div>
// //               </div>
              
// //               {/* Submit */}
// //               <button 
// //                 type="submit" 
// //                 className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
// //               >
// //                 <FaHandHoldingHeart className="mr-2" /> Donate Now
// //               </button>
              
// //               <p className="text-sm text-gray-600 mt-4 text-center">
// //                 Your donation is tax-deductible. You will receive a receipt via email.
// //               </p>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Donate;


// import React, { useState, useEffect } from 'react';
// import { FaHandHoldingHeart, FaGraduationCap, FaBook, FaApple, FaCheck, FaLock } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Donate = () => {
//   const [donationAmount, setDonationAmount] = useState('');
//   const [customAmount, setCustomAmount] = useState('');
//   const [donationType, setDonationType] = useState('one-time');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [paymentStep, setPaymentStep] = useState(1); // 1: Details, 2: Payment

//   // Handle form field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleAmountClick = (amount) => {
//     setDonationAmount(amount);
//     setCustomAmount('');
//   };

//   const handleCustomAmountChange = (e) => {
//     setCustomAmount(e.target.value);
//     setDonationAmount('custom');
//   };

//   // Get actual donation amount for processing
//   const getActualAmount = () => {
//     if (donationAmount === 'custom') {
//       return parseInt(customAmount);
//     }
//     return donationAmount;
//   };

//   // Form validation
//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       toast.error("Please enter your name");
//       return false;
//     }
//     if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       return false;
//     }
//     if (!donationAmount) {
//       toast.error("Please select a donation amount");
//       return false;
//     }
//     if (donationAmount === 'custom' && (!customAmount || customAmount <= 0)) {
//       toast.error("Please enter a valid donation amount");
//       return false;
//     }
//     return true;
//   };

//   // Continue to payment
//   const continueToPayment = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setPaymentStep(2);
//     }
//   };

//   // Load Razorpay script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   // Handle payment
//   const handlePayment = async (e) => {
//     e.preventDefault();
    
//     setIsProcessing(true);
    
//     const res = await loadRazorpayScript();
    
//     if (!res) {
//       toast.error("Razorpay SDK failed to load. Check your connection");
//       setIsProcessing(false);
//       return;
//     }

//     // In production, you would make an API call to your server to create an order
//     // This is a mock implementation
//     const actualAmount = getActualAmount();
    
//     const options = {
//       key: "rzp_test_YOUR_KEY_HERE", // Replace with your actual key in production
//       amount: actualAmount * 100, // Razorpay accepts amount in paise
//       currency: "INR",
//       name: "Diksha Foundation",
//       description: `${donationType} donation`,
//       image: "/logo.png",
//       handler: function (response) {
//         // This function runs when payment is successful
//         // In production, verify the payment signature on your server
//         setIsProcessing(false);
//         setPaymentSuccess(true);
//         toast.success("Thank you for your generous donation!");
//       },
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone
//       },
//       notes: {
//         donationType: donationType
//       },
//       theme: {
//         color: "#2563eb" // Blue-800
//       },
//       modal: {
//         ondismiss: function() {
//           setIsProcessing(false);
//         }
//       }
//     };
    
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const resetForm = () => {
//     setPaymentSuccess(false);
//     setPaymentStep(1);
//     setFormData({
//       name: '',
//       email: '',
//       phone: ''
//     });
//     setDonationAmount('');
//     setCustomAmount('');
//   };

//   return (
//     <section className="bg-cream-100 min-h-screen">
//       <ToastContainer position="top-right" autoClose={5000} />
      
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cause</h1>
//           <p className="text-xl max-w-3xl mx-auto">
//             Your donation helps us provide quality education to children who need it most
//           </p>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Left side - Impact */}
//           <div>
//             <h2 className="text-3xl font-bold text-orange-700 mb-8">Your Impact</h2>
//             <p className="text-lg text-gray-700 mb-8">
//               Your generous contribution directly supports our educational programs and makes a lasting difference in children's lives. Here's how your donation helps:
//             </p>

//             <div className="space-y-6">
//               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
//                 <div className="bg-orange-100 p-3 rounded-full mr-4">
//                   <FaBook className="text-orange-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-blue-800">Learning Materials</h3>
//                   <p className="text-gray-700">
//                     ₹1000 provides books, stationery, and learning materials for one child for an entire school year.
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
//                 <div className="bg-orange-100 p-3 rounded-full mr-4">
//                   <FaGraduationCap className="text-orange-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-blue-800">Teacher Training</h3>
//                   <p className="text-gray-700">
//                     ₹5000 funds professional development for one teacher, improving education for dozens of children.
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
//                 <div className="bg-orange-100 p-3 rounded-full mr-4">
//                   <FaApple className="text-orange-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-blue-800">Nutritional Support</h3>
//                   <p className="text-gray-700">
//                     ₹2500 provides nutritious meals for a classroom for one month, ensuring children can focus on learning.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-10 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
//               <h3 className="font-bold text-lg text-blue-800 mb-2">Our Commitment</h3>
//               <p className="text-gray-700">
//                 We ensure that at least 85% of all donations go directly to our educational programs. Financial transparency is one of our core values, and we publish annual reports detailing how funds are used.
//               </p>
//             </div>
//           </div>
          
//           {/* Right side - Donation form */}
//           <div className="bg-white p-8 rounded-xl shadow-lg">
//             {paymentSuccess ? (
//               <div className="text-center py-8">
//                 <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
//                   <FaCheck className="text-green-600 text-3xl" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-blue-800 mb-4">Thank You!</h2>
//                 <p className="text-lg text-gray-700 mb-6">
//                   Your donation of ₹{getActualAmount()} has been processed successfully. A receipt has been sent to your email address.
//                 </p>
//                 <p className="text-gray-700 mb-8">
//                   Your generous support will help us make a real difference in the lives of children in need.
//                 </p>
//                 <button 
//                   onClick={resetForm} 
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
//                 >
//                   Make Another Donation
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
//                   <FaHandHoldingHeart className="mr-2 text-orange-600" /> Make a Donation
//                 </h2>
                
//                 {/* Step indicator */}
//                 <div className="flex mb-8">
//                   <div className={`flex-1 text-center ${paymentStep === 1 ? 'text-blue-800 font-medium' : 'text-gray-400'}`}>
//                     <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${paymentStep === 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
//                       1
//                     </div>
//                     <span>Details</span>
//                   </div>
//                   <div className={`flex-1 text-center ${paymentStep === 2 ? 'text-blue-800 font-medium' : 'text-gray-400'}`}>
//                     <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${paymentStep === 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
//                       2
//                     </div>
//                     <span>Payment</span>
//                   </div>
//                 </div>
                
//                 <form onSubmit={paymentStep === 1 ? continueToPayment : handlePayment}>
//                   {paymentStep === 1 && (
//                     <>
//                       {/* Donation type */}
//                       <div className="mb-6">
//                         <label className="block text-gray-700 font-medium mb-2">Donation Type</label>
//                         <div className="grid grid-cols-2 gap-4">
//                           <button 
//                             type="button"
//                             className={`py-3 px-4 rounded-lg border ${donationType === 'one-time' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
//                             onClick={() => setDonationType('one-time')}
//                           >
//                             One-time
//                           </button>
//                           <button 
//                             type="button"
//                             className={`py-3 px-4 rounded-lg border ${donationType === 'monthly' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
//                             onClick={() => setDonationType('monthly')}
//                           >
//                             Monthly
//                           </button>
//                         </div>
//                       </div>
                      
//                       {/* Amount */}
//                       <div className="mb-6">
//                         <label className="block text-gray-700 font-medium mb-2">Donation Amount</label>
//                         <div className="grid grid-cols-3 gap-2 mb-2">
//                           {[500, 1000, 2500, 5000, 10000, 'custom'].map(amount => (
//                             <button 
//                               key={amount}
//                               type="button"
//                               className={`py-3 px-4 rounded-lg border ${donationAmount === amount ? 'bg-blue-100 border-blue-700 text-blue-800' : 'bg-white text-gray-700'}`}
//                               onClick={() => handleAmountClick(amount)}
//                             >
//                               {amount === 'custom' ? 'Custom' : `₹${amount}`}
//                             </button>
//                           ))}
//                         </div>
//                         {donationAmount === 'custom' && (
//                           <div className="mt-3">
//                             <label htmlFor="customAmount" className="sr-only">Custom amount</label>
//                             <div className="relative">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <span className="text-gray-500 sm:text-sm">₹</span>
//                               </div>
//                               <input
//                                 type="number"
//                                 id="customAmount"
//                                 className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                                 placeholder="Enter amount"
//                                 value={customAmount}
//                                 onChange={handleCustomAmountChange}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Personal Info */}
//                       <div className="space-y-4 mb-6">
//                         <div>
//                           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
//                           <input 
//                             type="text" 
//                             id="name" 
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             placeholder="Your name"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//                           <input 
//                             type="email" 
//                             id="email" 
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             placeholder="Your email"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
//                           <input 
//                             type="tel" 
//                             id="phone" 
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             placeholder="Your phone number"
//                           />
//                         </div>
//                       </div>
                      
//                       {/* Submit */}
//                       <button 
//                         type="submit" 
//                         className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
//                       >
//                         Continue to Payment
//                       </button>
//                     </>
//                   )}

//                   {paymentStep === 2 && (
//                     <>
//                       {/* Payment Summary */}
//                       <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                         <h3 className="text-lg font-bold text-gray-800 mb-4">Donation Summary</h3>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-gray-600">Donation Type:</span>
//                           <span className="font-medium">{donationType === 'one-time' ? 'One-time' : 'Monthly'}</span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-gray-600">Amount:</span>
//                           <span className="font-medium">₹{getActualAmount()}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Donor:</span>
//                           <span className="font-medium">{formData.name}</span>
//                         </div>
//                       </div>

//                       {/* Payment Method */}
//                       <div className="mb-6">
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <FaLock className="mr-1" /> Secure Payment
//                           </div>
//                         </div>
//                         <div className="bg-gray-50 p-4 rounded-lg text-center">
//                           <p className="text-gray-700 mb-4">
//                             Click the button below to complete your donation using our secure payment gateway.
//                           </p>
//                           <div className="flex justify-center space-x-2 mb-4">
//                             <img src="https://cdn.razorpay.com/static/assets/credit-card-logo/visa.svg" alt="Visa" className="h-6" />
//                             <img src="https://cdn.razorpay.com/static/assets/credit-card-logo/mastercard.svg" alt="Mastercard" className="h-6" />
//                             <img src="https://cdn.razorpay.com/static/assets/method/upi.svg" alt="UPI" className="h-6" />
//                             <img src="https://cdn.razorpay.com/static/assets/method/netbanking.svg" alt="Net Banking" className="h-6" />
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Buttons */}
//                       <div className="flex gap-4">
//                         <button 
//                           type="button"
//                           onClick={() => setPaymentStep(1)}
//                           className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
//                         >
//                           Back
//                         </button>
//                         <button 
//                           type="submit"
//                           disabled={isProcessing}
//                           className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
//                         >
//                           {isProcessing ? (
//                             <>
//                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               Processing...
//                             </>
//                           ) : (
//                             <>Pay Securely</>
//                           )}
//                         </button>
//                       </div>
//                     </>
//                   )}
                  
//                   <p className="text-sm text-gray-600 mt-4 text-center">
//                     Your donation is tax-deductible. You will receive a receipt via email.
//                   </p>
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Donate;

import React, { useState, useEffect } from 'react';
import { FaHandHoldingHeart, FaGraduationCap, FaBook, FaApple, FaCheck, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Details, 2: Payment
  const [receiptData, setReceiptData] = useState(null);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmountClick = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount('custom');
  };

  // Get actual donation amount for processing
  const getActualAmount = () => {
    if (donationAmount === 'custom') {
      return parseInt(customAmount);
    }
    return donationAmount;
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!donationAmount) {
      toast.error("Please select a donation amount");
      return false;
    }
    if (donationAmount === 'custom' && (!customAmount || customAmount <= 0)) {
      toast.error("Please enter a valid donation amount");
      return false;
    }
    return true;
  };

  // Continue to payment
  const continueToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPaymentStep(2);
    }
  };

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Check your connection");
      setIsProcessing(false);
      return;
    }

    try {
      // Create order on backend
      const response = await axios.post(`${API_URL}/payments/create-order`, {
        amount: getActualAmount(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        donationType: donationType
      });
      
      const { order, key } = response.data;
      
      // Configure Razorpay options
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Diksha Foundation",
        description: `${donationType === 'one-time' ? 'One-time' : 'Monthly'} donation`,
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(`${API_URL}/payments/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });
            
            // If verification successful, show success message
            if (verifyResponse.data.success) {
              setReceiptData(verifyResponse.data.donation);
              setPaymentSuccess(true);
              toast.success("Thank you for your generous donation!");
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Error verifying payment. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          donationType: donationType
        },
        theme: {
          color: "#2563eb" // Blue-800
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.info("Payment cancelled. You can try again when ready.");
          }
        }
      };
      
      // Open Razorpay payment form
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setPaymentSuccess(false);
    setPaymentStep(1);
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
    setDonationAmount('');
    setCustomAmount('');
    setReceiptData(null);
  };

  return (
    <section className="bg-cream-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cause</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your donation helps us provide quality education to children who need it most
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Impact */}
          <div>
            <h2 className="text-3xl font-bold text-orange-700 mb-8">Your Impact</h2>
            <p className="text-lg text-gray-700 mb-8">
              Your generous contribution directly supports our educational programs and makes a lasting difference in children's lives. Here's how your donation helps:
            </p>

            <div className="space-y-6">
              <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaBook className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-800">Learning Materials</h3>
                  <p className="text-gray-700">
                    ₹1000 provides books, stationery, and learning materials for one child for an entire school year.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaGraduationCap className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-800">Teacher Training</h3>
                  <p className="text-gray-700">
                    ₹5000 funds professional development for one teacher, improving education for dozens of children.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaApple className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-800">Nutritional Support</h3>
                  <p className="text-gray-700">
                    ₹2500 provides nutritious meals for a classroom for one month, ensuring children can focus on learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Our Commitment</h3>
              <p className="text-gray-700">
                We ensure that at least 85% of all donations go directly to our educational programs. Financial transparency is one of our core values, and we publish annual reports detailing how funds are used.
              </p>
            </div>
          </div>
          
          {/* Right side - Donation form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <FaCheck className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Thank You!</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Your donation of ₹{receiptData ? receiptData.amount : getActualAmount()} has been processed successfully.
                </p>
                <p className="text-gray-700 mb-8">
                  Your generous support will help us make a real difference in the lives of children in need.
                </p>
                <button 
                  onClick={resetForm} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Make Another Donation
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                  <FaHandHoldingHeart className="mr-2 text-orange-600" /> Make a Donation
                </h2>
                
                {/* Step indicator */}
                <div className="flex mb-8">
                  <div className={`flex-1 text-center ${paymentStep === 1 ? 'text-blue-800 font-medium' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${paymentStep === 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
                      1
                    </div>
                    <span>Details</span>
                  </div>
                  <div className={`flex-1 text-center ${paymentStep === 2 ? 'text-blue-800 font-medium' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${paymentStep === 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
                      2
                    </div>
                    <span>Payment</span>
                  </div>
                </div>
                
                <form onSubmit={paymentStep === 1 ? continueToPayment : handlePayment}>
                  {paymentStep === 1 && (
                    <>
                      {/* Donation type */}
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Donation Type</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button 
                            type="button"
                            className={`py-3 px-4 rounded-lg border ${donationType === 'one-time' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
                            onClick={() => setDonationType('one-time')}
                          >
                            One-time
                          </button>
                          <button 
                            type="button"
                            className={`py-3 px-4 rounded-lg border ${donationType === 'monthly' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700'}`}
                            onClick={() => setDonationType('monthly')}
                          >
                            Monthly
                          </button>
                        </div>
                      </div>
                      
                      {/* Amount */}
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Donation Amount</label>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          {[500, 1000, 2500, 5000, 10000, 'custom'].map(amount => (
                            <button 
                              key={amount}
                              type="button"
                              className={`py-3 px-4 rounded-lg border ${donationAmount === amount ? 'bg-blue-100 border-blue-700 text-blue-800' : 'bg-white text-gray-700'}`}
                              onClick={() => handleAmountClick(amount)}
                            >
                              {amount === 'custom' ? 'Custom' : `₹${amount}`}
                            </button>
                          ))}
                        </div>
                        {donationAmount === 'custom' && (
                          <div className="mt-3">
                            <label htmlFor="customAmount" className="sr-only">Custom amount</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">₹</span>
                              </div>
                              <input
                                type="number"
                                id="customAmount"
                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Enter amount"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Personal Info */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Your email"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      
                      {/* Submit */}
                      <button 
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                      >
                        Continue to Payment
                      </button>
                    </>
                  )}

                  {paymentStep === 2 && (
                    <>
                      {/* Payment Summary */}
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Donation Summary</h3>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Donation Type:</span>
                          <span className="font-medium">{donationType === 'one-time' ? 'One-time' : 'Monthly'}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">₹{getActualAmount()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Donor:</span>
                          <span className="font-medium">{formData.name}</span>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <FaLock className="mr-1" /> Secure Payment
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-gray-700 mb-4">
                            Click the button below to complete your donation using our secure payment gateway.
                          </p>
                          {/* <div className="flex justify-center space-x-2 mb-4">
                            <img src="/images/payment-methods/visa.png" alt="Visa" className="h-6" />
                            <img src="/images/payment-methods/mastercard.png" alt="Mastercard" className="h-6" />
                            <img src="/images/payment-methods/upi.png" alt="UPI" className="h-6" />
                            <img src="/images/payment-methods/netbanking.png" alt="Net Banking" className="h-6" />
                          </div> */}
                        </div>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setPaymentStep(1)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>Pay Securely</>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                  
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Your donation is tax-deductible. You will receive a receipt via email.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;