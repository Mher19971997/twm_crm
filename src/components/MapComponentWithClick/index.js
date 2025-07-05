import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix missing marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import NearMeIcon from '@mui/icons-material/NearMe';
import ArgonButton from 'components/ArgonButton';
import ArgonInput from 'components/ArgonInput';
import ArgonBox from 'components/ArgonBox';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';

// Override default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapComponent = ({onLocationSelected}) => {
    const { t } = useTranslation('createAccidents');

    const [position, setPosition] = useState(null); // User's current location
    const [selectedPosition, setSelectedPosition] = useState(null); // Selected location
    const [placeDetails, setPlaceDetails] = useState({}); // Store region, city, village, district
    const [searchQuery, setSearchQuery] = useState(''); // User's search query
    const [searchResults, setSearchResults] = useState([]); // Search suggestions
    const [searchResult, setSearchResult] = useState(null); // Coordinates of selected search result

    const mapRef = useRef(); // Reference to the map instance

    // Default view: Armenia (Yerevan)
    const defaultCenter = [40.1792, 44.4991]; // Coordinates for Yerevan, Armenia
    const defaultZoom = 10; // Suitable zoom level for the whole country

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const { latitude, longitude } = location.coords;
                    setPosition([latitude, longitude]);
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    alert(t('failed_get_location'));
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            alert(t('geolocation_not_supported'));
        }
    }, []);

    // Handle search input change
    const handleInputChange = async (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json&limit=5`
            );
            const data = await response.json();
            setSearchResults(data); // Update suggestions in dropdown
        } else {
            setSearchResults([]); // Clear dropdown if search query is short
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (result) => {
        const { lat, lon, display_name } = result;
        const newCoords = [parseFloat(lat), parseFloat(lon)];
        setSearchResult(newCoords);
        setSearchResults([]); // Clear suggestions after selection
        getPlaceDetails(lat, lon); // Fetch place details for selected place
        mapRef.current.setView(newCoords, 13); // Center the map and zoom in on the selected location
    };

    // Clicking on map to select position
    const LocationMarker = () => {
        useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setSelectedPosition([lat, lng]);
                getPlaceDetails(lat, lng); // Fetch place details for clicked location
            },
        });
        return null;
    };

    // Fetch place details for clicked position
    // Fetch place details for clicked position
    const getPlaceDetails = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();

            if (data && data.address) {
                const { village, hamlet, town, state } = data.address;

                // Only return village, hamlet, or town, no fallback to city
                const placeInfo = {
                    village: village || hamlet || town || t('not_available'), // Only village-level information
                    marz: state || t('not_available'), // Armenia's region/province (marz) is usually returned as state
                };
                
                onLocationSelected(placeInfo)
                setPlaceDetails(placeInfo);
            }
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };


    // Function to center map on user's current location and get place details
    const centerMapOnCurrentLocation = () => {
        if (position) {
            mapRef.current.setView(position, 13); // Center the map on current location with zoom 13
            const [latitude, longitude] = position;
            getPlaceDetails(latitude, longitude); // Fetch place details for current location
        } else {
            alert(t('current_location_not_available'));
        }
    };


    return (
        <ArgonBox position="relative">
            <ArgonBox style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000, marginBottom: '1rem' }}>
                <ArgonInput
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder={t('search')}
                />
                {searchResults.length > 0 && (
                    <ul
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            border: '1px solid #ccc',
                            width: '300px',
                            zIndex: 1000,
                            listStyleType: 'none',
                            margin: 0,
                            padding: 0,
                            maxHeight: '150px',
                            overflowY: 'auto',
                        }}
                    >
                        {searchResults.map((result, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ccc',
                                }}
                                onClick={() => handleSuggestionClick(result)}
                            >
                                {result.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </ArgonBox>

            {/* {placeDetails && (
                <div>
                    <p>{t('village')}: {placeDetails.village}</p>
                    <p>{t('marz')}: {placeDetails.marz}</p>
                </div>
            )} */}

            {/* Button to recenter map to current location */}
            <ArgonButton
                onClick={centerMapOnCurrentLocation}
                variant="gradient"
                color="info"
                sx={{
                    position: 'absolute',
                    bottom: '25px',
                    right: '10px',
                    zIndex: 1000,
                    cursor: 'pointer',
                }}
            >
                <NearMeIcon />
            </ArgonButton>
            {position ? (
                <MapContainer
                required
                    center={searchResult || defaultCenter} // Center map on search result or default to Armenia
                    zoom={searchResult ? 13 : defaultZoom} // Zoom in to search result or default to Armenia's view
                    style={{ height: '80vh', width: '100%' }}
                    ref={mapRef} // Add reference to the MapContainer
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {position && <Marker position={position} />} {/* Current position */}
                    {selectedPosition && <Marker position={selectedPosition} />} {/* Selected location */}
                    {searchResult && <Marker position={searchResult} />} {/* Search result location */}
                    <LocationMarker /> {/* Click to select position */}
                </MapContainer>
            ) : (
                <LoadingPage />
            )}
        </ArgonBox>
    );
};

export default MapComponent;
