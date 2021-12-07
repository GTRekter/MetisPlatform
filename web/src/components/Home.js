import React, { Component } from 'react';
import korea from '../images/korea.png';

import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-10 col-offset-2">
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <img src={korea} id="korea-img" className="img-fluid" alt="korea" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}