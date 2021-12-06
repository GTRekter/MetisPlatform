import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export class Layout extends Component {
    render() {
        return (
            <div>
                <div className="d-inline d-md-none">
                    <Header />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="d-none d-md-inline col-md-3 col-lg-2 bg-light sidebar">
                            <Sidebar />
                        </nav>
                        <main className="col offset-md-3 col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}