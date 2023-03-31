import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideNavBar from '../components/sidenavbar/SideNavBar'
import axios from "axios"
import Card from '../components/CardComponent'


const Dashboard = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const [cards, setCards] = useState([]);

  const showDashboard = async () => {
    const req = await fetch("https://fierce-rose-sea-lion.cyclic.app/api/dashboard", {
      headers : {
        "x-access-token" : localStorage.getItem("token")
      }
    })
    const data = req.json()
    console.log(data)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/")
    }
  }, [])
  useEffect(() => {
    // Fetch the cards data from the server
    axios.get('https://fierce-rose-sea-lion.cyclic.app/api/dashboard')
      .then(response => {
        console.log(response.data)
        setCards(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    setToken("")
    localStorage.removeItem("token")
    navigate("/")
  }


  const handleCardClick = (id) => {
    navigate(`/map/${id}`)
  };

  return (
    <div style={{display: "flex"}}>
      <SideNavBar handleLogout={handleLogout} />
      <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1>Dashboard</h1>
        <div className='card-container'>
          {cards.map(card => (
            <div>
              <Card key={card.id} id={card.id} title={card.title} onClick={() => handleCardClick(card.id)} />
            </div>
        ))}
        </div>
      </div>  
    </div>
  )
}

export default Dashboard