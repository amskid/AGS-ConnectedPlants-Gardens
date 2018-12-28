var lichTuoi = [];
var tuoiDuration = [];
function getLastTimeWatering() {
    var hours,minutes,seconds = 0; 
    var ampm = "";
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //hien thi thong tin lan tuoi nuoc cuoi cung
                if (this.responseText == "0") {
                    document.getElementById("lastWatering").innerHTML = "Không có thông tin lần tưới cuối !";
                }
                else {
                    //hien thi thong tin lan tuoi nuoc cuoi cung
                    [hours,minutes,seconds,ampm] = formatTime(this.responseText);
                    document.getElementById("lastWatering").innerHTML = "Lần tưới cuối cùng: "+hours+":"+minutes+" "+ampm;
                }
            }
        }
    xmlhttp.open("GET", "getLastWater", true);
    xmlhttp.send();
}
function saveLastTimeWatering() {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //thay doi thong tin trong file txt
                if (this.responseText == "0") {
                    document.getElementById("lastWatering").innerHTML = "Lần tưới cuối cùng: Chưa lưu";
                }
                else {
                    //hien thi thong tin lan tuoi nuoc cuoi cung
                    [hours,minutes,seconds,ampm] = formatTime(this.responseText);
                    document.getElementById("lastWatering").innerHTML = "Lần tưới cuối cùng: "+hours+":"+minutes+" "+ampm;
                }
            }
        }
    xhttp.open("GET", "saveLastWater", true);
    xhttp.send();    
}
function hienThiLichTuoi() {
    var hours,minutes,d = 0;
    //get the list, remove all existing items
    var orderedList = document.getElementById("list-hengio");
    orderedList.innerHTML = "";
    if (lichTuoi.length == 0) {
        var innerText = document.createTextNode("Hiện tại không có lịch tưới tự động nào.");
        var listItem = document.createElement("li");
        listItem.appendChild(innerText);
        orderedList.appendChild(listItem);
        var listItem2 = document.createElement("li");
        orderedList.appendChild(listItem2);
        document.getElementById("btn-huytat").disabled = true;
        return;
    } else {
        document.getElementById("btn-huytat").disabled = false;
    }

    for (var i = 0; i < lichTuoi.length; i++) {
        [hours,minutes,seconds,ampm] = formatTime(lichTuoi[i]);
        d = tuoiDuration[i];
        d = (d <60) ? d.toString() + " giây" : (d/60).toString() +" phút"; 
        
        var innerText = document.createTextNode((i+1)+" - "+hours+":"+minutes+" "+ampm+" trong "+d);
        var innerButton = document.createElement("button");
        innerButton.classList.add("btn","huy-hengio","color5","right");
        innerButton.innerHTML = "&cross;";
        innerButton.id = "btn-huy-hengio-so-"+i;
        innerButton.onclick = function() { huyHenGioTuoi(i); };
        
        //create the list item and append text and button to it       
        var listItem = document.createElement("li");
        listItem.appendChild(innerText);
        listItem.appendChild(innerButton);
        //append list item to the pre-created ordered-list
        orderedList.appendChild(listItem);
        var listItem2 = document.createElement("li");
        orderedList.appendChild(listItem2);
    }
}
function formatTime(strTime) {
    var t,h,hours,m,s,seconds = 0;
    t = strTime;
    h = (t-t%3600)/3600;
    m = (t%3600 - (t%3600)%60)/60;
    s = t-h*3600-m*60;
    // m = ((t-seconds)/60)%60; //minutes
    // h = ((t-seconds)/60 - m)/60; //hours
    hours = (h>12) ? h-12 : h;
    hours = (hours<10) ? "0" + hours.toString() : hours.toString();
    minutes = (m<10) ? "0"+m.toString() : m.toString();
    seconds = (s<10) ? "0"+s.toString() : s.toString();
    var ampm = (h>=12) ? "PM" :"AM"; 
    return [hours,minutes,seconds,ampm];
}
function getLichTuoi() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {           
            //convert string tra to an int array then split into 2 arrays
            console.log(this.responseText);
            arrayLichTuoiDuration = this.responseText.split(',').map(Number);
            var l = arrayLichTuoiDuration.length / 2;
            lichTuoi = arrayLichTuoiDuration.slice(0, l);
            tuoiDuration = arrayLichTuoiDuration.slice(l, l * 2);
            lichTuoi = removeZero(lichTuoi.toString());
            tuoiDuration = removeZero(tuoiDuration.toString());
        }
    }
    xhttp.open("GET", "getLichTuoi", true);
    xhttp.send();
}
function removeZero(arrayName) {
    var strArrayToStr = arrayName.toString().replace(/,0/g,"");
    return (strArrayToStr == "0") ? [] : strArrayToStr.split(',').map(Number);
}
function startOnLoad() {
    getLichTuoi();
    getOnlineWeatherData();
    getLastTimeWatering();
    loadThoiGianChoComboBox();
    bomCheck();
    getIP();  
}
function getIP() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("currentIP").innerHTML = "IP: " + this.responseText;
        }
    }
    xhttp.open("GET", "getIP", true);
    xhttp.send();  
}