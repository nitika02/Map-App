import React, { useRef } from 'react'
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import useGeoLocation from './useGeoLocation';


const MapComponent = ({center, zoom}) => {
    console.log(center, zoom)
    //const [center, setCenter] = useState({lat: 20.5937, lng: 78.9629})
    const ZOOM_LEVEL = zoom
    const mapRef = useRef()

    const location = useGeoLocation()

    const markerIcon = new L.Icon({
        iconUrl : require("./marker.png"),
        iconSize: [35, 45],
        iconAnchor: [17, 45],
        popupAnchor: [3, -46]
    })
    // const showMyLocation = () => {
    //     if(location.loaded && !location.error) {
    //         const { current = {} } = mapRef;
    //         const { leafletElement: map } = current;

    //         map.flyTo([location.coordinates.lat, location.coordinates.lng], 14, {
    //         duration: 2
    //         });
    //     } else {
    //         alert(location.error.message)
    //     }
    // }
    

  return (
    <div style={{marginLeft: "100px"}}>
        <h2>React-leaflet - Basic Openstreet Maps</h2>
        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=fzGxzdYb01jOzQ2Adi3w"
            />
            {location.loaded && !location.error && (
                <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={markerIcon}>
                <Popup>
                    Current Location <br /> Easily customizable.
                </Popup>
                </Marker>
            )}
            
            
        </MapContainer>
    </div>
  )
}

export default MapComponent