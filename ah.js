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

document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([107.90490500781718, -7.215896821868576]),
            zoom: 17.5
        })
    });

    // Mendownload data drawpoint, line string, dan polyline
    const drawpointSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsondrawpoint.json',
        format: new ol.format.GeoJSON()
    });

    const lineStringSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonPolygon.json',
        format: new ol.format.GeoJSON()
    });

    const polylineSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/Fahadabdul17/OpenLY/main/geojsonLinestring.json',
        format: new ol.format.GeoJSON()
    });

    // Membuat layer untuk drawpoint, line string, dan polyline
    const drawpointLayer = new ol.layer.Vector({
        source: drawpointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'red',
                })
            })
        })
    });

    const lineStringLayer = new ol.layer.Vector({
        source: lineStringSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({   
                color: 'black',
                width: 2
            })
        })
    });

    const polylineLayer = new ol.layer.Vector({
        source: polylineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',  
                width: 5
                
            })
        })
    });

    // Menambahkan layer ke peta
    map.addLayer(drawpointLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polylineLayer);

    // Mendapatkan koordinat dari GeoJSON
    const getCoordinates = (source) => {
        const features = source.getFeatures();
        const coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    };

    // Menampilkan koordinat di dalam tabel
    drawpointSource.once('change', () => {
        const drawpointCoords = getCoordinates(drawpointSource);
        document.getElementById('featureName').textContent = 'drawpoint';
        document.getElementById('featureType').textContent = 'Point';
        document.getElementById('featureCoords').textContent = drawpointCoords.toString();
    });

    lineStringSource.once('change', () => {
        const lineStringCoords = getCoordinates(lineStringSource);
        document.getElementById('featureName').textContent = 'Line String';
        document.getElementById('featureType').textContent = 'Line String';
        document.getElementById('featureCoords').textContent = lineStringCoords.toString();
    });

    polylineSource.once('change', () => {
        const polylineCoords = getCoordinates(polylineSource);
        document.getElementById('featureName').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = polylineCoords.toString();
    });
});