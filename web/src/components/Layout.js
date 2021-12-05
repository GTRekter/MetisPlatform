import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-2 col-sm-3 col-md-3 col-lg-2 bg-light sidebar">
                            <Sidebar />
                        </nav>
                        <main className="col offset-2 col-sm-9 col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}