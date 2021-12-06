import React from "react"
import { Link } from "react-router-dom"

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/songs">Songs</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
        )
    }
}

export default Navbar

