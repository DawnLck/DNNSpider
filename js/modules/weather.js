function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

function showWeather(result) {
    result = JSON.parse(result);
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
city = city ? city : '杭州';
// var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',china&lang=zh_cn';
var url = 'https://www.sojson.com/open/api/weather/json.shtml?city=' + city;
httpRequest(url, showWeather);