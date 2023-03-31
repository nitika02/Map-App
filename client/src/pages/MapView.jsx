import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../components/loader.gif"

export function MapViewWrapper() {
    const { id } = useParams();
    return <MapView id={id} />;
  }

const MapView = ({id}) => {
  const [card, setCard] = useState(null);
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the card data for the selected card ID from the server
    
    axios.get(`https://fierce-rose-sea-lion.cyclic.app/api/map/${id}`)
      .then(response => {
        setCard(response.data);
        //console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(card)
    } else {
      navigate("/")
    }
  }, [])

  const goBack = () => {
    navigate("/dashboard")
  }
  

  return (
    <div className="map-view">
      {card ? (
        <>
          <button className='button-86' onClick={goBack}>Go back</button>
          <MapComponent center={card.center} zoom={card.zoom} />
        </>
      ) : (
        <img src={Loader} alt="" />
      )}
    </div>
  );
};

export default MapView;