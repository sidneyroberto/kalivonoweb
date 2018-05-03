import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import NovoTermo from './NovoTermo';
import Consulta from './Consulta';

class Menu extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                        <Link to="/consulta">
                            <span className="navbar-brand">Kalivonô Web - Admin</span>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/consulta">
                                        <span className="nav-link">Consultar termos</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/novo">
                                        <span className="nav-link">Novo termo</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br />
                    <Switch>
                        <Route name="consulta" path="/consulta" component={Consulta} />
                        <Route name="novo" path="/novo" component={NovoTermo} />
                        <Redirect from="/*" to="consulta" />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Menu;
