mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubm9yY2lubmEiLCJhIjoiY2treTltM2JzMDZhdzJ4cW5ra3pkNm50eSJ9.5MY9Wtm_GsEDsOAMTBXVOg';
//XMLHttpRequest.setRequestHeader('Access-Control-Allow-Origin', 'https://screeningchatbot.z13.web.core.windows.net');

let destination_node;
//get current users location with the Geolocation API
if (!navigator.geolocation){
    console.log('error loading geolocation API');
}
else {
    navigator.geolocation.getCurrentPosition(success_location, error_location, {
        enableHighAccuracy: true
});

}
// if the position of the user is successfully obtained, log it and set the map up with their coordinates
function success_location(position) {
    console.log(position);
    setup_map([position.coords.longitude, position.coords.latitude]);
}
function error_location() {
    console.log('error finding location');
}
function setup_map(center) {
        map = new mapboxgl.Map({
            container: document.getElementById("right_side").getElementsByClassName("map")[0],
            style: 'mapbox://styles/mapbox/streets-v11', 
            center: center,
            maxBounds: [[-180, -85], [180, 85]],
            zoom: 15
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    const directions = new MapboxDirections({
        accessToken : mapboxgl.accessToken

    });

    directions.setOrigin([center[0], center[1]]);
    console.log('origin set to: ' + center[0] + ' ' + center[1]);
    map.addControl(directions, 'top-left');
    map.on('load', function () {
    //execute this code every 2 seconds
    window.setInterval(function () {
        destination_node = document.getElementById("mapboxgl-directions-destination-input");
        var html_content = destination_node.innerHTML;
        var text_content = destination_node.textContent;
        if (typeof text_content != null) { console.log(text_content); }
    }, 2000);
    
});

}

function show_map() {
    /*
    var map_div = document.getElementById("map");
    map_div.style.display = "inline-block";
    var textbox = document.getElementById("user_time");
    textbox.style.display = "inline-block";
//    textbox.setAttribute("type", "text");
    var output = document.getElementById("output");
    output.style.display = "inline-block";
//    output.setAttribute("type", "text");
//    */

    var right_side = document.getElementById("right_side");
    right_side.style.display = "block";
    var textbox = right_side.getElementsByClassName("user_time")[0];
    textbox.addEventListener("keydown", function (e) {
        if (e.code === "Enter") retrieve_data(e);
    });
}
//this function handles sending the AJAX request for calling the python script
function http_get(url, callback) {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.setRequestHeader('Access-Control-Allow-Origin', 'https://screeningchatbot.z13.web.core.windows.net');
    request.onload = function() {
        callback(request);
    };
    request.send();
}
//once the times that work for the user are retrieved, pass this to the python script to determine
//a doctor that can see them at one of those times.
//the return value for this function is a string that represents TIME. e.g. 6:30 PM
function retrieve_data(e) { 
    var data_rec = e.target.value;
    console.log(data_rec);
    var output_box = document.getElementById("right_side").getElementsByClassName("output")[0];
    //note; this is example output, this will be changed later to the http_request 
    output_box.value = "Dr. Shepherd at St. Mary's Health Center is available at " + data_rec + " to see you! Appointment successfully scheduled for " + data_rec;
/*    http_get('https://screeningchatbot.z13.web.core.windows.net/schedule.py', function(request) {
      console.log(request.responseText);  
    });
    */

}


