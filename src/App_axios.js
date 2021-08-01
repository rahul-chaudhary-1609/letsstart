import React, { useState, useEffect } from 'react';
const axios = require('axios').default;






function App() {
 
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log("Handled")
        //let formData = new FormData();

        // formData.append("name", e.target.name.value)
        // formData.append("email", e.target.email.value)
        // formData.append("country_code", e.target.country_code.value)
        // formData.append("phone_no", e.target.phone_no.value)
        
        let formData = {
            name:e.target.name.value,
            email:e.target.email.value,
            country_code:e.target.country_code.value,
            phone_no:e.target.phone_no.value,
        }

        let url = "http://54.158.24.113/changinghabits/api/v1/admin/addUser";
        
        let config = {
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIG1hbmp1IiwiZW1haWwiOiJxdWFob3VwaWdyb21hLTk0NDBAeW9wbWFpbC5jb20iLCJyb2xlIjoyLCJpYXQiOjE2MjQ1OTQ5NjAsImV4cCI6MTYyNDYzODE2MH0.NW2Ona9kHHYXLsy5xbacSAxMvOTfjY2f2RuAkUCCmEM",
                "Content-Type":"application/json",
            }
        }

        axios.post(url, JSON.stringify(formData), config).then((data) => {
            console.log(data);
        })
        
    }
  return (
    <>
          <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" /><br/>
              <input type="text" name="email" /><br/>
              <input type="text" name="country_code" /><br/>
              <input type="text" name="phone_no" /><br/>
              <input type="submit" value="Go"/>
      </form>
    </>
  )
}


export default App;
