import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'

export default class Sidebar extends Component {
    render() {
        return (
                <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
                    <div className="collapse navbar-collapse w-auto max-height-vh-100 mt-4" id="sidenav-collapse-main">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon className='opacity-10' icon={faHome} />
                                    </div>
                                    <span className="nav-link-text ms-1">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item mt-3">
                                <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Admin</h6>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/usermanagement'>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon className='opacity-10' icon={faUsers} />
                                    </div>
                                    <span className="nav-link-text ms-1">Users</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/lessonmanagement'>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon className='opacity-10' icon={faUsers} />
                                    </div>
                                    <span className="nav-link-text ms-1">Lessons</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/wordmanagement'>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon className='opacity-10' icon={faUsers} />
                                    </div>
                                    <span className="nav-link-text ms-1">Words</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
        )
    }
}