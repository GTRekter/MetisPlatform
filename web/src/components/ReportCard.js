import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ReportCard extends Component {
    render() {
        let gradientColor = "bg-gradient-dark"
        let shadowColor = "shadow-dark-dark" 
        if(this.props !== undefined && this.props.color !== null) {
            gradientColor = "bg-gradient-" + this.props.color 
            shadowColor = "shadow-dark-" + this.props.color
        }
        return (
            <div class="card">
                <div class="card-header p-3 pt-2">
                    <div className={`icon icon-lg icon-shape text-center border-radius-xl mt-n4 position-absolute ${gradientColor} ${shadowColor}`}>
                        <FontAwesomeIcon className='position-relative opacity-10' icon={this.props.icon} />
                    </div>
                    <div class="text-end pt-1">
                        <p class="text-sm mb-0 text-capitalize">{this.props.title}</p>
                        <h4 class="mb-0">{this.props.value}</h4>
                    </div>
                </div>
                {/* <hr class="dark horizontal my-0" />
                <div class="card-footer p-3">
                    <p class="mb-0">
                        <span class="text-success text-sm font-weight-bolder">+55% </span>than lask week
                    </p>
                </div> */}
            </div>
        )
    }
}