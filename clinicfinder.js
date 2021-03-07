mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubm9yY2lubmEiLCJhIjoiY2treTltM2JzMDZhdzJ4cW5ra3pkNm50eSJ9.5MY9Wtm_GsEDsOAMTBXVOg';

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
            container: 'map',
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

    window.setInterval(function () {
        var destination_node = document.getElementById("mapboxgl-directions-destination-input");
        var html_content = destination_node.innerHTML;
        var text_content = destination_node.textContent;
        if (typeof text_content != null) { console.log(text_content); }
    }, 2000);
    
});

}

function show_map() {
    var map_div = document.getElementById("map");
    map_div.style.display = "block";
}


