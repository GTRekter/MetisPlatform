import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class FormCardLayout extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmitCallback();
  }
  render() {
    return (
      <div className="py-4">
        <form className="card" onSubmit={this.onSubmit}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape bg-gradient-dark shadow text-center border-radius-xl mt-n4 me-3 float-start">
              <FontAwesomeIcon className='position-relative opacity-10' icon={this.props.icon} />
            </div>
            <h6 className="mb-0">{this.props.title}</h6>
          </div>
          <div className="card-body">
            <div className="col-12">
              <p className="text-sm">
                {this.props.subtitle}
              </p>
            </div>
            {this.props.children}
          </div>
          <hr className="dark horizontal my-0" />
          <div className="card-footer p-3">
            <button type="submit" className="btn btn-primary mx-2">Save</button>
            <button type="reset" className="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    );
  }
}