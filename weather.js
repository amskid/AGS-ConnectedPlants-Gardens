function getOnlineWeatherData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            document.getElementById("nhietdo").innerHTML = data.main.temp + "°C";
            document.getElementById("doam").innerHTML = data.main.humidity + "%";
            document.getElementById("icon-weather").src = "images/" + data.weather[0].icon + ".png";
            document.getElementById("desc-weather").innerHTML = data.weather[0].description;
            document.getElementById("update-weather").innerHTML = "lúc " + getCurrentTime();
        }
    }

    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?id="+hssCit+"&lang=vi&units=metric&appid="+hssAiD, true);
    xhttp.send();

}
var hssAiD = "a82bff7600d0b22c7ba8a2f96443cfb6";
var hssCit = "1581130";

//Hàm thực hiện gửi yêu cầu của client cứ 60s (= 60*1000ms) gửi 1 lần
setInterval(function () {
    getOnlineWeatherData();
}, 60 * 1000);

function getCurrentTime() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
        hours = d.getHours().toString().length == 1 ? '0' + hours : hours,
        ampm = d.getHours() >= 12 ? 'PM' : 'AM';
        months = d.getMonth() + 1;
    return hours + ':' + minutes + ' ' + ampm + ' ' + d.getDate() + '/' + months;
}