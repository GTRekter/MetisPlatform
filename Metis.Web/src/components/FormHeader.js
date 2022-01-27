import React, { Component } from 'react';

export default class FormHeader extends Component {
    render() {
        return (
            <div>
                <h3>
                    {this.props.title}
                    <small className="text-muted ps-2">{this.props.action}</small>
                </h3>
                <p className="form-text text-muted ms-1">{this.props.subtitle}</p>
            </div>
        )
    }
}