import React, { Component } from 'react'

function ListRestaurants(props) {
    console.log('Props', props)
    return (
        <ol className='restaurantsList'>
             {props.venues.map((venue) => (
                    <li key={venue.venue.id} >
                        {venue.name}
                    </li>
                ))} 
        </ol>
    )
}

export default ListRestaurants