import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import DatePicker from 'react-datepicker';
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

const MapView = () => {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [activityList, setActivityList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchAndDisplayActivities(newDate);
  };

  const onMarkerClick = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
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
            category: activity.category,
            title: activity.title,
            remain: activity.remain,
            name: activity.name,
          };
          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
          console.log(markers);
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
          console.log(results);
          const newMarker = {
            position: results[0].geometry.location,
            category: activity.category,
            title: activity.title,
            remain: activity.remain,
            name: activity.name,
          };
          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
          console.log(markers);
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
  }

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
                  <h2>活動名稱:{marker.title}</h2>
                  <p>運動類型:{marker.category}</p>
                  <p>剩餘人數:{marker.remain}</p>
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
