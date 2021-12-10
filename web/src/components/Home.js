import React, { Component } from 'react';
import korea from '../images/korea.png';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body text-center">
                                <img src={korea} id="korea-img" className="img-fluid" alt="korea" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}