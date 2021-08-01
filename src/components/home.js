import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <>
            <h1>Welcome to BlueXinga</h1>
            <span style={{marginLeft:"10px", backgroundColor:"#03a5fc", padding:"5px 15px 5px 15px", borderRadius:"5px", }}><Link style={{textDecoration:"none",color:"white"}} to="/payment" >Pay</Link></span>
        </>
    )
}