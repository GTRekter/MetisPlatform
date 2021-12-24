import React, { Component } from 'react';

export default class ModalLayout extends Component {
  render() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.id} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="card card-plain">
              <div className="card-header pb-0 text-left">
                <h5>{this.props.title}</h5>
                <p className="mb-0">{this.props.subtitle}</p>
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}