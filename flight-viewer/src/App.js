import './App.css';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api"; 
import { useMemo, useState, useEffect } from "react";
import mapStyles from './mapStyles';
import { v4 as uuid } from 'uuid';

function App() {
    const { isLoaded, loadError  } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA4gA_H6k51PlShhrptJdEANfcLumWewlo',
    });

    const google = window.google;
    const [mapRef, setMapRef] = useState(null);
    const [hasAdditionalPath, setHasAdditionalPath] = useState(false);
    const [CSVPrompt, setCSVPrompt] = useState(false);
    const [file, setFile] = useState(null);
    const [markers, setMarkers] = useState([{id: 1, lat: 39.8097343, lng: -98.5556199}, {id: 2, lat: 49.8097343, lng: -88.5556199}, {id: 3, lat: 38.8097343, lng: -88.5556199} ]);
    const [selected, setSelected] = useState(null);
    const center = useMemo(() => ({ lat: 39.8097343, lng: -98.5556199 }), []);
    const [sharableURL, setsharableURL] = useState(0);
 

    console.log(markers)

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    }

    const loadMarkers = (id) => {
        setsharableURL(id);
        console.log(id);
        //console.log(href)
    }

    // This function will called only once
    useEffect(() => {
        const pathname = window.location.pathname;
        const pathComponents = pathname.split('/');
        console.log(pathComponents, pathComponents.length)
        if ( (pathComponents.length >= 2 || pathComponents.indexOf('additional') !== -1) && pathComponents[1].trim() != "") {
            setHasAdditionalPath(true);
            console.log('here loading markers')
            loadMarkers(pathComponents[1]);
        } else {
            console.log("here setting csv prompt to true")
            setCSVPrompt(true);
        }
        //console.log(hasAdditionalPath)
    }, [])

    const loadHandler = map => {
        // Store a reference to the google map instance in state
        setMapRef(map);
        // Fit map bounds to contain all markers
        //fitBounds(map);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const unique_id = uuid();
        const small_id = unique_id.slice(0,8)
        setsharableURL(small_id);
        console.log("file attached lets gooooo")
    }
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText("http://localhost:3000/" + sharableURL);
    }
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="App">
            <h1 className='title'>
                The Amazing Airport Visualizer
            </h1>
            <GoogleMap options={options} zoom={5} center={center} mapContainerClassName="map-container" onLoad={loadHandler}>
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
            {CSVPrompt ? ( 
                <div className='csv-prompt'>
                    <h1 className='csv-prompt-title2'>Share your favorite airports!</h1>
                    <h3 className='csv-prompt-title2'>Upload a CSV document with your favorite airports. We’ll put them on a map, and provide a shareable url.</h3>
                    <div className="file-container">
                        <input type='file' name='file' id='file' className="btn-file" accept={".csv"} onChange={(event) => handleFileChange(event)} />
                        <span className="csv-prompt-title3">Drag and drop a CSV file, or select one from your computer.</span>
                    </div>
                    {sharableURL != 0 &&
                        <div className='shareable-div'>
                            <span className="csv-prompt-title3">You can view this map <a href={"http://localhost:3000/" + sharableURL}>here</a> </span>
                        </div>
                    }
                </div>
            ) : null}
            {!CSVPrompt &&
                <div className='shareable-div-bottom'>
                    <span className="csv-prompt-title3">Nice airports! Your shareable url is: </span>
                    <input className='copy-text' type="text" value={"http://localhost:3000/" + sharableURL} readOnly />
                    <button onClick={handleCopyClick}>Copy</button>
                </div>
            }

        </div>
    );
}

export default App;
