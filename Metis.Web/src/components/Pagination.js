import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.onClickPageById = this.onClickPageById.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }
    onClickPageById = (id) => {
        this.props.onClickChangePageCallback(id);
    }
    onClickPrevious = () => {
        let nextPage = this.props.page > 0 ? this.props.page - 1 : 0; 
        this.props.onClickChangePageCallback(nextPage);
    }
    onClickNext = () => {
        let nextPage = this.props.page < this.props.pages ? this.props.page + 1 : this.props.pages; 
        this.props.onClickChangePageCallback(nextPage);
    }
    render() {
        let limitLinks = 5;
        let linkToPages = [];
        if (this.props.page > 1) {
            linkToPages.push(<li className="page-item">
                <div className="page-link pointer" aria-label="Previous" onClick={() => this.onClickPrevious()}>
                    <FontAwesomeIcon key="0" className='position-relative opacity-10' icon={faChevronLeft} />
                    <span className="sr-only">Previous</span>
                </div>
            </li>);
        }
        let startingIndex = this.props.page > 3 ? this.props.page - 2 : 1;
        for (let index = startingIndex; index <= this.props.pages; index++) {
            if (linkToPages.length > limitLinks && (index + 1 < this.props.pages)) {
                linkToPages.push(<li key={index + 1} className="page-item">
                    <div className="page-link pointer" aria-label="Previous" onClick={() => this.onClickNext()}>
                        <FontAwesomeIcon className='position-relative opacity-10' icon={faChevronRight} />
                        <span className="sr-only">Next</span>
                    </div>
                </li>);
                break;
            }
            let active = false;
            if (index -1 === this.props.page) {
                active = true;
            }
            linkToPages.push(<li key={index + 1} className={`page-item ${(active ? 'active' : '')}`} onClick={() => this.onClickPageById(index)}>
                <div className="page-link pointer">{index}</div>
            </li>);
        }
        return (
            <nav aria-label="navigation">
                <ul className="pagination justify-content-center">
                    {linkToPages}
                </ul>
            </nav>
        );
    }
}