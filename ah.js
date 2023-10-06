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

    fetch("geojsonLinestring.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
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