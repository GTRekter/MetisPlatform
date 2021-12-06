import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSpellCheck, faGlasses, faHome } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
    render() {
        return (
            <div className="container bg-dark">
                <div className="row align-items-start">
                    <div className="col text-center py-2">
                        <Link className="nav-link text-white" to='/'>
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </div>
                    <div className="col text-center py-2">
                        <Link className="nav-link text-white" to='/dictionary'>
                            <FontAwesomeIcon icon={faBook} />
                        </Link>
                    </div>
                    <div className="col text-center py-2">
                        <Link className="nav-link text-white" to='/reading'>
                            <FontAwesomeIcon icon={faGlasses} />
                        </Link>
                    </div>
                    <div className="col text-center py-2">
                        <Link className="nav-link text-white" to='/wordlist'>
                            <FontAwesomeIcon icon={faSpellCheck} />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}