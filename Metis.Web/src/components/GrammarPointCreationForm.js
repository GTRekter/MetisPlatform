import React, { Component } from 'react';
import FormHeader from './FormHeader';
import GrammarPointService from '../services/GrammarPointService';
import DictionaryService from '../services/DictionaryService';
import ReactQuill from 'react-quill';

export default class GrammarPointCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            dictionaryId: "",
            dictionaries: []
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        DictionaryService
            .getDictionaries()
            .then((data) => {
                this.setState({
                    dictionaries: data,
                    dictionaryId: data[0].id
                })
            })
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
            .addGrammarPoint(this.state.title, this.state.description)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let dictionaries = this.state.dictionaries.map((dictionary, index) =>
            <option key={index} value={dictionary.id}>{dictionary.name}</option>
        )
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                <div className="col-12">
                        <FormHeader title="Grammar Point" action="Creation" subtitle="Insert all the information about the grammar point." />
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Dictionary</label>
                            <select className="form-control" name="dictionaryId" value={this.state.dictionaryId} onChange={this.onChangeDictionary}>
                                {dictionaries}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <label>Description</label>
                        <ReactQuill theme="snow" value={this.state.description} onChange={this.onChangeDescription} />        
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create GrammarPoint</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}