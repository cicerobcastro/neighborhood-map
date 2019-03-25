import React, { Component } from 'react';
import NavBar from './ui/NavBar';
import './App.css';
import axios from 'axios'
//import InfoWindow from './component/InfoWindow'

class App extends Component {

  state = {
    venues: []
  }


  //is invoked immediately after a component is mounted
  componentDidMount() {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "5OP1LMG5HXWVRFA12KBPCMKX54HI05JZBMINB2BCNJTLM1PV",
      client_secret: "TNGEXFGQID4TDR3LC02ON5G4UJFRDUH5NIMUTFYQ5XRWNWQT",
      query: "food",
      near: "Brasília",
      v: "20191903",
      limit: 10
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("Error from API!!!" + error)
      })
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBuAFQat2Xz08ijJHaXc9w15etZrBeVfhs&callback=initMap")
    window.initMap = this.initMap
  }


  initMap = () => {

    // Create a map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -15.8111593, lng: -47.9891185 },
      zoom: 12
    })

    // Create a InfoWindow
    const infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.forEach(myVenue => {

      var content1 = `${myVenue.venue.name}`
      var content2 = `${myVenue.venue.location.address}`

      if (content2 === "undefined") {
        content2 = "Address not found"
      }

      // Create A Marker
      var image = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      var marker = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name,
        icon: image
      })

      // Click on A Marker!
      marker.addListener('click', function (event) {

        //marker.setIcon(event.icon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png')

        // Change the content
        infowindow.setContent(content1 + '<br>' + content2)

        // Open An InfoWindow
        //infowindow.open(map, marker)

        function isInfoWindowOpen(infoWindow) {
          var map = infoWindow.getMap();
          return (map !== null && typeof map !== "undefined");
        }

        if (isInfoWindowOpen(infowindow)) {
          // do something if it is open
          infowindow.close(map,marker)
          marker.clicked(event.icon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png')       
        } else {
          marker.setIcon(event.icon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png') 
          infowindow.open(map, marker)
        }

      })
    })
  }

  toggleResult = (myVenue) => {
    // debugger
    // var open = new windows.google.maps.Marker({

    // })
    this.setState((currentVenue) => ({
      venues: currentVenue.myVenue.map(c =>
        ({ ...c, open: !myVenue.open && c.name === myVenue.name }))
    }));
  }

  render() {

    const logo = "Welcome to Brasília"
    return (
      <div className="container">
        <NavBar onSelectRestaurant={this.toggleResult} venues={this.state.venues} logo={logo} />
        {/* <InfoWindow venues={this.state.venues} /> */}
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
