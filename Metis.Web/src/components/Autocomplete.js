import React, { Component } from "react";

class Autocomplete extends Component {
    static defaultProps = {
        suggestions: []
    };
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    onBlur = () => {
        this.setState({
            ...this.state,
            showSuggestions: false
        });
    };
    onChange = (event) => {
        let filteredSuggestions = this.props.suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) > -1);
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: event.currentTarget.value
        });
    };
    onMouseDown = (event) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: event.currentTarget.innerText
        });
        this.props.onChangeCallback(event.currentTarget.innerText);
    };
    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: this.state.filteredSuggestions[this.state.activeSuggestion]
            });
        }
        else if (event.keyCode === 38) {
            if (this.state.activeSuggestion === 0) {
                return;
            }
            this.setState({
                activeSuggestion: this.state.activeSuggestion - 1
            });
        }
        else if (event.keyCode === 40) {
            if (this.state.activeSuggestion - 1 === this.state.filteredSuggestions.length) {
                return;
            }
            this.setState({
                activeSuggestion: this.state.activeSuggestion + 1
            });
        }
    };
    render() {
        let suggestions = this.state.filteredSuggestions.map((suggestion, index) => 
            <li key={index} className="dropdown-item" onMouseDown={(event) => this.onMouseDown(event)}>
                {suggestion}
            </li>
        )
        return (
            <div className="dropdown">
                <div className="input-group input-group-static mb-4">
                    <label>{this.props.label}</label>
                    <input type="text" className="form-control" onBlur={this.onBlur} onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.userInput} />
                    <ul className={`mt-3 dropdown-menu ${this.state.showSuggestions ? 'show' : ''}`}>
                        {suggestions}
                    </ul>
                </div>
            </div>

        );
    }
}
export default Autocomplete;
