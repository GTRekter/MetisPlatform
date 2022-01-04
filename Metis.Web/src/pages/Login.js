import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import UserService from '../services/UserService';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            rememberMe: false
        }
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        UserService
            .loginUser(this.state.email, this.state.password)
            .then((data) => {
                sessionStorage.setItem('token', data);
                this.props.history.push('/dashboard');
            });
    }
    render() {
        return (
            <main className="main-content mt-0 ps">
                <div className="page-header align-items-start min-vh-100">
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-12 mx-auto">
                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                            <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form className="text-start" onSubmit={this.onSubmit}>
                                            <div className="input-group input-group-static my-3">
                                                <label>Email</label>
                                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChangeInput} />
                                            </div>
                                            <div className="input-group input-group-static mb-3">
                                                <label>Password</label>
                                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangeInput} />
                                            </div>
                                            <div className="form-check form-switch d-flex align-items-center mb-3">
                                                <input className="form-check-input" type="checkbox" name="rememberMe" value={this.state.rememberMe} onChange={this.onChangeInput} />
                                                <label className="form-check-label mb-0 ms-2" for="rememberMe">Remember me</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer position-absolute bottom-2 py-2 w-100">
                        <div className="container">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-12 col-md-6 my-auto">
                                    <div className="copyright text-center text-sm text-white text-lg-start">
                                        © 2021, made with <FontAwesomeIcon className='opacity-10' icon={faHeart} /> by
                                        <a href="https://ivanporta.net/" rel="noreferrer" className="font-weight-bold text" target="_blank"> Ivan Porta</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        );
    }
}