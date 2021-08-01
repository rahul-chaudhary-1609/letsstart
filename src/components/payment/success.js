import React from "react";
import {useHistory,useLocation,useParams,useRouteMatch} from "react-router-dom"

export default function PaymentSuccess() {
    let history = useHistory();
    let location = useLocation();
    let params = useParams();
    let routeMatch = useRouteMatch()
    
    console.log("history: ",history)
    console.log("location: ",location)
    console.log("params: ",params)
    console.log("routeMatch: ",routeMatch)
    return (
        <>
            <h1>Payment Successful!! { params.paymentId}</h1>
            <button onClick={() => {
                history.push("/")
            }}>Back to Home</button>
        </>
    )
}