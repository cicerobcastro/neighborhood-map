import React, { Component } from 'react';
import Draggable from 'react-draggable';

/**
 * Draggable modal window with place details info
 */
class InfoWindow extends Component {
  render() {
    const { venues } = this.props;

    return (
    <Draggable>
      <article className='info-window' role='article' tabIndex='1'>
        <h2 className='info-name'>{venues.name}</h2>
        <p
          onClick={() => {this.props.hideInfoWindow()}}
          className='close-window'>X</p>
        <p className='info-category'>{venues.categories[0].name}</p>
        <p className='info-address'>{venues.location.address}, {venues.location.city}</p>
        {/* <p className='info-rating'>Rating: {venues.rating} ({venues.likes.summary})</p> */}
        {/* {venues.bestPhoto && (
          <img
            arial-label={venues.name}
            alt={venues.name}
            src={`${venues.bestPhoto.prefix}300x200${venues.bestPhoto.suffix}`}
            onDragStart={event => event.preventDefault()}></img>
        )} */}
        {/* <p className='attribution'>
          Data provided by <a target='_blank' href='https://foursquare.com'>Foursquare</a>
        </p> */}
      </article>
    </Draggable>
    )
  }
}

export default InfoWindow;