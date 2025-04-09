import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchKelpData } from '../api';  
import './KelpMap.css';

const kelpIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'kelp-marker'
});

const KelpMap = () => {
    const [kelpData, setKelpData] = useState([]);
    const [filteredKelp, setFilteredKelp] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('All');
    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);
    const [autoPlay, setAutoPlay] = useState(false);
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        fetchKelpData()
            .then(data => {
                setKelpData(data);

                const uniqueYears = Array.from(new Set(data.map(item => item.year))).sort();
                setYears(['All', ...uniqueYears]);

                setMinYear(Math.min(...uniqueYears));
                setMaxYear(Math.max(...uniqueYears));
            })
            .catch(error => console.error("Error fetching kelp data:", error));
    }, []);

    useEffect(() => {
        if (selectedYear === 'All') {
            setFilteredKelp(kelpData);
        } else {
            const selectedYearNumber = parseInt(selectedYear);
            setFilteredKelp(kelpData.filter(item => parseInt(item.year) <= selectedYearNumber));
        }
    }, [selectedYear, kelpData]);

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

    if (!kelpData.length) return <div>Loading...</div>;

    return (
        <div className="kelp-map-container" style={{ display: 'flex', 
            alignItems: 'center',  
            justifyContent: 'space-between', 
            height: '80vh', 
            padding: '20px' }}>
    
           
            <div style={{ width: '55%', padding: '20px', color: 'white', textAlign: 'justify', backgroundColor: '#2E2E2E', borderRadius: '10px', marginRight: '10px' }}>
                <h1>Kelp Information</h1>
                <p>
                    Kelp forests are among the most productive and dynamic ecosystems on Earth. 
                    They occur in coastal waters with temperatures below about 20°C and can grow at impressive rates, 
                    providing critical habitat and food for numerous marine species.
                </p>
                <p>
                    This visualization allows you to explore the distribution of Kelp sightings over time. 
                    Use the slider or dropdown to select a year and visualize the cumulative presence of Kelp.
                </p>
                <p>
                    The auto-play feature allows you to view the gradual accumulation of Kelp data over time, 
                    giving insights into how kelp forests have evolved or been impacted by various environmental factors.
                </p>
            </div>

           
            <div style={{ width: '45%' }}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Kelp Map Visualization</h1>
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
                        </>
                    )}
                </div>

                <MapContainer center={[-42.0, 146.5]} 
                    zoom={6.5}
                    style={{ height: '60vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {filteredKelp.map((point, index) => {
                        const lat = parseFloat(point.decimalLatitude);
                        const lng = parseFloat(point.decimalLongitude);
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={index} position={[lat, lng]} icon={kelpIcon}>
                                <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Kelp)</Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>

        // <div className="kelp-map-container">
        //     <h1 style={{ textAlign: 'center', color: 'white' }}>Kelp Map Visualization</h1>
        //     <div className="controls">
        //         <label htmlFor="yearSelect">Select Year: </label>
        //         {minYear && maxYear && (
        //             <>
        //                 <select 
        //                     id="yearSelect" 
        //                     value={selectedYear} 
        //                     onChange={(e) => {
        //                         setSelectedYear(e.target.value);
        //                         setAutoPlay(false); 
        //                     }}
        //                 >
        //                     {years.map(year => (
        //                         <option key={year} value={year}>{year}</option>
        //                     ))}
        //                 </select>
                        
        //                 <input 
        //                     type="range" 
        //                     min={minYear} 
        //                     max={maxYear} 
        //                     value={selectedYear === 'All' ? minYear : selectedYear} 
        //                     onChange={(e) => {
        //                         setSelectedYear(e.target.value);
        //                         setAutoPlay(false); 
        //                     }}
        //                     style={{ marginLeft: '10px', width: '60%' }}
        //                 />

        //                 <button onClick={() => setAutoPlay(!autoPlay)}>
        //                     {autoPlay ? 'Stop AutoPlay' : 'Start AutoPlay'}
        //                 </button>
        //             </>
        //         )}
        //     </div>

        //     <MapContainer center={[-35, 148]} zoom={4} style={{ height: '60vh', width: '100%' }}>
        //         <TileLayer
        //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //             attribution="&copy; OpenStreetMap contributors"
        //         />
        //         {filteredKelp.map((point, index) => {
        //             const lat = parseFloat(point.decimalLatitude);
        //             const lng = parseFloat(point.decimalLongitude);
        //             if (isNaN(lat) || isNaN(lng)) return null;

        //             return (
        //                 <Marker key={index} position={[lat, lng]} icon={kelpIcon}>
        //                     <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Kelp)</Popup>
        //                 </Marker>
        //             );
        //         })}
        //     </MapContainer>
        // </div>
    );
};

export default KelpMap;
