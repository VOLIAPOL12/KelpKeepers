// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { fetchSpeciesData } from '../api';  
// import './KelpMap.css';

// const handfishIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconSize: [25, 41],
//     className: 'handfish-marker'
// });

// const HandfishMap = () => {
//     const [handfishData, setHandfishData] = useState([]);
//     const [filteredHandfish, setFilteredHandfish] = useState([]);
//     const [years, setYears] = useState([]);
//     const [selectedYear, setSelectedYear] = useState('All');
//     const [minYear, setMinYear] = useState(null);
//     const [maxYear, setMaxYear] = useState(null);
//     const [autoPlay, setAutoPlay] = useState(false);
//     const [currentYear, setCurrentYear] = useState(null);

//     useEffect(() => {
//         fetchSpeciesData('spottedHandfish')
//             .then(data => {
//                 setHandfishData(data);

//                 const uniqueYears = Array.from(new Set(data.map(item => item.year))).sort();
//                 setYears(['All', ...uniqueYears]);

//                 setMinYear(Math.min(...uniqueYears));
//                 setMaxYear(Math.max(...uniqueYears));
//             })
//             .catch(error => console.error("Error fetching handfish data:", error));
//     }, []);

//     useEffect(() => {
//         if (selectedYear === 'All') {
//             setFilteredHandfish(handfishData);
//         } else {
//             const selectedYearNumber = parseInt(selectedYear);
//             setFilteredHandfish(handfishData.filter(item => parseInt(item.year) <= selectedYearNumber));
//         }
//     }, [selectedYear, handfishData]);

//     useEffect(() => {
//         if (autoPlay) {
//             const interval = setInterval(() => {
//                 if (currentYear === null || currentYear >= maxYear) {
//                     setCurrentYear(minYear);
//                 } else {
//                     setCurrentYear(prevYear => prevYear + 1);
//                 }
//             }, 2000);
//             return () => clearInterval(interval);
//         }
//     }, [autoPlay, currentYear, minYear, maxYear]);

//     useEffect(() => {
//         if (currentYear !== null) {
//             setSelectedYear(currentYear.toString());
//         }
//     }, [currentYear]);

//     if (!handfishData.length) return <div>Loading...</div>;

//     return (
//         <div className="kelp-map-container">
//             <h1 style={{ textAlign: 'center', color: 'white' }}>Handfish Map Visualization</h1>
//             <div className="controls">
//                 <label htmlFor="yearSelect">Select Year: </label>
//                 {minYear && maxYear && (
//                     <>
//                         <select 
//                             id="yearSelect" 
//                             value={selectedYear} 
//                             onChange={(e) => {
//                                 setSelectedYear(e.target.value);
//                                 setAutoPlay(false); 
//                             }}
//                         >
//                             {years.map(year => (
//                                 <option key={year} value={year}>{year}</option>
//                             ))}
//                         </select>
                        
//                         <input 
//                             type="range" 
//                             min={minYear} 
//                             max={maxYear} 
//                             value={selectedYear === 'All' ? minYear : selectedYear} 
//                             onChange={(e) => {
//                                 setSelectedYear(e.target.value);
//                                 setAutoPlay(false); 
//                             }}
//                             style={{ marginLeft: '10px', width: '60%' }}
//                         />

//                         <button onClick={() => setAutoPlay(!autoPlay)}>
//                             {autoPlay ? 'Stop AutoPlay' : 'Start AutoPlay'}
//                         </button>
//                     </>
//                 )}
//             </div>

//             <MapContainer center={[-35, 148]} zoom={4} style={{ height: '60vh', width: '100%' }}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                 />
//                 {filteredHandfish.map((point, index) => {
//                     const lat = parseFloat(point.decimalLatitude);
//                     const lng = parseFloat(point.decimalLongitude);
//                     if (isNaN(lat) || isNaN(lng)) return null;

//                     return (
//                         <Marker key={index} position={[lat, lng]} icon={handfishIcon}>
//                             <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Handfish)</Popup>
//                         </Marker>
//                     );
//                 })}
//             </MapContainer>
//         </div>
//     );
// };

// export default HandfishMap;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchSpeciesData, fetchKelpData } from '../api';  
import './KelpMap.css';

const handfishIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'handfish-marker'
});

const kelpIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'kelp-marker'
});

const HandfishMap = () => {
    const [handfishData, setHandfishData] = useState([]);
    const [filteredHandfish, setFilteredHandfish] = useState([]);
    const [kelpData, setKelpData] = useState([]);
    const [filteredKelp, setFilteredKelp] = useState([]);
    const [showKelp, setShowKelp] = useState(false); // Toggle State for Kelp View
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('All');
    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);
    const [autoPlay, setAutoPlay] = useState(false);
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        fetchSpeciesData('spottedHandfish')
            .then(handfish => {
                setHandfishData(handfish);

                const uniqueYears = Array.from(new Set(handfish.map(item => item.year))).sort();
                setYears(['All', ...uniqueYears]);

                setMinYear(Math.min(...uniqueYears));
                setMaxYear(Math.max(...uniqueYears));
            })
            .catch(error => console.error("Error fetching handfish data:", error));

        fetchKelpData() // Fetch Kelp Data
            .then(kelp => {
                setKelpData(kelp);
            })
            .catch(error => console.error("Error fetching kelp data:", error));
    }, []);

    useEffect(() => {
        if (selectedYear === 'All') {
            setFilteredHandfish(handfishData);
            setFilteredKelp(kelpData);
        } else {
            const selectedYearNumber = parseInt(selectedYear);
            setFilteredHandfish(handfishData.filter(item => parseInt(item.year) <= selectedYearNumber));
            setFilteredKelp(kelpData.filter(item => parseInt(item.year) <= selectedYearNumber));
        }
    }, [selectedYear, handfishData, kelpData]);

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                if (currentYear === null || currentYear >= maxYear) {
                    setCurrentYear(minYear);
                } else {
                    setCurrentYear(prevYear => prevYear + 1);
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [autoPlay, currentYear, minYear, maxYear]);

    useEffect(() => {
        if (currentYear !== null) {
            setSelectedYear(currentYear.toString());
        }
    }, [currentYear]);

    if (!handfishData.length) return <div>Loading...</div>;

    return (
        <div className="kelp-map-container" style={{ display: 'flex', 
            alignItems: 'center',  
            justifyContent: 'space-between', 
            height: '80vh', 
            padding: '20px' }}>
            
            <div style={{ width: '55%', padding: '20px', color: 'white', textAlign: 'justify', backgroundColor: '#2E2E2E', borderRadius: '10px', marginRight: '10px' }}>
                <h1>Handfish Information</h1>
                <p>
                    Handfish are a fascinating and unique group of anglerfish that are known for their ability to "walk" along the sea floor 
                    using their pectoral fins rather than swim. These small fish are primarily found in the coastal waters of southern 
                    Australia and Tasmania.
                </p>
                <p>
                    This visualization allows you to explore the distribution of Handfish sightings over time. 
                    Use the slider or dropdown to select a year and visualize the cumulative presence of Handfish.
                </p>
                <p>
                    The kelp toggle allows you to compare Handfish data with kelp distribution, which can provide insights 
                    into habitat preferences or environmental changes over time.
                </p>
            </div>

            
            <div style={{ width: '45%' }}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Handfish Visualization</h1>
                <div className="controls">
                    <label htmlFor="yearSelect">Select Year: </label>

                    {minYear && maxYear && (
                        <>
                            <select 
                                id="yearSelect" 
                                value={selectedYear} 
                                onChange={(e) => {
                                    setSelectedYear(e.target.value);
                                    setAutoPlay(false); 
                                }}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            
                            <input 
                                type="range" 
                                min={minYear} 
                                max={maxYear} 
                                value={selectedYear === 'All' ? minYear : selectedYear} 
                                onChange={(e) => {
                                    setSelectedYear(e.target.value);
                                    setAutoPlay(false); 
                                }}
                                style={{ marginLeft: '10px', width: '60%' }}
                            />

                            <button onClick={() => setAutoPlay(!autoPlay)}>
                                {autoPlay ? 'Stop AutoPlay' : 'Start AutoPlay'}
                            </button>
                            <button onClick={() => setShowKelp(!showKelp)} 
                                    className="kelp-toggle-button">
                                {showKelp ? 'Hide Kelp' : 'Show Kelp'}
                            </button>
                        </>
                    )}
                </div>

                <MapContainer 
                    center={[-42.0, 146.5]} 
                    zoom={6.5} 
                    style={{ height: '60vh', width: '100%' }}
                    doubleClickZoom={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    {filteredHandfish.map((point, index) => {
                        const lat = parseFloat(point.decimalLatitude);
                        const lng = parseFloat(point.decimalLongitude);
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={`handfish-${index}`} position={[lat, lng]} icon={handfishIcon}>
                                <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Handfish)</Popup>
                            </Marker>
                        );
                    })}

                    {showKelp && filteredKelp.map((point, index) => {
                        const lat = parseFloat(point.decimalLatitude);
                        const lng = parseFloat(point.decimalLongitude);
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={`kelp-${index}`} position={[lat, lng]} icon={kelpIcon}>
                                <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Kelp)</Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>

        
    );
};

export default HandfishMap;
