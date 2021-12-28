import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import WordCreationFrom from '../components/WordCreationFrom';
import WordList from '../components/WordList';

export default class WordManagement extends Component {
  constructor(props) {
    super(props)
    this.onClickEdit = this.onClickEdit.bind(this);
  }
  onClickAdd = (word) => {
    this.setState({
      words: [...this.state.words, word],
    })
  };
  onClickEdit = () => {

  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="btn-toolbar mb-2 mb-md-0">
              <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#collapseCreationForm" aria-expanded="false" aria-controls="collapseCreationForm">
                <FontAwesomeIcon className='position-relative opacity-10' icon={faPlus} />
                <span className='px-2'>Add</span>
              </button>
            </div>
          </div>
        </div>

        <div className="collapse" id="collapseCreationForm">
          <WordCreationFrom  onClickAddCallback={this.onClickAdd} />
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Words</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <WordList onClickRemoveCallback={this.onClickRemove} onClickEditCallback={this.onClickEdit} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}