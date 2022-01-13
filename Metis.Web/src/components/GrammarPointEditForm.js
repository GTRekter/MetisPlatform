import React, { Component } from 'react';
import FormHeader from './FormHeader';
import GrammarPointService from '../services/GrammarPointService';
import LanguageService from '../services/LanguageService';
import ReactQuill from 'react-quill';

export default class GrammarPointEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: "",
            description: "",
            languageId: "",
            languages: []
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.state.id !== undefined) {
            LanguageService
                .getLanguages()
                .then((data) => {
                    this.setState({
                        languages: data
                    })
                })
            GrammarPointService
                .getGrammarPointById(this.state.id)
                .then(response => {
                    this.setState({
                        title: response.title,
                        description: response.description,
                        languageId: response.languageId
                    });
                })
        }
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onChangeDescription = (value) => {
        this.setState({
            description: value
        });
    }
    onReset = (event) => {
        event.preventDefault();
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        GrammarPointService
            .editGrammarPoint(this.state.id, this.state.title, this.state.description, this.state.languageId)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let languages = this.state.languages.map((language, index) =>
            <option key={index} value={language.id}>{language.name}</option>
        )
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="Grammar Point" action="Update" subtitle={`Update the information about the grammar point ${this.state.id}.`} />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Language</label>
                            <select className="form-control" name="languageId" value={this.state.languageId} onChange={this.onChangeInput}>
                                {languages}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <label>Description</label>
                        <ReactQuill theme="snow" value={this.state.description} onChange={this.onChangeDescription} />        
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-flex justify-content-end mt-4">
                        <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                        <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit GrammarPoint</button>
                    </div>
                </div>
            </form>
        );
    }
}