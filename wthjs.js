// http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${apikey}
// http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=

// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// ChartDataLabels = require('chartjs-plugin-datalabels');


function updateChart() {
        xValues = [];
        yValues = [];
        for (let i = 0; i < weatherdataset2["list"].length-10; i++)
        {
                let time1 = weatherdataset2["list"][`${i}`]["dt_txt"];
                let timeutc = new Date(time1);
                timeutc = timeutc.getTime();
                let timeitc = new Date(timeutc);
                timeitc.setHours(timeitc.getHours() + 5);
                timeitc.setMinutes(timeitc.getMinutes() + 30);
                timeitc.getTime();
                time1 = new Date(timeitc);
                let s = time1.toString();
                s = s.slice(15,25);
                xValues.push(s);
                yValues.push((weatherdataset2["list"][`${i}`]["main"]["temp"] - 273.15).toFixed(2));
        }
        myChart["data"]["datasets"]["0"]["data"] = yValues;
        myChart["data"]["labels"] = xValues;
        // myChart["scales"]["y"]["max"] = Math.max(...yValues);
        // myChart["scales"]["y"]["min"] = Math.min(...yValues);
        // Chart.defaults.scales.linear.min = -10;
        myChart.options.scales.y.min = Math.min(...yValues)-10;
        myChart.options.scales.y.max = Math.max(...yValues)+10;
        myChart.update();
        console.log(myChart["data"]["datasets"]["0"]["data"]);
        console.log(myChart["data"]["labels"]);
        console.log(myChart)
        console.log(Chart["defaults"])
}

function createChart() {
        xValues = [];
        yValues = [];
        for (let i = 0; i < weatherdataset2["list"].length-10; i++)
        {
                let time1 = weatherdataset2["list"][`${i}`]["dt_txt"];
                let timeutc = new Date(time1);
                timeutc = timeutc.getTime();
                let timeitc = new Date(timeutc);
                timeitc.setHours(timeitc.getHours() + 5);
                timeitc.setMinutes(timeitc.getMinutes() + 30);
                timeitc.getTime();
                time1 = new Date(timeitc);
                let s = time1.toString();
                s = s.slice(15,25);
                xValues.push(s);
                yValues.push((weatherdataset2["list"][`${i}`]["main"]["temp"] - 273.15).toFixed(2));
        }
        console.log(xValues);
        console.log(yValues);
        myChart = new Chart("chart1", {
                plugins: [ChartDataLabels],
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              label: "Temperature",
              fill: false,
              lineTension: 0.4,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgb(255, 255, 255)",
              scaleFontColor: "#FFFFFF",
              data: yValues,
              datalabels: {
                anchor: "end",
                align: "end",
                offset: 0,
                font: {
                        size:20,
                        // color: "#d8d8d8"
                }
              }
            }]
          },
          options: {
            maintainAspectRatio: false,
            legend: {display: false},
            scales: {
                y: {
                        min: Math.min(...yValues)-10,
                        max: Math.max(...yValues)+10,
                        title: {
                                display: true,
                                text: "Temperature (in °C)",
                                font: {
                                        size: 20
                                },
                                color: "#d8d8d8"
                        },
                        ticks: {
                                font: {
                                        size: 20,
                                },
                                        color: "#d8d8d8"

                        },
                        grid: {
                                color: "#d8d8d8"
                        }
                },
                x: {
                        title:{
                                display: true,
                                text: "Time (IST)",
                                font: {
                                        size: 20
                                },
                                color: "#d8d8d8"
                        },
                        grid: {
                                color: "#d8d8d8"
                        },
                        ticks: {
                                color: "#d8d8d8"
                        }
                }
        //       yAxes: [{ticks: {min: 6, max:16}}],
            },
            plugins: {
                datalabels: {
                        color: "#d8d8d8"
                }
            }
          }
        });
        Chart.defaults.color = "#d8d8d8";
}

function showChart() {
        if (charbool == 0) {
                tdweather1.style.display = "none";
                tdweather2.style.display = "none";
                tdweather3.style.display = "none";
                tdweather4.style.display = "none";
                wchart.style.display = "block";
                document.getElementById("wchart").style.animation = "tdweather5anim 1s";
                charbool = 1;
                createChart();
        }
        else if (charbool == 1) {
                tdweather1.style.display = "flex";
                tdweather2.style.display = "flex";
                tdweather3.style.display = "flex";
                tdweather4.style.display = "flex";
                document.getElementById("wchart").style.animation = "visuallyhide 1s";
                setTimeout(function() {
                        wchart.style.display = "none";
                }, 1000);
                charbool = 0;
                myChart.destroy();
                console.log("chart1 destroyed");
        }
        // const xValues = [50,60,70,80,90,100,110,120,130,140,150];
        // const yValues = [7,8,8,9,9,9,10,11,14,14,15];
        // const xValues = weatherdataset2["list"]["0"]["dt_txt"];
        // const yValues = weatherdataset2["list"]["0"]["main"]["temp"];

        // let tdweather1 = document.getElementById("tdweather1");
        // let tdweather2 = document.getElementById("tdweather2");
        // let tdweather3 = document.getElementById("tdweather3");
        // let tdweather4 = document.getElementById("tdweather4");
        console.log(charbool);
}

function addUpdateParam(key, value) {
        let sparam = new URLSearchParams(window.location.search);
        sparam.set(key, value);
        const newRelativePathQuery = window.location.pathname + "?" + sparam.toString();
        history.pushState(null, "", newRelativePathQuery);
}

function initfunc(data, city1lat, city1lon) {
        console.log(data["0"]["name"]);
        srdcityname.innerHTML = (data["0"]["name"]["0"]).toUpperCase() + (data["0"]["name"]).slice(1,);
        addUpdateParam("lat", city1lat);
        addUpdateParam("lon", city1lon);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city1lat}&lon=${city1lon}&appid=${apikey}`)
        .then(data1 => data1.json())
        .then(data1 => setinfo(data1, city1lat, city1lon));
}

function setinfo(data, citylan, citylon) {
        weatherdataset1 = data;
        addUpdateParam("lat", data["coord"]["lat"]);
        addUpdateParam("lon", data["coord"]["lon"]);
        console.log("setinfo: ", data);
        srdcityname.innerHTML += " (" + data["name"] + ")";
        srdcitytemp.innerHTML = (data["main"]["temp"] - 273.15).toFixed(2) + "&deg;C";
        srdcityfeelslk.innerHTML = "Feels like " + (data["main"]["feels_like"] - 273.15).toFixed(2) + "&deg;C";
        srdcitywmain.innerHTML = data["weather"]["0"]["main"];
        var sunr_dobj = new Date(null);
        sunr_dobj.setTime(data["sys"]["sunrise"] * 1000);
        srs.innerHTML = (new Date(sunr_dobj.getTime())).toString().slice(15, 25) + "(IST)";
        var suns_dobj = new Date(null);
        suns_dobj.setTime(data["sys"]["sunset"] * 1000);
        sst.innerHTML = (new Date(suns_dobj.getTime())).toString().slice(15, 25) + "(IST)";
        humidityval.innerHTML = data["main"]["humidity"] + "%";
        pressureval.innerHTML = data["main"]["pressure"] + "hPa";
        let wicn = data["weather"]["0"]["icon"];
        rwicon.innerHTML = `<img class=\"hr_time_icon\" src=\"http://openweathermap.org/img/wn/${wicn}@2x.png\" alt=\"\">`;
        feelslikeval.innerHTML = (data["main"]["feels_like"] - 273.15).toFixed(2) + "&deg;C";
        weatherdsval.innerHTML = data["weather"]["0"]["description"];
        windspeedval.innerHTML = (data["wind"]["speed"] * 3.6).toFixed(2) + "km/h";
        winddegreeval.innerHTML = data["wind"]["deg"] + "&deg;";
        let windguststr = data["wind"]["gust"];
        if (isNaN(windguststr))
                windgbool = 0;
        if (windgbool == 1)
                windgustval.innerHTML = (data["wind"]["gust"] * 3.6).toFixed(2) + "km/h";
        console.log(windgbool)
        templhval.innerHTML = (data["main"]["temp_min"] - 273.15).toFixed(2) + "&deg;C / " + (data["main"]["temp_max"] - 273.15).toFixed(2) + "&deg;C";
        cldnval.innerHTML = data["clouds"]["all"] + "%";
        visval.innerHTML = parseFloat(data["visibility"] / 1000) + "Km";
        let bgimg = document.getElementById("bg");
        let icn = data["weather"]["0"]["icon"];
        if (icn == "01d")
        bgimg.src = "bg/clearskyd.jpg";
        if (icn == "01n")
                bgimg.src = "bg/clearskyn.jpg";
        if (icn == "02d" || icn == "03d" || icn == "04d")
                bgimg.src = "bg/cloudsd.jpg";
        if (icn == "02n" || icn == "03n" || icn == "04n")
                bgimg.src = "bg/cloudsn.jpg";
        if (icn == "09d" || icn == "10d")
                bgimg.src = "bg/raind.jpg";
        if (icn == "09n" || icn == "10n")
                bgimg.src = "bg/rainn.jpg";
        if (icn == "11d" || icn == "11n")
                bgimg.src = "bg/thunder.jpg";
        if (icn == "13d")
                bgimg.src = "bg/snowd.jpg";
        if (icn == "13n")
                bgimg.src = "bg/snown.jpg";
        if (icn == "50d")
                bgimg.src = "bg/mistd.jpg";
        if (icn == "50n")
        bgimg.src = "bg/mistn.jpg";
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${citylan}&lon=${citylon}&appid=${apikey}`)
        .then(data1 => data1.json())
        .then(data1 => setinfo2(data1, citylan, citylon));
}

function setinfo2(data, city1lat, city1lon) {
        weatherdataset2 = data;
        console.log(data);
        if (windgbool == 0)
                windgustval.innerHTML = (data["list"]["0"]["wind"]["gust"] * 3.6).toFixed(2) + "km/h";;
        popval.innerHTML = data["list"]["0"]["pop"];
        // let podstr = data["list"]["0"]["sys"]["pod"];
        // if (podstr == "d") {
        //         podval.innerHTML = "Day";
        //         dayticon.innerHTML = "<svg class = \"wicon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"80\" viewBox=\"0 -960 960 960\" width=\"80\"><path d=\"M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z\"/></svg>";
        // }
        // else {
        //         podval.innerHTML = "Night";
        //         dayticon.innerHTML = "<svg class = \"wicon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"80\" viewBox=\"0 -960 960 960\" width=\"80\"><path d=\"M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z\"/></svg>";
        // }
        dayticon.innerHTML = "<svg class = \"wicon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"80\" viewBox=\"0 -960 960 960\" width=\"80\"><path d=\"M550-280q20 0 39-8t33-22l39-39-42-42-39 39q-6 6-14 8.5t-16 2.5q-8 0-16-2.5t-14-8.5l-38-38q-14-14-33-21.5t-39-7.5q-20 0-39 7.5T338-390l-39 39 42 42 39-39q6-6 14-8.5t16-2.5q8 0 16 2.5t14 8.5l38 38q14 14 33 22t39 8Zm0-120q20 0 39-8t33-22l39-39-42-42-39 39q-6 6-14 8.5t-16 2.5q-8 0-16-2.5t-14-8.5l-38-38q-14-14-33-21.5t-39-7.5q-20 0-39 7.5T338-510l-39 39 42 42 39-39q6-6 14-8.5t16-2.5q8 0 16 2.5t14 8.5l38 38q14 14 33 22t39 8Zm0-120q20 0 39-8t33-22l39-39-42-42-39 39q-6 6-14 8.5t-16 2.5q-8 0-16-2.5t-14-8.5l-38-38q-14-14-33-21.5t-39-7.5q-20 0-39 7.5T338-630l-39 39 42 42 39-39q6-6 14-8.5t16-2.5q8 0 16 2.5t14 8.5l38 38q14 14 33 22t39 8ZM160-160v-480l320-240 320 240v480H160Zm80-80h480v-360L480-780 240-600v360Zm240-270Z\"/></svg>";
        // let weathercards = document.getElementById("tdweather1cards");
        tdweather1cards.innerHTML = "";
        // tdweather1cards.innerHTML += `<div class=\"tdhrcard\"><span class=\"hrtime\">${data["list"]["0"]["dt_txt"]}</span><br><span><img class=\"hr_time_icon\" src=\"http://openweathermap.org/img/w/10d.png\" alt=\"\"></span><br><span class=\"hr_time_temp\">hr_time_temp</span></div>`;
        for (let i = 0; i < 40; i++)
        {
                // let time1 = data["list"][`${i}`]["dt_txt"].slice(11, 13);
                let time1 = data["list"][`${i}`]["dt_txt"];
                let timeutc = new Date(time1);
                timeutc = timeutc.getTime();
                let timeitc = new Date(timeutc);
                timeitc.setHours(timeitc.getHours() + 5);
                timeitc.setMinutes(timeitc.getMinutes() + 30);
                timeitc = timeitc.getTime();
                time1 = new Date(timeitc);
                let s = time1.toString();
                s = s.slice(15, 25) + "\n(IST)";
                // if (parseInt(time1) == 0)
                //         time1 = 12 + "am";
                // else if (parseInt(time1) > 12)
                // {
                //         time1 -= 12;
                //         time1 = time1 + "pm";
                // }
                // else if (parseInt(time1) == 12)
                //         time1 += "pm";
                // else
                //         time1 = data["list"][`${i}`]["dt_txt"].slice(12, 13) + "am";
                let t = (data["list"][`${i}`]["main"]["temp"] - 273.15).toFixed(2);
                let icn = data["list"][`${i}`]["weather"]["0"]["icon"];
                tdweather1cards.innerHTML += `<div class=\"tdhrcard\"><span class=\"hrtime\">${s}</span><br><span><img class=\"hr_time_icon\" src=\"http://openweathermap.org/img/wn/${icn}@2x.png\" alt=\"\"></span><br><span class=\"hr_time_temp\">${t}&deg;C</span></div>`;
        }
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${city1lat}&lon=${city1lon}&appid=${apikey}`)
        .then(data2 => data2.json())
        .then(data2 => setinfo3(data2));
}

function setinfo3(data) {
        console.log("AQI:",data);
        podval.innerHTML = data["list"]["0"]["main"]["aqi"];
        let aqival = data["list"]["0"]["main"]["aqi"];
        if (aqival == "1")
                podval.innerHTML = "Good";
        else if (aqival == "2")
                podval.innerHTML = "Fair";
        else if (aqival == "3")
                podval.innerHTML = "Moderate";
        else if (aqival == "4")
                podval.innerHTML = "Poor";
        else if (aqival == "5")
                podval.innerHTML = "Very Poor";
        if (charbool == 1)
                updateChart();
}

function printcityname(data) {
        var srdcitylat = data[0]["lat"];
        var srdcitylon = data[0]["lon"];
        // console.log(data);
        // console.log(srdcitylat, srdcitylon);
        console.log("city: ", data);
        srdcityname.innerHTML = (data["0"]["name"]["0"]).toUpperCase() + (data["0"]["name"]).slice(1,);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${srdcitylat}&lon=${srdcitylon}&appid=${apikey}`)
        .then(data1 => data1.json())
        .then(data1 => setinfo(data1, srdcitylat, srdcitylon));
}

// fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${apikey}`)
// .then(data => data.json())
// .then(data => setinfo(data));

var city1 = "Delhi";
var windgbool = 1;
var weatherdataset1;
var weatherdataset2;
var charbool = 0;
var myChart;
const initParam = new URL(window.location.href).searchParams;
let p1 = initParam.get("city");
var initlat = initParam.get("lat");
var initlon = initParam.get("lon");
var xValues = [];
var yValues = [];
var apikey = "ENTER_YOUR_OPENWEATHERMAP_APIKEY";

console.log(p1);
if (p1 == null) {
        addUpdateParam("city", "Delhi");
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city1}}&limit=5&appid=${apikey}`)
                .then(data => data.json())
                .then(data => initfunc(data, data[0]["lat"], data[0]["lon"]));
}
else {
        addUpdateParam("city", p1);
        srdcityname.innerHTML = p1[0].toUpperCase() + p1.slice(1,);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${initlat}&lon=${initlon}&appid=${apikey}`)
                .then(data => data.json())
                .then(data => setinfo(data, initlat, initlon));
}


srbt.addEventListener("click", (e) => {
        let cityname = document.getElementById("search_city").value;
        addUpdateParam("city", cityname);
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}}&limit=5&appid=${apikey}`)
        .then(data => data.json())
        .then(data => printcityname(data));
})
search_city.addEventListener("keypress", (e) => {
        if (e.key == "Enter")
                document.getElementById("srbt").click();
})