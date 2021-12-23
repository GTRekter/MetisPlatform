import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont } from '@fortawesome/free-solid-svg-icons'

export default class FormLayout extends Component {
  render() {
    return (
      <div className="py-4">
        <div className="card">
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape bg-gradient-dark shadow text-center border-radius-xl mt-n4 me-3 float-start">
              <FontAwesomeIcon className='position-relative opacity-10' icon={faFont} />
            </div>
            <h6 className="mb-0">New Word</h6>
          </div>
          <div className="card-body">
            {this.props.children}
          </div>
          <hr className="dark horizontal my-0" />
          <div className="card-footer p-3">
              <button type="button" className="btn btn-primary mx-2">Primary</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
          </div>
        </div>
      </div>
    );
  }
}