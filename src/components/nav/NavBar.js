import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue bg-dark flex-md-nowrap p-0 strong shadow-lg">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">My Portfolio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/favDevs">My Favorite Devs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/devlist">DevList</Link>
                    </li>
                </ul>
                <Link className="btn btn-primary btn-lg" onClick={() => sessionStorage.clear()} to="/">Logout</Link>

            </nav>
        )
    }
}

export default NavBar
