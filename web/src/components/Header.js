import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSpellCheck, faGlasses, faHome } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
    render() {
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                {/* <p className="navbar-brand col-md-3 col-lg-2 me-0 px-3">&nbsp;</p> */}
                {/* <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 text-center px-5 py-2">
                            <Link className="nav-link text-white" to='/'>
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                        </div>
                        <div className="col-3 text-center px-5 py-2">
                            <Link className="nav-link text-white" to='/dictionary'>
                                <FontAwesomeIcon icon={faBook} />
                            </Link>
                        </div>
                        <div className="col-3 text-center px-5 py-2">
                            <Link className="nav-link text-white" to='/reading'>
                                <FontAwesomeIcon icon={faGlasses} />
                            </Link>
                        </div>
                        <div className="col-3 text-center px-5 py-2">
                            <Link className="nav-link text-white" to='/wordlist'>
                                <FontAwesomeIcon icon={faSpellCheck} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}