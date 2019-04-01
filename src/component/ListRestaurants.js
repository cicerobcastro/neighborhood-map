import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

/* This component show list of Restaurants. */
class ListRestaurants extends Component {

    /* Open marker into the map. */
    openMarker = locationName => {
        this.props.markers.map(marker => {
            if (marker.title === locationName) {
                window.google.maps.event.trigger(marker, "click")
                marker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png')
            } else {
                marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png')
            }
        })
    }

    render() {
        return (
            <ListGroup>
                <ul className="list-group" >
                    {this.props.venues.map((myVenue) => (
                        <li role="menuitem"
                            onClick={() => this.openMarker(myVenue.venue.name)}
                            className="list-group-item"
                            tabIndex="0"
                            key={myVenue.venue.id}
                            id={myVenue.venue.id}
                            aria-label={myVenue.venue.name}
                        >
                            <a>{myVenue.venue.name}</a>
                        </li>))}
                </ul>
            </ListGroup>
        );
    }
}

export default ListRestaurants
