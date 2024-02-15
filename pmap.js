var apikey = "ENTER_YOUR_OPENWEATHERMAP_APIKEY";
var map = L.map('map').setView([21.1498, 79.0821], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
var tlayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apikey}`);
// L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apikey}`).addTo(map);
tlayer.addTo(map);
// var marker = L.marker([23.24488113379337, 77.40809830864106]).addTo(map);
// var circle = L.circle([51.508, -0.11], {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 500
// }).addTo(map);
// var polygon = L.polygon([
//         [51.509, -0.08],
//         [51.503, -0.06],
//         [51.51, -0.047]]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
// var popup = L.popup()
//         .setLatLng([51.513, -0.09])
//         .setContent("I am a standalone popup.")
        // .openOn(map);

// function onMapClick(e) {
//         alert("You clicked the map at " + e.latlng);
// }

map.on('click', onMapClick);
var popup = L.popup();
var sel = document.getElementById("sllayer1");

function addUpdateParam(key, value) {
        const sparam = new URLSearchParams(window.location.search);
        sparam.set(key, value);
        const newRelativePathQuery = window.location.pathname + "?" + sparam.toString();
        history.pushState(null, "", newRelativePathQuery);
}
search_city.addEventListener("keypress", (e) => {
        if (e.key == "Enter")
                document.getElementById("srbt").click();
})
srbt.addEventListener("click", (e) => {
        let txtval = document.getElementById("search_city").value;
        console.log(txtval);
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${txtval}}&limit=5&appid=${apikey}`)
        .then(data => data.json())
        .then(data => cmap(data));
})
function cmap(data) {
        console.log(data);
        map.setView([data['0']["lat"], data["0"]["lon"]], 8);
        popup.setLatLng([data['0']["lat"], data["0"]["lon"]])
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data['0']["lat"]}&lon=${data["0"]["lon"]}&appid=${apikey}`)
        .then(data1 => data1.json())
        .then(data1 => diswth(data1));
}
function diswth(data, e) {
        popup
                // .setLatLng(e.latlng)
                .setContent(`${data["name"]}: ${(data["main"]["temp"] - 273.15).toFixed(2)}&deg;C (${data["weather"]["0"]["main"]}) <a href=\"index.html?city=${data["name"]}&lat=${data["coord"]["lat"]}&lon=${data["coord"]["lon"]}\">View in detail</a>`)
                .openOn(map);
        addUpdateParam("city", data["name"]);
        addUpdateParam("lat", data["coord"]["lat"]);
        addUpdateParam("lon", data["coord"]["lon"]);
}

function onMapClick(e) {
        // popup
        //         .setLatLng(e.latlng)
        //         .setContent("You clicked the map at " + e.latlng.toString())
        //         .openOn(map);
        popup.setLatLng(e.latlng)
        console.log(e.latlng);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng["lat"]}&lon=${e.latlng["lng"]}&appid=${apikey}`)
        .then(data1 => data1.json())
        .then(data1 => diswth(data1));
}

function rmap() {
        let val = sel.value;
        map.removeLayer(tlayer);
        tlayer = L.tileLayer(`https://tile.openweathermap.org/map/${val}/{z}/{x}/{y}.png?appid=${apikey}`);
        tlayer.addTo(map);
}

map.on('click', onMapClick);