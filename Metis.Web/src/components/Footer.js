import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer py-4">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © 2021,
                                made with <FontAwesomeIcon className='opacity-10' icon={faHeart} /> by 
                                <a href="https://ivanporta.net/" rel="noreferrer" className="font-weight-bold text" target="_blank"> Ivan Porta</a>.
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="https://gtrekter.medium.com" rel="noreferrer" className="nav-link text-muted" target="_blank">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}