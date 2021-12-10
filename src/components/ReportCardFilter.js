import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ReportCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false
        }
        this.onOptionChange = this.onOptionChange.bind(this);
    }
    onOptionChange = (element) => {
        var value = element.target.getAttribute("data-value");
        this.props.onOptionChangeCallback(value);
    };
    capitalizeFirstLetter = (string) => {
        if (string !== undefined && string.length > 0) {
            return string.replace(/^\w/, (c) => c.toUpperCase());
        }
    }
    render() {
        let gradientColor = "bg-gradient-dark"
        let shadowColor = "shadow-dark-dark" 
        if(this.props !== undefined && this.props.color !== null) {
            gradientColor = "bg-gradient-" + this.props.color 
            shadowColor = "shadow-dark-" + this.props.color
        }
        let options = [];
        options.push(<li key="0"><span className="dropdown-item pointer" data-value="" onClick={(element) => this.onOptionChange(element)}>All</span></li>);
        if(this.props.options !== undefined && this.props.options.length > 0) {
            for (let index = 0; index < this.props.options.length; index++) {
                options.push(<li key={index + 2}><span className="dropdown-item pointer" data-value={this.props.options[index]} onClick={(element) => this.onOptionChange(element)}>{this.capitalizeFirstLetter(this.props.options[index])}</span></li>);
            }
        }
        return (
            <div className="card">
                <div className="card-header p-3 pt-2">
                    <div className={`icon icon-lg icon-shape text-center border-radius-xl mt-n4 position-absolute ${gradientColor} ${shadowColor}`}>
                        <FontAwesomeIcon className='position-relative opacity-10' icon={this.props.icon} />
                    </div>
                    <div className="text-end pt-1">
                        <p className="text-sm mb-0 text-capitalize">{this.props.title}</p>
                        <h4 className="mb-0">{this.props.value}</h4>
                    </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                    <div className="dropdown">
                        <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> 
                            <span className="mb-0">Click to change {this.props.title} </span> 
                        </div>
                        <ul className="dropdown-menu">
                            {options}
                        </ul>
                    </div>
                    {/* <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">+55% </span>than lask week
                    </p> */}
                </div>
            </div>
        )
    }
}