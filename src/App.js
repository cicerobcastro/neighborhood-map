import React, { Component } from 'react';
import NavBar from './ui/NavBar';
import './App.css';
import axios from 'axios'
import ListRestaurants from './component/ListRestaurants'

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBuAFQat2Xz08ijJHaXc9w15etZrBeVfhs&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "5OP1LMG5HXWVRFA12KBPCMKX54HI05JZBMINB2BCNJTLM1PV",
      client_secret: "TNGEXFGQID4TDR3LC02ON5G4UJFRDUH5NIMUTFYQ5XRWNWQT",
      query: "food",
      near: "Brasília",
      v: "20190403"
    }


    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          venues2: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("Error from API!!!" + error)
      })
  }


  initMap = () => {

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -15.783284, lng: -47.8771351 },
      zoom: 11
    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.forEach(myVenue => {

      var content1 = `${myVenue.venue.name}`
      var content2 = `${myVenue.venue.location.address}`

      if (content2 === "undefined") {
        content2 = "Address not found"
      }


      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })


      // Click on A Marker!
      marker.addListener('click', function () {

        // Change the content
        infowindow.setContent(content1 + '<br>' + content2)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

    })
  }

  render() {
    const logo = "Welcome to Brasília"

    return (
      <div className="container">
        <NavBar logo={logo} />
        <ListRestaurants {...this.state.venues} />
        <div id="map"></div>
      </div>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
