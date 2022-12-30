import './App.css';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api"; 
import { useMemo, useState, useEffect } from "react";
import mapStyles from './mapStyles';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import dot from './Dot.png'; 


const API_URL = 'http://localhost:3000/api/v1/maps';


function App() {
    const { isLoaded, loadError  } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA4gA_H6k51PlShhrptJdEANfcLumWewlo',
    });

    const google = window.google;
    const [mapRef, setMapRef] = useState(null);
    const [hasAdditionalPath, setHasAdditionalPath] = useState(false);
    const [CSVPrompt, setCSVPrompt] = useState(false);
    const [file, setFile] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
    const [sharableURL, setsharableURL] = useState(0);
 
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    }

    const loadMarkers = (id) => {
        getAPIData(id).then((items) => {
            console.log(items[0].airports);
            setsharableURL(id); 
            setMarkers(items[0].airports);
            //if(mounted) {
              //setPokemon(items.data);
              //setPageCount(items.pagy.pages);
            //}
        });
        //console.log(href)
    }

    // This function will called only once
    useEffect(() => {
        const pathname = window.location.pathname;
        const pathComponents = pathname.split('/');
        console.log(pathComponents, pathComponents.length)
        if ( (pathComponents.length >= 2 || pathComponents.indexOf('additional') !== -1) && pathComponents[1].trim() != "") {
            setHasAdditionalPath(true);
            loadMarkers(pathComponents[1]);
        } else {
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

        const data = new FormData();
        data.append("map[map_id]", small_id);
        data.append("map[csv_file]", selectedFile);

        submitToAPI(data, small_id);
    }

    function submitToAPI( data, id) {
        axios.post(API_URL, data)
          .then(response => (setsharableURL(id)))
          .catch((error) => console.log(error))
    }

    function getAPIData(id) {
        return axios.get(API_URL + '/' + id, {
          params: {
            map_id: id
          }}).then((response) => response.data)
    }
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.origin + '/' + sharableURL);
    }
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="App">
            <h1 className='title'>
                The Amazing Airport Visualizer
            </h1>
            <GoogleMap options={options} zoom={3} minZoom={3} center={center} mapContainerClassName="map-container" onLoad={loadHandler}>
                {markers.map((marker) => (
                    <MarkerF
                        key={marker.id}
                        animation={2}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.long),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        icon={{
                            url: dot,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}
                {selected ? (
                    <InfoWindow
                        position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.long) }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                {selected.name}
                            </h2>
                            <h3>
                                {selected.lat}, {selected.long}
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
                            <span className="csv-prompt-title3">You can view this map <a href={window.location.origin + '/' + sharableURL}>here</a> </span>
                        </div>
                    }
                </div>
            ) : null}
            {!CSVPrompt &&
                <div className='shareable-div-bottom'>
                    <span className="csv-prompt-title3">Nice airports! Your shareable url is: </span>
                    <input className='copy-text' type="text" value={window.location.origin + '/' + sharableURL} readOnly />
                    <button onClick={handleCopyClick}>Copy</button>
                </div>
            }

        </div>
    );
}

export default App;
