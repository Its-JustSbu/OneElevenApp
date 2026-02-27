import React, { useState } from 'react'
import './home.css'

export default function home() {
  const [formData, setFormData] = useState<any>({});
  const [response, setResponse] = useState('Awaiting response...');

  const handleChange = (e: any) => {
    const { name, value} = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); 

    console.log('Submitted:', formData);

    const req = await fetch(`https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${formData.url}&email=${formData.email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json', 
      },
    })
      
    const res = await req.json();

    if (req.status >= 200) {
      setResponse(res);
    }

    console.log(res);
  };
  
  return (
    <div className='container'>
      <h2>Submit Application</h2>

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="email">Email Address:</label>
          <input type="email" placeholder='Enter your email' id='email' name="email" onChange={handleChange}/>
        </div>
        <div className='input-container url'>
          <label htmlFor="url">API URL:</label>
          <input type="text" placeholder='Past your POST url here' id='url' name="url" onChange={handleChange}/>
        </div>
        <button type="submit">Apply</button>
      </form>

      <div className='response'>
        {response}
      </div>
    </div>
  )
}
