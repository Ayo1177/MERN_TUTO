import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar.jsx'
import RatelimitedUI from '../components/RatelimitedUI.jsx';
import axios from 'axios';

const HomePage = () => {
  const [isratelimited, setIsratelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes');
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);



  return (
    <div className="min-h-screen">
      <Navbar />
    {isratelimited && <RatelimitedUI />}
    </div>
  )
}

export default HomePage
