import React, {useState,useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';

const HOST = "http://3.228.159.69";
const DEV_HOST = "http://localhost:5000";
async function fetchDataFromServer(params) {
  let response = await fetch(`${DEV_HOST}${params.url}`, params.fetchObj);
  let dataFromServer = await response.json();

  return dataFromServer;
}


function App() {
  let [stripePublishableKey, setStripePublishableKey] = useState("");
  let [stripeClientSecret, setStripeClientSecret] = useState("");
  let [stripePaymentMethodId, setStripePaymentMethodId] = useState("");
  let [driverPaymentId, setDriverPaymentId] = useState("");
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWQiOjEsImVtYWlsIjoicmFodWxjaGF1ZGhhcnk5OXJAZ21haWwuY29tIiwiaWF0IjoxNjIzNzMxMzcyLCJleHAiOjE2MjM4MTc3NzJ9.TQ_kTQlRjKdQqnrOD9GlHRadQ7XeNEvzeappB3mVmXY";

  useEffect(async() => {
    let params = {
      url:"/admin/paymentDriver",
      fetchObj:{
          method: "POST",
          headers: {
            "Authorization": token,
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            payment_id: "PID-20210614T145942042-5",
            card_number: "4591150347987836",
            card_exp_month: "10",
            card_exp_year: "2023",
            card_cvc: "630",
            amount: "10"
          })
      },
    }

    let dataFromServer = await fetchDataFromServer(params);

    setStripePublishableKey(dataFromServer.paymentResponse.stripePublishableKey)
    setStripeClientSecret(dataFromServer.paymentResponse.stripePaymentIntent.client_secret)
    setStripePaymentMethodId(dataFromServer.paymentResponse.stripePaymentMethod.id)
    setDriverPaymentId(dataFromServer.paymentResponse.paymentId)

  },[])

  
  let payHandler = async() => {
    console.log("Pay")
    let stripe = await loadStripe(stripePublishableKey);

    stripe.confirmCardPayment(stripeClientSecret, {
      payment_method: stripePaymentMethodId
      }).then(async function(result) {
        if (result.error) {
          // Show error to your customer
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            // The payment is complete!
            console.log("Success");
            let params = {
              url:"/admin/driverPaymentSuccess",
              fetchObj:{
                  method: "POST",
                  headers: {
                    "Authorization": token,
                    "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                    payment_id: driverPaymentId,
                    payment_intent:result.paymentIntent,
                  })
              },
            }

            let dataFromServer = await fetchDataFromServer(params);

            console.log("dataFromServer", dataFromServer);
          }
        }
      });
  }
 
  return (
    <>
      <button onClick={payHandler}>Pay</button>
    </>
  )
}


export default App;
