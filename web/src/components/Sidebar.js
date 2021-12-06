import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSpellCheck, faGlasses, faHome } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css';

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item mt-0">
                            <Link className="nav-link" to='/'>
                                <FontAwesomeIcon icon={faHome} />
                                <span className="px-1 d-none d-md-inline">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item mt-0">
                            <Link className="nav-link" to='/dictionary'>
                                <FontAwesomeIcon icon={faBook} />
                                <span className="px-1 d-none d-md-inline">Dictionary</span>
                            </Link>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted d-none d-md-inline">
                        <span className="">Exercises</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item mt-0">
                            <Link className="nav-link" to='/reading'>
                                <FontAwesomeIcon icon={faGlasses} />
                                <span className="px-1 d-none d-md-inline">Reading</span>
                            </Link>
                        </li>
                        <li className="nav-item mt-0">
                            <Link className="nav-link" to='/wordlist'>
                                <FontAwesomeIcon icon={faSpellCheck} />
                                <span className="px-1 d-none d-md-inline">Writing</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}