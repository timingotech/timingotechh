import React from 'react'
import { useState,useEffect } from 'react';

const Support = () => {
  
  const [amount, setAmount] = useState(0);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      setPaystackLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    if (window.Paystack && paystackLoaded) {
      const paymentHandler = window.PaystackPop.setup({
        key: 'pk_test_a7190862b89d8656b52a586c50ee3d5e89488fdf', // Replace with your Paystack public key
        email: 'timingotech@gmail.com', // Replace with the user's email
        amount: amount * 100, // Paystack takes amount in kobo (multiply by 100)
        currency: 'NGN', // Change to your preferred currency code
        ref: `${Math.floor(Math.random() * 1000000000)}`, // Replace with a unique reference
        onClose: () => {
          console.log('Payment closed');
        },
        callback: (response) => {
          console.log('Payment complete. Response:', response);
          // Handle successful payment response
        },
      });
      paymentHandler.openIframe();
    } else {
      console.error('Paystack has not loaded yet.');
    }
  };

  return (
    <div className='bg-[#F7F7FA]'>
       <div className="container p-8 mx-auto">
      {/* ... */}
      <div className="mb-8 ">
        <h2 className="mb-4 text-2xl font-bold text-center hometext-gradient">Make a Donation and Suppport Our Community</h2>
        <p className="mb-4 text-lg text-center">Enter your donation amount:</p>
        <div className='md:ml-96'>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="px-4 py-2 mb-4 border border-gray-300 rounded "
        />
        <button
          onClick={initializePayment}
          className="px-4 py-2 font-bold text-white support-gradient focus:outline-none focus:shadow-outline"
        >
          Donate via Paystack
        </button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Support