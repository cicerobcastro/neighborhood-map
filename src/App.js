import React, { Component } from 'react';
import NavBar from './component/NavBar';
import './App.css';
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp';
import ListRestaurants from './component/ListRestaurants'

class App extends Component {

  constructor(props) {
    super(props)

    /*State of my app*/
    this.state = {
      venues: [],
      markers: [],
      inVisibleMarkers: [],
      showVenues: []
    }
  }

  /* Is invoked immediately after a component is mounted. Call my method who get venues. */
  componentDidMount() {
    this.getVenues()
  }

  getVenues() {

    /* Call API of Foursquare and get all venues. */
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
          venues: response.data.response.groups[0].items,
          showVenues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("Error from API!!!" + error)
      })
  }

  //Load map
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBuAFQat2Xz08ijJHaXc9w15etZrBeVfhs&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {

    // Create the map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -15.8111593, lng: -47.9891185 },
      zoom: 12
    })

    // Create a InfoWindow
    const infowindow = new window.google.maps.InfoWindow()

    // Display dynamic markers
    this.state.venues.forEach(myVenue => {

      //receiving information of my restaurants
      const contentString = `<b>${myVenue.venue.name}</b> <br><i>${myVenue.venue.location.address}</i>`

      // if don't have address registred
      if (myVenue.venue.location.address === "undefined") {
        return "Address not found"
      }

      // Create A Marker if informations of venues
      var image = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      var marker = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name,
        icon: image
      })

      this.state.markers.push(marker)

      function openMarker() {

        // Setting the content
        infowindow.setContent(contentString)

        // Open InfoWindow
        infowindow.open(map, marker)
      }

      // Click on A Marker!
      marker.addListener('click', function (event) {
        openMarker()
      })
    })
  }

  /* Used to search restaurants */
  Query = query => {

    let filteredVenues
    let hiddenMarkers
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))

    /* Regex is used to match query with your respective venue. */
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filteredVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name)
      )
      this.setState({ venues: filteredVenues })
      hiddenMarkers = this.state.markers.filter(marker =>
        filteredVenues.every(myVenue =>
          myVenue.venue.name !== marker.title)
      )
      hiddenMarkers.forEach(marker =>
        marker.setVisible(false))
      this.setState({ hiddenMarkers })
    } else {
      this.setState({ venues: this.state.showVenues })
      this.state.markers.forEach(marker =>
        marker.setVisible(true))
    }
  }

  render() {
    const logo = "Restaurants"
    return (
      <div className="container row">
        <NavBar
          onSelectRestaurant={this.toggleResult}
          venues={this.state.venues}
          markers={this.state.markers}
          query={this.state.query}
          filteredVenues={this.filteredVenues}
          Query={q => this.Query(q)}
          logo={logo}
        />
        <div className="col-sm-4">
          <ListRestaurants
            venues={this.state.venues}
            markers={this.state.markers}
          />
        </div>
        <div className="col-sm-8">
          <div id="map"></div>
        </div>
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

