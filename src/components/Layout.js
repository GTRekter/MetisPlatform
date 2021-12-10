import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavbarVisible: false
        }
        this.onClickToggleNavbar = this.onClickToggleNavbar.bind(this);
    }
    onClickToggleNavbar = () => {
        this.setState({
            isNavbarVisible: !this.state.isNavbarVisible
        })
    }
    render() {     
        return (
            <div className={`g-sidenav-show ${this.state.isNavbarVisible ? 'g-sidenav-pinned' : ''}`}>
                <Sidebar />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <div className="container-fluid my-3">
                        <div className="row d-block d-sm-none">
                            <div className="col text-end">
                                <p className="text-md text-muted pointer" onClick={() => this.onClickToggleNavbar()}>
                                    <FontAwesomeIcon className='opacity-10' icon={faBars} />
                                </p>
                            </div>
                        </div>
                        {this.props.children}
                        <Footer />
                    </div>
                </main>
            </div>
        );
    }
}