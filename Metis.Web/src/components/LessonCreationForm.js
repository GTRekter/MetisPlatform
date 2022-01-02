import React, { Component } from 'react';
import LessonService from '../services/LessonService';

export default class LessonCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: ""
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
        console.log("Reset creation lesson ")
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        LessonService
            .addLesson(this.state.title, this.state.description)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Description</label>
                            <textarea type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create Lesson</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}