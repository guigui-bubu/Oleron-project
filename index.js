let coord = [];
const linkWeb = "https://fr.wikipedia.org/wiki/Fort_Boyard_(monument)";
const camPhare = "https://www.youtube.com/watch?v=kpzKmQUMh4E";
const webPhare = "https://chassiron.jimdo.com/webcam-et-m%C3%A9t%C3%A9o/";
const camHuttes =
  "https://www.vision-environnement.com/livecams/webcam.php?webcam=oleron-les-huttes";
const camPortStDenis = "https://www.youtube.com/watch?v=8VOZJhA-T1g";

const greenIcon = L.icon({
  iconUrl: "leaf-green.png",
  shadowUrl: "leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

//------------creation de la map (coordonnée ile d'oleron)---------------------//
const map = L.map("map").setView([45.9235471, -1.2878108], 11);

//-------------creation du calque image----------------------------------------//
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { maxZoom: 20 }
).addTo(map);

//-------------Creation point d'intêret----------------------------------------//
var command = L.control({ position: "topright" });
command.onAdd = function (map) {
  var div = L.DomUtil.create("div", "command");
  div.innerHTML +=
    '<div style="text-align:center;"><span style="font-size:18px;">Points d\'intérêt</span><br /><span style="color:grey;font-size:14px;">(île d\'Oléron)</span></div>';
  div.innerHTML +=
    '<form id="ecluse"><input id="ecluse" type="checkbox"/>Ecluses</form>';
  div.innerHTML +=
    '<form id="plage"><input id="plage" type="checkbox"/>Plages</form>';
  return div;
};
command.addTo(map);

//-------------Ajout d'un marker-------------------------------------------------//
const circle = L.circle([45.9502774, -1.2405319], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);
const fortBoyard = L.marker([45.9996353, -1.2139129]).addTo(map);
const phareChassiron = L.marker([46.0466931, -1.4102766])
  .addTo(map)
  .bindPopup(
    `<h4>Le phare de Chassiron</h4><a href=${webPhare}>Site du phare</a><br><a href=${camPhare}>Cam</a>`
  );
const beachHuttes = L.marker([46.0051561, -1.3914498])
  .addTo(map)
  .bindPopup(`<h4>Plage des Huttes</h4><a href=${camHuttes}>Cam</a>`);
const beachSeulieres = L.marker([45.9987937, -1.3876])
  .addTo(map)
  .bindPopup(`<h4>Plage des Seulières</h4>⭐⭐⭐⭐⭐`);
const portStDenis = L.marker([46.0379258, -1.372156])
  .addTo(map)
  .bindPopup(
    `<h4>Port de plaissance de St Denis d'Oleron</h4><a href=${camPortStDenis}>Cam</a>`
  );
const buvetteStDenis = L.marker([46.0350323, -1.3716366])
  .addTo(map)
  .bindPopup(`<h4>La Buvette</h4>⭐⭐⭐⭐⭐`);
//-------------------------------------------------------- function fectch pour le json
async function Oleron() {
  await fetch("Oleron-ecluses.json")
    .then((res) => res.json())
    .then((data) => (coord = data.features));

  coord.map((toto) => {
    let locationEcluse = [];
    let newLocationEcluse = [];
    let nomEcluse = toto.properties.ancien_nom;
    locationEcluse = toto.geometry.coordinates[0];

    for (i = 0; i < locationEcluse.length; i++) {
      newLocationEcluse = locationEcluse[i].reverse();

      const check = document.getElementById("ecluse");
      check.addEventListener("input", (e) => {
        e.preventDefault();

        if (!check.checked) {
          L.polygon([locationEcluse], {
            fillColor: "grey",
            weight: 0.5,
            opacity: 1,
            color: "white", //Outline color
            fillOpacity: 0.7,
          })
            .addTo(map)
            .bindPopup(`${nomEcluse}`); // Ajout de Popup
        }
      });
    }
  });

  /*const polygon = L.polygon([[45.902698040433478, -1.308508500730597]]).addTo(
    map
  );*/

  //ajout popup

  circle.bindPopup("Golf d'Oleron.");
  fortBoyard.bindPopup(`<h4>FortBoyard</h4><a href=${linkWeb}>Lien</a>`);
}

Oleron();
