////////

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { fetchKelpData, fetchSeaUrchinData } from '../api';
// import './KelpMap.css';

// const kelpIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//     className: 'kelp-marker'
// });

// const seaUrchinIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//     className: 'urchin-marker'
// });


// const style = document.createElement('style');
// style.innerHTML = `
//   .kelp-marker {
//     filter: hue-rotate(35deg) brightness(1.2) saturate(2.5); 
//   }
//   .urchin-marker {
//     filter: hue-rotate(210deg) brightness(1.2) saturate(2.5); 
//   }
// `;
// document.head.appendChild(style);

// const KelpMap = () => {
//     const [kelpData, setKelpData] = useState([]);
//     const [seaUrchinData, setSeaUrchinData] = useState([]);
//     const [filteredKelp, setFilteredKelp] = useState([]);
//     const [filteredUrchin, setFilteredUrchin] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedYear, setSelectedYear] = useState('All');
//     const [years, setYears] = useState([]);
    
//     useEffect(() => {
//         Promise.all([fetchKelpData(), fetchSeaUrchinData()])
//             .then(([kelp, urchin]) => {
//                 setKelpData(kelp);
//                 setSeaUrchinData(urchin);

//                 const uniqueYears = Array.from(new Set([...kelp, ...urchin].map(item => item.year))).sort();
//                 setYears(['All', ...uniqueYears]);
                
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             });
//     }, []);
    
//     useEffect(() => {
//         if (selectedYear === 'All') {
//             setFilteredKelp(kelpData);
//             setFilteredUrchin(seaUrchinData);
//         } else {
//             setFilteredKelp(kelpData.filter(item => item.year === selectedYear));
//             setFilteredUrchin(seaUrchinData.filter(item => item.year === selectedYear));
//         }
//     }, [selectedYear, kelpData, seaUrchinData]);

//     if (loading) return <div>Loading...</div>;

//     const minYear = Math.min(...years.filter(year => year !== 'All').map(Number));
//     const maxYear = Math.max(...years.filter(year => year !== 'All').map(Number));

//     return (
//         <div className="kelp-map-container">
//             <h1 style={{ textAlign: 'center', color: 'white' }}>Kelp Forest Visualization</h1>
//             <div className="controls">
//                 <label htmlFor="yearSelect">Select Year: </label>
//                 <select 
//                     id="yearSelect" 
//                     value={selectedYear} 
//                     onChange={(e) => setSelectedYear(e.target.value)}
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
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                     style={{ marginLeft: '10px', width: '60%' }}
//                 />
//             </div>

//             <MapContainer 
//                 center={[-35, 148]} 
//                 zoom={4} 
//                 style={{ height: '80vh', width: '100%' }}
//                 doubleClickZoom={true}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                 />

//                 {filteredKelp.map((point, index) => {
//                     const lat = parseFloat(point.decimalLatitude);
//                     const lng = parseFloat(point.decimalLongitude);

//                     if (isNaN(lat) || isNaN(lng)) return null;

//                     return (
//                         <Marker 
//                             key={`kelp-${index}`} 
//                             position={[lat, lng]}
//                             icon={kelpIcon}
//                         >
//                             <Popup>
//                                 Year: {point.year}<br />
//                                 Location: {point.stateProvince} (Kelp)
//                             </Popup>
//                         </Marker>
//                     );
//                 })}

//                 {filteredUrchin.map((point, index) => {
//                     const lat = parseFloat(point.decimalLatitude);
//                     const lng = parseFloat(point.decimalLongitude);

//                     if (isNaN(lat) || isNaN(lng)) return null;

//                     return (
//                         <Marker 
//                             key={`urchin-${index}`} 
//                             position={[lat, lng]}
//                             icon={seaUrchinIcon}
//                         >
//                             <Popup>
//                                 Year: {point.year}<br />
//                                 Location: {point.stateProvince} (Sea Urchin)
//                             </Popup>
//                         </Marker>
//                     );
//                 })}
//             </MapContainer>
//         </div>
//     );
// };

// export default KelpMap;

///////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchKelpData, fetchSeaUrchinData, fetchDiveSites } from '../api'; 
import './KelpMap.css';


const kelpIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'kelp-marker'
});

const seaUrchinIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    className: 'urchin-marker'
});

const diveSiteIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png', 
    iconSize: [20, 30],
    className: 'dive-site-marker'
});

const style = document.createElement('style');
style.innerHTML = `
  .kelp-marker {
    filter: hue-rotate(35deg) brightness(1.2) saturate(2.5); 
  }
  .urchin-marker {
    filter: hue-rotate(210deg) brightness(1.2) saturate(2.5); 
  }
`;
document.head.appendChild(style);

const KelpMap = () => {
    const [kelpData, setKelpData] = useState([]);
    const [seaUrchinData, setSeaUrchinData] = useState([]);
    const [diveSites, setDiveSites] = useState([]); 
    const [filteredKelp, setFilteredKelp] = useState([]);
    const [filteredUrchin, setFilteredUrchin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('All');
    const [years, setYears] = useState([]);
    
    useEffect(() => {
        Promise.all([fetchKelpData(), fetchSeaUrchinData(), fetchDiveSites()]) 
            .then(([kelp, urchin, diveSitesData]) => {
                setKelpData(kelp);
                setSeaUrchinData(urchin);
                setDiveSites(diveSitesData); 

                const uniqueYears = Array.from(new Set([...kelp, ...urchin].map(item => item.year))).sort();
                setYears(['All', ...uniqueYears]);
                
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        if (selectedYear === 'All') {
            setFilteredKelp(kelpData);
            setFilteredUrchin(seaUrchinData);
        } else {
            setFilteredKelp(kelpData.filter(item => item.year === selectedYear));
            setFilteredUrchin(seaUrchinData.filter(item => item.year === selectedYear));
        }
    }, [selectedYear, kelpData, seaUrchinData]);

    if (loading) return <div>Loading...</div>;

    const minYear = Math.min(...years.filter(year => year !== 'All').map(Number));
    const maxYear = Math.max(...years.filter(year => year !== 'All').map(Number));

    return (
        <div className="kelp-map-container">
            <h1 style={{ textAlign: 'center', color: 'white' }}>Kelp Forest Visualization</h1>
            <div className="controls">
                <label htmlFor="yearSelect">Select Year: </label>
                <select 
                    id="yearSelect" 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
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
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ marginLeft: '10px', width: '60%' }}
                />
            </div>

            <MapContainer 
                center={[-35, 148]} 
                zoom={4} 
                style={{ height: '80vh', width: '100%' }}
                doubleClickZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {filteredKelp.map((point, index) => {
                    const lat = parseFloat(point.decimalLatitude);
                    const lng = parseFloat(point.decimalLongitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker key={`kelp-${index}`} position={[lat, lng]} icon={kelpIcon}>
                            <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Kelp)</Popup>
                        </Marker>
                    );
                })}

                {filteredUrchin.map((point, index) => {
                    const lat = parseFloat(point.decimalLatitude);
                    const lng = parseFloat(point.decimalLongitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker key={`urchin-${index}`} position={[lat, lng]} icon={seaUrchinIcon}>
                            <Popup>Year: {point.year}<br />Location: {point.stateProvince} (Sea Urchin)</Popup>
                        </Marker>
                    );
                })}

                {diveSites.map((site, index) => {
                    const lat = parseFloat(site.decimalLatitude);
                    const lng = parseFloat(site.decimalLongitude);
                    
                    if (isNaN(lat) || isNaN(lng)) return null;

                    const siteName = site["Diver site"] || site["﻿Diver site"] || site.siteName || "Unknown Site";  

                    return (
                        <Marker 
                            key={`dive-${index}`} 
                            position={[lat, lng]} 
                            icon={diveSiteIcon}
                        >
                            <Popup>
                                <strong>Dive Site:</strong> {siteName} <br />
                                <strong>Latitude:</strong> {lat} <br />
                                <strong>Longitude:</strong> {lng}
                            </Popup>
                        </Marker>
                    );
                })}

                {/* {diveSites.map((site, index) => { 
                    const lat = parseFloat(site.decimalLatitude);
                    const lng = parseFloat(site.decimalLongitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker key={`dive-${index}`} position={[lat, lng]} icon={diveSiteIcon}>
                            <Popup>Dive Site: {site["Diver site"]}</Popup>
                        </Marker>
                    );
                })} */}
            </MapContainer>
        </div>
    );
};

export default KelpMap;
