import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
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
import { translate } from '../../lib/utils/translator';

const MapView = () => {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // 點選 marker 再進行駕駛時間計算
  const fetchDirections = (markerPosition) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: location,
        destination: markerPosition,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchAndDisplayActivities(newDate);
  };

  const onMarkerClick = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
    fetchDirections(marker.position);
  };

  // 3. 當天活動再透過 sportType 篩選特定運動種類的活動
  const handleSportTypeChange = async (event) => {
    const newSportType = event.target.value;
    setSportType(newSportType);

    const filteredActivities = activityList.filter(activity => activity.category === newSportType);
    setMarkers([]);

    const placesService = new window.google.maps.places.PlacesService(mapRef.current);

    filteredActivities.forEach(activity => {
      const request = {
        query: activity.address,
        fields: ['name', 'geometry'],
      };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarker = {
            position: results[0].geometry.location,
            id: activity.id,
            category: activity.category,
            title: activity.title,
            remain: activity.remain,
            name: activity.name,
            level: activity.level,
            date: activity.date,
            time: activity.time,
          };
          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        }
      });
    });
  };

  // 2. 透過日期篩選活動
  const fetchAndDisplayActivities = async (date) => {
    const allActivities = await fetchActivities();
    const currentDayActivityList = await selectActivitiesWithDate(allActivities, date);
    setActivityList(currentDayActivityList);
    setMarkers([]);

    const placesService = new window.google.maps.places.PlacesService(mapRef.current);

    currentDayActivityList.forEach(activity => {
      const request = {
        query: activity.address,
        fields: ['name', 'geometry'],
      };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarker = {
            position: results[0].geometry.location,
            id: activity.id,
            category: activity.category,
            title: activity.title,
            remain: activity.remain,
            name: activity.name,
            level: activity.level,
            date: activity.date,
            time: activity.time,
          };
          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        }
      })
    })
  }

  // 1. 切換到 MapView 就抓使用者位置資料跟 fetchCurrentDayActivities
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

    fetchAndDisplayActivities(new Date());
  }, []);

  const selectActivitiesWithDate = (activities, selectedDate) => {
    console.log(activities);
    console.log(selectedDate);
    const selectedDateString = selectedDate.toISOString().split('T')[0];

    return activities.activity.filter(activity => {
      console.log(activity);
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      return activityDate === selectedDateString;
    });
  };

  const generateStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img key={i} src="../../star.png" alt="Star" className="all-star" />);
    }
    return stars;
  };

  const timeRangeMapping = (timeNumber) => {
    const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
    const endHour = startHour + 1;
    return `${startHour} - ${endHour}`;
  };

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded) return <LoadingSpinner />;

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
        {/* Only render this marker if location is available */}
        {location.lat !== 0 && location.lng !== 0 && (
          <Marker
            position={location}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            }}
          />
        )}

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => onMarkerClick(marker)}
            options={{
              icon: {
                url: `../../public/${marker.category}.png`,
                scaledSize: new window.google.maps.Size(20, 20),
              },
              draggable: false,
            }}
          >
            {selectedMarker === marker && (
              <InfoWindow
                position={marker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h2>活動名稱: {marker.title}</h2>
                  {/* <p>運動類型: {marker.category}</p> */}
                  <p>剩餘人數: {marker.remain}</p>
                  <p>程度: {generateStars(marker.level)}</p>
                  <p>時間: {marker.date} {timeRangeMapping(marker.time)} 點</p>
                  {directions && (
                    <p>前往時間: {directions.routes[0].legs[0].duration.text}</p>
                  )}
                  <Link to={`/activity/${marker.id}`} style={linkStyle}>
                    <button style={buttonStyle}>View Activity</button>
                  </Link>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        <DatePicker
          className='date-picker'
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          // Other props as needed, e.g., custom styling or min/max dates
        />

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

// Styles for the button and link
const buttonStyle = {
  backgroundColor: "#4285F4", // Example color
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  cursor: "pointer",
  fontSize: "1em",
};

const linkStyle = {
  textDecoration: "none", // Remove underline from the link
  display: "block", // Ensure the link fills the button for clickable area
  textAlign: "center",
};
