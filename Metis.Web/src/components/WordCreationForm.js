import React, { Component } from 'react';
import WordService from '../services/WordService';

export default class WordCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            romanization: "",
            description: "",
            example: "",
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onReset = (event) => {
        event.preventDefault();
        console.log("Reset creation word ")
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        WordService
            .addWord(this.state.text, this.state.romanization, this.state.description, this.state.example)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Text</label>
                            <input type="text" className="form-control" name="text" value={this.state.text} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Romanization</label>
                            <input type="text" className="form-control" name="romanization" value={this.state.romanization} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Description</label>
                            <textarea type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Example</label>
                            <textarea type="text" className="form-control" name="example" value={this.state.example} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create Word</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}