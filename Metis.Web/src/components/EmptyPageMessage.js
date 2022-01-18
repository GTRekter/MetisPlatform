import React, { Component } from 'react';
import lost from '../images/lost.jpg';

export default class EmptyPageMessage extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xl-12 my-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <p class="h2">Whoops! It looks like you don't have anything here.</p>
                                <p class="h4">Contact your teacher to get assigner new words.</p>
                                <img src={lost} className="img-fluid" alt="lost" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}