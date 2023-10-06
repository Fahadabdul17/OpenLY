import {map} from './config/peta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';

document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsondrawpoint.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonPolygon.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});


document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonLinestring.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import { Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

// Definisikan URL GeoJSON untuk masing-masing jenis fitur
const polygonGeoJSONUrl = 'https://raw.githubusercontent.com/FarhanRizkiM/gis-openlayers/main/polygon.json';
const lineStringGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/linestring.geojson';
const pointGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/drawpoint.geojson';

// Buat sumber vektor dan lapisan vektor untuk masing-masing jenis fitur
const polygonSource = new VectorSource({
    format: new GeoJSON(),
    url: polygonGeoJSONUrl,
});

const lineStringSource = new VectorSource({
    format: new GeoJSON(),
    url: lineStringGeoJSONUrl,
});

const pointSource = new VectorSource({
    format: new GeoJSON(),
    url: pointGeoJSONUrl,
});

const polygonLayer = new VectorLayer({
    source: polygonSource,

});

const lineStringLayer = new VectorLayer({
    source: lineStringSource,

});

const pointLayer = new VectorLayer({
    source: pointSource,

});

// Tambahkan lapisan-lapisan ke peta
map.addLayer(polygonLayer);
map.addLayer(lineStringLayer);
map.addLayer(pointLayer);

onClick('popup-closer', onClosePopupClick);
onClick('insertmarkerbutton', onSubmitMarkerClick);
onClick('hapusbutton', onDeleteMarkerClick);
onClick('hitungcogbutton', getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);

// import { Map, View } from 'https://cdn.skypack.dev/ol/ol.js'; // Import Map dan View dari OL
// import { Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
// import { Vector as VectorSource } from 'https://cdn.skypack.dev/ol/source.js';
// import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

// // Inisialisasi peta
// const map = new Map({
//   target: 'map', // Ganti 'map' dengan ID elemen HTML tempat Anda ingin menampilkan peta
//     view: new View({
//     center: [0, 0], // Ganti dengan koordinat pusat peta Anda
//     zoom: 10, // Ganti dengan level zoom awal peta Anda
//     }),
// });

// // Definisikan URL GeoJSON untuk masing-masing jenis fitur
// const drawpointSourceUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/drawpoint.geojson';
// const lineStringSourceUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/linestring.geojson';
// const polylineSourceUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/polyline.geojson';

// // Buat sumber vektor dan lapisan vektor untuk masing-masing jenis fitur
// const drawpointSource = new VectorSource({
//     format: new GeoJSON(),
//     url: drawpointSourceUrl,
// });

// const lineStringSource = new VectorSource({
//     format: new GeoJSON(),
//     url: lineStringSourceUrl,
// });

// const polylineSource = new VectorSource({
//     format: new GeoJSON(),
//     url: polylineSourceUrl,
// });

// const drawpointLayer = new VectorLayer({
//     source: drawpointSource,
// });

// const lineStringLayer = new VectorLayer({
//     source: lineStringSource,
// });

// const polylineLayer = new VectorLayer({
//     source: polylineSource,
// });

// // Tambahkan lapisan-lapisan ke peta
// map.addLayer(drawpointLayer);
// map.addLayer(lineStringLayer);
// map.addLayer(polylineLayer);


// onClick('popup-closer',onClosePopupClick);
// onClick('insertmarkerbutton',onSubmitMarkerClick);
// onClick('hapusbutton',onDeleteMarkerClick);
// onClick('hitungcogbutton',getAllCoordinates);

// map.on('click', onMapClick);
// map.on('pointermove', onMapPointerMove);
// map.on('movestart', disposePopover);


// Mendownload data drawpoint, line string, dan polyline
// const drawpointSource = new ol.source.Vector({
//     url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsondrawpoint.json',
//     format: new ol.format.GeoJSON()
// });

// const lineStringSource = new ol.source.Vector({
//     url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonPolygon.json',
//     format: new ol.format.GeoJSON()
// });

// const polylineSource = new ol.source.Vector({
//     url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonLinestring.json',
//     format: new ol.format.GeoJSON()
// });

// // Membuat layer untuk drawpoint, line string, dan polyline
// const drawpointLayer = new ol.layer.Vector({
//     source: drawpointSource,
//     style: new ol.style.Style({
//         image: new ol.style.Circle({
//             radius: 5,
//             fill: new ol.style.Fill({
//                 color: 'red',
//             })
//         })
//     })
// });

// const lineStringLayer = new ol.layer.Vector({
//     source: lineStringSource,
//     style: new ol.style.Style({
//         stroke: new ol.style.Stroke({   
//             color: 'black',
//             width: 2
//         })
//     })
// });

// const polylineLayer = new ol.layer.Vector({
//     source: polylineSource,
//     style: new ol.style.Style({
//         stroke: new ol.style.Stroke({
//             color: 'blue',  
//             width: 5
            
//         })
//     })
// });

// // Menambahkan layer ke peta
// map.addLayer(drawpointLayer);
// map.addLayer(lineStringLayer);
// map.addLayer(polylineLayer);

// // Mendapatkan koordinat dari GeoJSON
// const getCoordinates = (source) => {
//     const features = source.getFeatures();
//     const coordinates = features[0].getGeometry().getCoordinates();
//     return coordinates;
// };

// // Menampilkan koordinat di dalam tabel
// drawpointSource.once('change', () => {
//     const drawpointCoords = getCoordinates(drawpointSource);
//     document.getElementById('featureName').textContent = 'drawpoint';
//     document.getElementById('featureType').textContent = 'Point';
//     document.getElementById('featureCoords').textContent = drawpointCoords.toString();
// });

// lineStringSource.once('change', () => {
//     const lineStringCoords = getCoordinates(lineStringSource);
//     document.getElementById('featureName').textContent = 'Line String';
//     document.getElementById('featureType').textContent = 'Line String';
//     document.getElementById('featureCoords').textContent = lineStringCoords.toString();
// });

// polylineSource.once('change', () => {
//     const polylineCoords = getCoordinates(polylineSource);
//     document.getElementById('featureName').textContent = 'Polyline';
//     document.getElementById('featureType').textContent = 'Polyline';
//     document.getElementById('featureCoords').textContent = polylineCoords.toString();
// });


// onClick('popup-closer',onClosePopupClick);
// onClick('insertmarkerbutton',onSubmitMarkerClick);
// onClick('hapusbutton',onDeleteMarkerClick);
// onClick('hitungcogbutton',getAllCoordinates);

// map.on('click', onMapClick);
// map.on('pointermove', onMapPointerMove);
// map.on('movestart', disposePopover);