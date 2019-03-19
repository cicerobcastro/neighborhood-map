import React, { Component } from 'react'

class ListRestaurants extends Component {
    render() {
        console.log('Props', this.props)
        return (
            < ol className='restaurantsList' >

            </ol >
        )
    }
}

export default ListRestaurants