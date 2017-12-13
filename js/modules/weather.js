/* Weather.js
* */
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText);
            console.log(result);
            localStorage.localWeather = JSON.stringify(result);
            console.log(localStorage.localWeather);
            localStorage.localDate = result.date;
            callback(result);
        }
    };
    xhr.send();
}

function showWeather(result) {
    // result = JSON.parse(result);
    console.log(result);
    var list = result.data.forecast;
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    for (var i = 0; i < list.length; i++) {
        // var d = new Date(list[i].dt * 1000);
        table += '<tr>';
        table += '<td>' + list[i]['date'] + '</td>';
        table += '<td>' + list[i]['type'] + '</td>';
        table += '<td>' + list[i]['high'] + '</td>';
        table += '<td>' + list[i]['low'] + '</td>';
        // table += '<td>' + Math.round(list[i].temp.min - 273.15) + ' °C</td>';
        // table += '<td>' + Math.round(list[i].temp.max - 273.15) + ' °C</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}


var city = localStorage.city;
var localDate = localStorage.localDate;
city = city ? city : '杭州';
var nd = new Date();
var month = nd.getMonth() + 1 < 10 ? "0" + (nd.getMonth() + 1) : nd.getMonth() + 1;
var day = nd.getDate() < 10 ? "0" + nd.getDate() : nd.getDate();
var nowDate = '' + nd.getFullYear() + month + day;
console.log('NowDate: ' + nowDate+'   LocalDate: '+localDate);


if((localDate && localStorage.localWeather) && nowDate === localDate){
    console.log('Local Weather');
    showWeather(JSON.parse(localStorage.localWeather));
}else{
    var url = 'https://www.sojson.com/open/api/weather/json.shtml?city=' + city;
// http://tj.nineton.cn/Heart/index/all?city=CHZJ000000
    console.log('Get weather');
    httpRequest(url, showWeather);
}

