import React, { Component } from 'react';
import korea from '../images/korea.png';

import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-10 col-offset-2">
                        <div class="position-absolute top-50 start-50 translate-middle">
                            <img src={korea} id="korea-img" className="img-fluid" alt="korea" />
                        </div>
                    </div>
                </div>
                <div className="text-center text-white">
                    <h1>Welcome to this Demo</h1>
                    <p className="lead">Cypress</p>
                </div>
            </div>
        )
    }
}