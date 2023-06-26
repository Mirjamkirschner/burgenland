/* Code von Burgenland mobile Beispiel */

// Zentrum Karte Objekt
let stpolten = {
    lat: 48.33001133291213,
    lng: 16.060959034595086,
    title: "St. Pölten, Niederösterreich"
}

// Karte initialisieren und Fullscreen Control 
let map = L.map("map", {
    fullscreenControl: true
}).setView([
    stpolten.lat, stpolten.lng
], 7.5);

// thematische Layer
let themaLayer = {
    kampThayaMarch: L.featureGroup(),
    piestingtal: L.featureGroup(),
    thayarunde: L.featureGroup(),
    traisental: L.featureGroup(),
    triestingGoelsental: L.featureGroup(),
    triestingau: L.featureGroup(),
    ybbstal: L.featureGroup(),
    badeseen: L.featureGroup(),
}

// Hintergrundlayer 
//noch den schöneren von der Hauptkarte einfügen, wenn wir das geschafft haben 
let eGrundkarteNiederoesterreich = L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.DE").addTo(map),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
}, {
    "Jubiläumsradweg": themaLayer.kampThayaMarch.addTo(map),
    "Piestingtal-Radweg": themaLayer.piestingtal.addTo(map),
    "Thayarunde": themaLayer.thayarunde.addTo(map),
    "Traisental-Radweg": themaLayer.traisental.addTo(map),
    "Triesting-Gölsental-Radweg": themaLayer.triestingGoelsental.addTo(map),
    "Triestingau-Radweg": themaLayer.triestingau.addTo(map),
    "Ybbstal-Radweg": themaLayer.ybbstal.addTo(map),
    "Badeseen": themaLayer.badeseen,
}).addTo(map);


var gpx = './data/niederoesterreich/kamp_thaya_march.gpx';
new L.GPX(gpx, { async: true }, {
    //Polylinien stylen funktioniert noch nicht, marker ausschalten auch nicht
    polyline_options: [{
        color: `#76eec6`,
        opacity: 0.75,
        weight: 3
    }, {
        color: `#76eec6`,
        opacity: 0.75,
        weight: 3
    }]
}, {
    marker_options: {
        startIconUrl: false,
        endIconUrl: false,
        shadowUrl: false
    }
}).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.kampThayaMarch);

var gpx = './data/niederoesterreich/piestingtal.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.piestingtal);

var gpx = './data/niederoesterreich/thayarunde.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.thayarunde);

var gpx = './data/niederoesterreich/traisentalweg.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.traisental);

var gpx = './data/niederoesterreich/triesting_goelsental.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.triestingGoelsental);

var gpx = './data/niederoesterreich/triestingau.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.triestingau);

var gpx = './data/niederoesterreich/ybbstalradweg.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.ybbstal);

// Marker der größten Städte
const STAEDTE = [
    {
        title: "Eisenstadt",
        lat: 47.84651920035177,
        lng: 16.52731717127831,
        wikipedia: "https://de.wikipedia.org/wiki/Eisenstadt"//Links raus oder anpassen?
    },
    {
        title: "Neusiedl am See",
        lat: 47.94831935218377,
        lng: 16.850801413360713,
        wikipedia: "https://de.wikipedia.org/wiki/Neusiedl_am_See" //Links raus oder anpassen?
    },
    {
        title: "Oberwart",
        lat:47.29477213220548,
        lng: 16.200854006181853,
        wikipedia: "https://de.wikipedia.org/wiki/Oberwart"//Links raus oder anpassen?
    },
    {
        title: "Pinkafeld",
        lat: 47.374107766607914,
        lng: 16.123038801200657,
        wikipedia: "https://de.wikipedia.org/wiki/Pinkafeld"//Links raus oder anpassen?
    },
]

for (let stadt of STAEDTE) {
    //Marker für den Stopp
    let marker = L.marker([stadt.lat, stadt.lng])
        .addTo(map)
        .bindPopup(`${stadt.title} <br>
    <a href="${stop.wikipedia}">Wikipedia</a>
    `)
};

//Badeseen
const BADESEEN = [
    {
        title: "Neusiedler See", 
        lat: 47.861670077756585,
        lng: 16.766234356776703
    },
    {
        title: "Römersee", 
        lat: 47.76228947258584,
        lng: 16.346584741278356
    },
    {
        title: "Badeparadies Burg", 
        lat: 47.21698496322752,
        lng: 16.41073338918724
    },
    {
        title: "Naturbadesee Königsdorf", 
        lat: 47.00899491536701,
        lng: 16.16288813573165
    },
    {
        title: "Sonnensee Ritzing", 
        lat: 47.63005232247246, 
        lng: 16.470865861482007
    }
];

for (let badeseen of BADESEEN) {
    L.marker([badeseen.lat, badeseen.lng], {
        icon: L.icon({
            iconUrl: `icons/swimming.png`,
            popupAnchor: [0, -37],
            iconAnchor: [16, 37],
        })
    })
        .addTo(themaLayer.badeseen)
        .bindPopup(`<b>${badeseen.title}</b> <br>
    `)
};

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Instanz Leaflet MiniMap
var miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT.basemap"), {
    toggleDisplay: true,
    minimized: true
}
).addTo(map);

// Erstelle eine Basiskarten-Layer (z.B. OpenStreetMap)
var osm2 = new L.TileLayer(osmUrl, {
    minZoom: 0,
    maxZoom: 13,
    attribution: osmAttrib
});

// Füge die Basiskarte zur Karte hinzu
osm2.addTo(map);

// Erstelle eine Instanz der Minimap
var miniMap = new L.Control.MiniMap(osm2, {
    position: 'bottomright', // Positioniere die Minimap unten rechts
    width: '150px',
    height: '150px',
    toggleDisplay: true,
    zoomLevelOffset: -5
});

// Füge die Minimap zur Karte hinzu
miniMap.addTo(map);

//Geolocation
map.locate({
    setView: false,
    maxZoom: 16,
    watch: true,
});

let circle = L.circle([0, 0], 0).addTo(map);

map.on('locationfound', function (evt) {
    let radius = Math.round(evt.accuracy);
    L.circle(evt.latlng, radius).addTo(map);
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
}
);

var errorDisplayed = false;

map.on('locationerror', function (evt) {
    if (!errorDisplayed) {
        alert(evt.message);
        errorDisplayed = true;
    }
});

// //GPX-Track visualisieren -> Höhenprofile (es sind noch nicht alle)
// let controlElevation = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation.load("data/niederoesterreich/piestingtal.gpx");

// //GPX-Track visualisieren
// let controlElevation1 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation1.load("data/niederoesterreich/kamp_thaya_march.gpx")

// //GPX-Track visualisieren
// let controlElevation2 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation2.load("data/niederoesterreich/thayarunde.gpx")

// //GPX-Track visualisieren
// let controlElevation3 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation3.load("data/niederoesterreich/traisentalweg.gpx")

// //GPX-Track visualisieren
// let controlElevation4 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation4.load("triesting_goelsental.gpx")

// //GPX-Track visualisieren
// let controlElevation5 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation5.load("data/niederoesterreich/traisentalweg.gpx")

//Kommentare aus der start-Seite
/* Pulldownmenü Code
//Pulldown für Navigation
let pulldown = document.querySelector("#pulldown");
for (let etappe of ETAPPEN) {
    //console.log(etappe);
    let status = "";
    if (etappe.nr == "20") {
        status = "selected";
    }
    pulldown.innerHTML += `<option ${status} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.etappe}</option>`
}

// auf Änderungen im Pulldown reagieren
pulldown.onchange = function(evt) {
    //console.log(pulldown.value);
    let url = `https://${pulldown.value}.github.io/biketirol`;
    //console.log(url);
    window.location.href = url;
}
*/

