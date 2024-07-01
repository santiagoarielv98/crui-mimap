import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

var southWest = L.latLng(-34.69, -58.7397),
  northEast = L.latLng(-34.59, -58.6396);

var maxBoundArea = L.latLngBounds(southWest, northEast);

var map = L.map("map", {
  maxZoom: 19,
  minZoom: 13,
  zoomControl: true,
  maxBounds: maxBoundArea,
}).setView([-34.63943375, -58.689613566973605], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

let btnComercios = document.getElementById("btn-comercios");
let btnIndustrias = document.getElementById("btn-industrias");

// http://localhost:3000

/* btnComercios.addEventListener("click", () => {
  clearMarkers();
  fetch("http://localhost:3000/businesses")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((comercio) => {
        L.marker([
          comercio.map.coordinates.latitude,
          comercio.map.coordinates.longitude,
        ])
          .addTo(map)
          .bindPopup(
            `<b>${comercio.name}</b><br>${comercio.address}<br>${comercio.contact_phone}`
          );
      });
    });
}); */

btnComercios.addEventListener("click", () => {
  clearMarkers();
  // fetch("http://localhost:3000/normalizaciones")
  fetch(
    "https://raw.githubusercontent.com/santiagoarielv98/crui-prueba_mapa/main/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // data.forEach((comercio) => {
      data.normalizaciones.forEach((comercio) => {
        L.marker([comercio.location.lat, comercio.location.lon])
          .addTo(map)
          .bindPopup(
            `<b>${comercio.name}</b><br>${comercio.address}<br>${comercio.contact_phone}`
          );
      });
    });
});

btnIndustrias.addEventListener("click", () => {
  clearMarkers();
  // fetch("http://localhost:3000/industries")
  fetch(
    "https://raw.githubusercontent.com/santiagoarielv98/crui-prueba_mapa/main/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // data.forEach((industria) => {
      data.industries.forEach((industria) => {
        L.marker([
          industria.map.coordinates.latitude,
          industria.map.coordinates.longitude,
        ])
          .addTo(map)
          .bindPopup(
            `<b>${industria.company}</b><br>${industria.address}<br>${industria.contact_phone}`
          );
      });
    });
});

function clearMarkers() {
  map.eachLayer((layer) => {
    if (!layer._url) {
      map.removeLayer(layer);
    }
  });
}
