import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState, useRef } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../config/config';
import LoadingSpinner from '../Loading/LoadingPage';
import { fetchActivities, fetchStadiumList } from '../../api';
import { getCustomMarker } from '../../lib/utils/customMarker';

const MapView = () => {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleSportTypeChange = async (event) => {
    const newSportType = event.target.value;
    setSportType(newSportType);
    setMarkers([]);

    const stadiumList = await fetchStadiumList(newSportType);
    const placesService = new window.google.maps.places.PlacesService(mapRef.current);

    stadiumList.stadium.forEach(stadium => {
      console.log(stadium);
      const request = {
        query: stadium.address,
        fields: ['name', 'geometry'],
      };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          console.log(results);
          const newMarker = {
            position: results[0].geometry.location,
            title: results[0].name,
          };
          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        }
      });
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.error("Error fetching the current position");
        }
      );
    }
  }, []);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: '90%',
          height: '70%',
          marginTop: '15px',
          marginBottom: '90px',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: '10px'
        }}
        zoom={15}
        center={location}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={map => (mapRef.current = map)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => onMarkerClick(marker)}
            options={{
              draggable: false,
            }}
          >
            {selectedMarker === marker && (
              <InfoWindow
                position={marker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h2>{marker.title}</h2>
                  {/* Here you can add any custom content you want */}
                  <p>Additional information about the marker can go here.</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}

        <Box sx={{ minWidth: '75%',  marginTop: '10px', marginLeft: '10px', marginRight: '10px', borderRadius: '10px'}}>
          <FormControl fullWidth sx={{backgroundColor: 'white'}}>
            <InputLabel id="demo-simple-select-label">運動類型</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sportType}
              label="sportType"
              onChange={handleSportTypeChange}
            >
              <MenuItem value={'badminton'}>羽毛球</MenuItem>
              <MenuItem value={'baseball'}>棒球</MenuItem>
              <MenuItem value={'basketball'}>籃球</MenuItem>
              <MenuItem value={'volleyball'}>排球</MenuItem>
              <MenuItem value={'tabletennis'}>桌球</MenuItem>
              <MenuItem value={'tennis'}>網球</MenuItem>
              <MenuItem value={'swimming'}>游泳</MenuItem>
              <MenuItem value={'gym'}>健身房</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </GoogleMap>
    </>
  );
};

export default MapView;
