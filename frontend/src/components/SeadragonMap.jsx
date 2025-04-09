// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { fetchSpeciesData } from '../api';  
// import './KelpMap.css';

// const seadragonIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconSize: [25, 41],
//     className: 'seadragon-marker'
// });

// const SeadragonMap = () => {
//     const [seadragonData, setSeadragonData] = useState([]);
//     const [filteredSeadragon, setFilteredSeadragon] = useState([]);
//     const [years, setYears] = useState([]);
//     const [selectedYear, setSelectedYear] = useState('All');
//     const [minYear, setMinYear] = useState(null);
//     const [maxYear, setMaxYear] = useState(null);
//     const [autoPlay, setAutoPlay] = useState(false);
//     const [currentYear, setCurrentYear] = useState(null);

//     useEffect(() => {
//         fetchSpeciesData('commonSeadragon')
//             .then(data => {
//                 setSeadragonData(data);

//                 const uniqueYears = Array.from(new Set(data.map(item => item.year))).sort();
//                 setYears(['All', ...uniqueYears]);

//                 setMinYear(Math.min(...uniqueYears));
//                 setMaxYear(Math.max(...uniqueYears));
//             })
//             .catch(error => console.error("Error fetching seadragon data:", error));
//     }, []);

//     useEffect(() => {
//         if (selectedYear === 'All') {
//             setFilteredSeadragon(seadragonData);
//         } else {
//             const selectedYearNumber = parseInt(selectedYear);
//             setFilteredSeadragon(seadragonData.filter(item => parseInt(item.year) <= selectedYearNumber));
//         }
//     }, [selectedYear, seadragonData]);

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

//     if (!seadragonData.length) return <div>Loading...</div>;

//     return (
//         <div className="kelp-map-container">
//             <h1 style={{ textAlign: 'center', color: 'white' }}>Seadragon Map Visualization</h1>
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
//                 {filteredSeadragon.map((point, index) => {
//                     const lat = parseFloat(point.decimalLatitude);
//                     const lng = parseFloat(point.decimalLongitude);
//                     if (isNaN(lat) || isNaN(lng)) return null;

//                     return (
//                         <Marker key={index} position={[lat, lng]} icon={seadragonIcon}>
//                             <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Seadragon)</Popup>
//                         </Marker>
//                     );
//                 })}
//             </MapContainer>
//         </div>
//     );
// };

// export default SeadragonMap;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchSpeciesData, fetchKelpData } from '../api';  
import './KelpMap.css';

const seadragonIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'seadragon-marker'
});

const kelpIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'kelp-marker'
});

const SeadragonMap = () => {
    const [seadragonData, setSeadragonData] = useState([]);
    const [filteredSeadragon, setFilteredSeadragon] = useState([]);
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
        fetchSpeciesData('commonSeadragon')
            .then(seadragon => {
                setSeadragonData(seadragon);

                const uniqueYears = Array.from(new Set(seadragon.map(item => item.year))).sort();
                setYears(['All', ...uniqueYears]);

                setMinYear(Math.min(...uniqueYears));
                setMaxYear(Math.max(...uniqueYears));
            })
            .catch(error => console.error("Error fetching seadragon data:", error));

        fetchKelpData() // Fetch Kelp Data
            .then(kelp => {
                setKelpData(kelp);
            })
            .catch(error => console.error("Error fetching kelp data:", error));
    }, []);

    useEffect(() => {
        if (selectedYear === 'All') {
            setFilteredSeadragon(seadragonData);
            setFilteredKelp(kelpData);
        } else {
            const selectedYearNumber = parseInt(selectedYear);
            setFilteredSeadragon(seadragonData.filter(item => parseInt(item.year) <= selectedYearNumber));
            setFilteredKelp(kelpData.filter(item => parseInt(item.year) <= selectedYearNumber));
        }
    }, [selectedYear, seadragonData, kelpData]);

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

    if (!seadragonData.length) return <div>Loading...</div>;

    return (
        <div className="kelp-map-container" style={{ display: 'flex', 
            alignItems: 'center',  
            justifyContent: 'space-between', 
            height: '80vh', 
            padding: '20px' }}>
            
            <div style={{ width: '55%', padding: '20px', color: 'white', textAlign: 'justify', backgroundColor: '#2E2E2E', borderRadius: '10px', marginRight: '10px' }}>
                <h1>Seadragon Information</h1>
                <p>
                    The Seadragon is a beautiful and enigmatic species found along the southern and eastern coasts of Australia. 
                    Known for their leaf-like appendages, they blend into their surroundings and are considered to be closely related to seahorses.
                </p>
                <p>
                    This visualization allows you to explore the distribution of Seadragon sightings over time. 
                    Use the slider or dropdown to select a year and visualize the cumulative presence of Seadragons.
                </p>
                <p>
                    The kelp toggle allows you to compare Seadragon data with kelp distribution, providing insights 
                    into habitat preferences or environmental changes over time.
                </p>
            </div>

            <div style={{ width: '45%' }}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Seadragon Visualization</h1>
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

                    {filteredSeadragon.map((point, index) => {
                        const lat = parseFloat(point.decimalLatitude);
                        const lng = parseFloat(point.decimalLongitude);
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={`seadragon-${index}`} position={[lat, lng]} icon={seadragonIcon}>
                                <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Seadragon)</Popup>
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

export default SeadragonMap;


