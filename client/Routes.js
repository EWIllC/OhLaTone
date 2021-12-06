import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Songs from "./components/Songs";
import SingleSong from "./components/SingleSong";
import AddSong from "./components/AddSong";
import Contact from "./components/Contact";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Home} />
                <Route exact path="/songs" component={Songs} />
                <Route path="/songs/:songId" component={SingleSong}></Route>
                <Route path="/addSong" componenr={AddSong}></Route>
                <Route path="/contact" component={Contact}/>
                <Redirect to="/home" />
            </Switch>
        )
    }
}

export default Routes