import logo from './logo.svg';
import './App.css';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api"; 
import { useMemo, useState, useEffect } from "react";
import mapStyles from './mapStyles';

function App() {
    const {} = useLoadScript({
        googleMapsApiKey: 'AIzaSyA4gA_H6k51PlShhrptJdEANfcLumWewlo',
    });

    const google = window.google;

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    }

    const loadDataOnlyOnce = () => {
        //console.log(href)
    }
        
    const [hasAdditionalPath, setHasAdditionalPath] = useState(false);

    // This function will called only once
    useEffect(() => {
        const pathname = window.location.pathname;
        const pathComponents = pathname.split('/');
        console.log(pathComponents, pathComponents.length)
        if (pathComponents.length >= 2 || pathComponents.indexOf('additional') !== -1) {
            setHasAdditionalPath(true);
            console.log("yes")
        } else {
            console.log("no")
        }
        console.log(hasAdditionalPath)
        loadDataOnlyOnce();
    }, [])

    const [markers, setMarkers] = useState([{id: 1, lat: 39.8097343, lng: -98.5556199}, {id: 2, lat: 49.8097343, lng: -88.5556199}, {id: 3, lat: 38.8097343, lng: -88.5556199} ]);
    const [selected, setSelected] = useState(null);
    const center = useMemo(() => ({ lat: 39.8097343, lng: -98.5556199 }), []);

    console.log(markers)
    return (
        <div className="App">
            <h1 className='title'>
                The Amazing Airport Visualizer
            </h1>
            <GoogleMap options={options} zoom={5} center={center} mapContainerClassName="map-container">
                {markers.map((marker) => (
                    <MarkerF
                        key={marker.id}
                        animation={2}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                Alert
                            </h2>
                            <h3>
                                {selected.lat}, {selected.lng}
                            </h3>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>  
        </div>
    );
}

export default App;
