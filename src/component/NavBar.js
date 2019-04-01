import React, { Component } from 'react';

/* This component is the SearchBar with "Logo" */
class NavBar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p className="navbar-brand">{this.props.logo}</p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 search">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.props.query} onChange={(event) => this.props.updateQuery(event.target.value)} />
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;
