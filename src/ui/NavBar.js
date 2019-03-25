import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';

class NavBar extends Component {
    static propTypes = {
        venues: PropTypes.array.isRequired,
        onSelectRestaurant: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {
        let showingVenues
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingVenues = this.props.venues.filter((venue) => match.test(venue.venue.name))
        } else {
            showingVenues = this.props.venues
        }

        showingVenues.sort(sortBy('name'))

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">{this.props.logo}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ol className="navbar-nav mr-auto">
                            <ul className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Choose your Restaurant
                            </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {showingVenues.map((venue) => (
                                        <li key={venue.venue.id}>
                                            <a
                                                className={venue.venue.open ? "result-item opened" : "result-item"}
                                                onClick={() => this.props.onSelectRestaurant(venue.venue)}
                                                className="dropdown-item">{venue.venue.name}</a>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </ol>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;