'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1Ijoic3N0YXZuc2JvIiwiYSI6ImNqc3B2ZzZ6dzExbnMzenN6MnJxc3k2NnQifQ.dXVkOTacJ1TBTFR9l9-0gA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [10.203094, 56.152422],
    zoom: 12
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})
map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})
let marker = new mapboxgl.Marker()
marker.setLngLat([10.200327, 56.148227])
marker.addTo(map)
let popup = new mapboxgl.Popup()
popup.setHTML('This is the best place to get burgers in Aarhus')
marker.setPopup(popup)
let data = [
    {
        location: [10.205780, 56.151270],
        content: 'This is my favourite cinema in Aarhus'
    },
    {
        location: [10.196907, 56.144682],
        content: 'During summer, there is a flea market here every sunday that I like to go to.'
    },
    {
        location: [ 10.208780, 56.157132],
        content: 'This is the best independent bookstore in Aarhus - I come here often'
    },
    {
        location: [10.209488, 56.155903],
        content: 'This is my favourite place to go for drinks with my friends'
    },
    ]
    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})