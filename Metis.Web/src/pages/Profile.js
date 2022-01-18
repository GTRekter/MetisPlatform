import React, { Component } from 'react';
import korea from '../images/korea.png';
import StatisticService from '../services/StatisticService';
import StatisticGraph from './StatisticGraph';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weeklyStatisticsPercentage: []
        }
    }
    componentDidMount() {
        StatisticService
            .getStatisticsByCurrentUserLastWeek()
            .then((statistics) => {

                this.setState({
                    weeklyStatisticsPercentage: statistics.map(statistic => (statistic.correct / (statistic.correct + statistic.incorrect)) * 100),
                })
            })
    }
    render() {
        return (
            
<div class="col-lg-9 mt-lg-0 mt-4">
    <div class="card card-body" id="profile">
        <div class="row justify-content-center align-items-center">
            <div class="col-sm-auto col-4">
                <div class="avatar avatar-xl position-relative">
                    <img src="../../../assets/img/bruce-mars.jpg" alt="bruce" class="w-100 rounded-circle shadow-sm" />
                </div>
            </div>
            <div class="col-sm-auto col-8 my-auto">
                <div class="h-100">
                    <h5 class="mb-1 font-weight-bolder">
                        Richard Davis
                    </h5>
                    <p class="mb-0 font-weight-normal text-sm">
                        CEO / Co-Founder
                    </p>
                </div>
            </div>
            <div class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                <label class="form-check-label mb-0">
                    <small id="profileVisibility">
                        Switch to invisible
                    </small>
                </label>
                <div class="form-check form-switch ms-2 my-auto">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault23" checked="" onchange="visible()" />
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-4" id="basic-info">
        <div class="card-header">
            <h5>Basic Info</h5>
        </div>
        <div class="card-body pt-0">
            <div class="row">
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>First Name</label>
                        <input type="text" class="form-control" placeholder="Alec" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>Last Name</label>
                        <input type="text" class="form-control" placeholder="Thompson" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 col-6">
                    <label class="form-label mt-4 ms-0">I'm</label>
                    <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" name="choices-gender" id="choices-gender" hidden="" tabindex="-1" data-choice="active"><option value="Male">Male</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="Male" data-custom-properties="null" aria-selected="true">Male</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""><div class="choices__list" role="listbox"><div id="choices--choices-gender-item-choice-1" class="choices__item choices__item--choice choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="Female" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">Female</div><div id="choices--choices-gender-item-choice-2" class="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice="" data-id="2" data-value="Male" data-select-text="Press to select" data-choice-selectable="">Male</div></div></div></div>
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-5 col-5">
                            <label class="form-label mt-4 ms-0">Birth Date</label>
                            <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" name="choices-month" id="choices-month" hidden="" tabindex="-1" data-choice="active"><option value="2">February</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="2" data-custom-properties="null" aria-selected="true">February</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""><div class="choices__list" role="listbox"><div id="choices--choices-month-item-choice-1" class="choices__item choices__item--choice choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="4" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">April</div><div id="choices--choices-month-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="8" data-select-text="Press to select" data-choice-selectable="">August</div><div id="choices--choices-month-item-choice-3" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="3" data-value="12" data-select-text="Press to select" data-choice-selectable="">December</div><div id="choices--choices-month-item-choice-4" class="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice="" data-id="4" data-value="2" data-select-text="Press to select" data-choice-selectable="">February</div><div id="choices--choices-month-item-choice-5" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="5" data-value="1" data-select-text="Press to select" data-choice-selectable="">January</div><div id="choices--choices-month-item-choice-6" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="6" data-value="7" data-select-text="Press to select" data-choice-selectable="">July</div><div id="choices--choices-month-item-choice-7" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="7" data-value="6" data-select-text="Press to select" data-choice-selectable="">June</div><div id="choices--choices-month-item-choice-8" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="8" data-value="3" data-select-text="Press to select" data-choice-selectable="">March</div><div id="choices--choices-month-item-choice-9" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="9" data-value="5" data-select-text="Press to select" data-choice-selectable="">May</div><div id="choices--choices-month-item-choice-10" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="10" data-value="11" data-select-text="Press to select" data-choice-selectable="">November</div><div id="choices--choices-month-item-choice-11" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="11" data-value="10" data-select-text="Press to select" data-choice-selectable="">October</div><div id="choices--choices-month-item-choice-12" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="12" data-value="9" data-select-text="Press to select" data-choice-selectable="">September</div></div></div></div>
                        </div>
                        <div class="col-sm-4 col-3">
                            <label class="form-label mt-4 ms-0">&nbsp;</label>
                            <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" name="choices-day" id="choices-day" hidden="" tabindex="-1" data-choice="active"><option value="1">1</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="1" data-custom-properties="null" aria-selected="true">1</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""><div class="choices__list" role="listbox"><div id="choices--choices-day-item-choice-1" class="choices__item choices__item--choice is-selected choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="1" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">1</div><div id="choices--choices-day-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="2" data-select-text="Press to select" data-choice-selectable="">2</div><div id="choices--choices-day-item-choice-3" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="3" data-value="3" data-select-text="Press to select" data-choice-selectable="">3</div><div id="choices--choices-day-item-choice-4" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="4" data-value="4" data-select-text="Press to select" data-choice-selectable="">4</div><div id="choices--choices-day-item-choice-5" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="5" data-value="5" data-select-text="Press to select" data-choice-selectable="">5</div><div id="choices--choices-day-item-choice-6" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="6" data-value="6" data-select-text="Press to select" data-choice-selectable="">6</div><div id="choices--choices-day-item-choice-7" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="7" data-value="7" data-select-text="Press to select" data-choice-selectable="">7</div><div id="choices--choices-day-item-choice-8" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="8" data-value="8" data-select-text="Press to select" data-choice-selectable="">8</div><div id="choices--choices-day-item-choice-9" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="9" data-value="9" data-select-text="Press to select" data-choice-selectable="">9</div><div id="choices--choices-day-item-choice-10" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="10" data-value="10" data-select-text="Press to select" data-choice-selectable="">10</div><div id="choices--choices-day-item-choice-11" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="11" data-value="11" data-select-text="Press to select" data-choice-selectable="">11</div><div id="choices--choices-day-item-choice-12" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="12" data-value="12" data-select-text="Press to select" data-choice-selectable="">12</div><div id="choices--choices-day-item-choice-13" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="13" data-value="13" data-select-text="Press to select" data-choice-selectable="">13</div><div id="choices--choices-day-item-choice-14" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="14" data-value="14" data-select-text="Press to select" data-choice-selectable="">14</div><div id="choices--choices-day-item-choice-15" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="15" data-value="15" data-select-text="Press to select" data-choice-selectable="">15</div><div id="choices--choices-day-item-choice-16" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="16" data-value="16" data-select-text="Press to select" data-choice-selectable="">16</div><div id="choices--choices-day-item-choice-17" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="17" data-value="17" data-select-text="Press to select" data-choice-selectable="">17</div><div id="choices--choices-day-item-choice-18" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="18" data-value="18" data-select-text="Press to select" data-choice-selectable="">18</div><div id="choices--choices-day-item-choice-19" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="19" data-value="19" data-select-text="Press to select" data-choice-selectable="">19</div><div id="choices--choices-day-item-choice-20" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="20" data-value="20" data-select-text="Press to select" data-choice-selectable="">20</div><div id="choices--choices-day-item-choice-21" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="21" data-value="21" data-select-text="Press to select" data-choice-selectable="">21</div><div id="choices--choices-day-item-choice-22" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="22" data-value="22" data-select-text="Press to select" data-choice-selectable="">22</div><div id="choices--choices-day-item-choice-23" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="23" data-value="23" data-select-text="Press to select" data-choice-selectable="">23</div><div id="choices--choices-day-item-choice-24" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="24" data-value="24" data-select-text="Press to select" data-choice-selectable="">24</div><div id="choices--choices-day-item-choice-25" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="25" data-value="25" data-select-text="Press to select" data-choice-selectable="">25</div><div id="choices--choices-day-item-choice-26" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="26" data-value="26" data-select-text="Press to select" data-choice-selectable="">26</div><div id="choices--choices-day-item-choice-27" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="27" data-value="27" data-select-text="Press to select" data-choice-selectable="">27</div><div id="choices--choices-day-item-choice-28" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="28" data-value="28" data-select-text="Press to select" data-choice-selectable="">28</div><div id="choices--choices-day-item-choice-29" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="29" data-value="29" data-select-text="Press to select" data-choice-selectable="">29</div><div id="choices--choices-day-item-choice-30" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="30" data-value="30" data-select-text="Press to select" data-choice-selectable="">30</div><div id="choices--choices-day-item-choice-31" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="31" data-value="31" data-select-text="Press to select" data-choice-selectable="">31</div></div></div></div>
                        </div>
                        <div class="col-sm-3 col-4">
                            <label class="form-label mt-4">&nbsp;</label>
                            <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" name="choices-year" id="choices-year" hidden="" tabindex="-1" data-choice="active"><option value="2020">2020</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="2020" data-custom-properties="null" aria-selected="true">2020</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""><div class="choices__list" role="listbox"><div id="choices--choices-year-item-choice-1" class="choices__item choices__item--choice choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="1900" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">1900</div><div id="choices--choices-year-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="1901" data-select-text="Press to select" data-choice-selectable="">1901</div><div id="choices--choices-year-item-choice-3" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="3" data-value="1902" data-select-text="Press to select" data-choice-selectable="">1902</div><div id="choices--choices-year-item-choice-4" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="4" data-value="1903" data-select-text="Press to select" data-choice-selectable="">1903</div><div id="choices--choices-year-item-choice-5" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="5" data-value="1904" data-select-text="Press to select" data-choice-selectable="">1904</div><div id="choices--choices-year-item-choice-6" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="6" data-value="1905" data-select-text="Press to select" data-choice-selectable="">1905</div><div id="choices--choices-year-item-choice-7" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="7" data-value="1906" data-select-text="Press to select" data-choice-selectable="">1906</div><div id="choices--choices-year-item-choice-8" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="8" data-value="1907" data-select-text="Press to select" data-choice-selectable="">1907</div><div id="choices--choices-year-item-choice-9" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="9" data-value="1908" data-select-text="Press to select" data-choice-selectable="">1908</div><div id="choices--choices-year-item-choice-10" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="10" data-value="1909" data-select-text="Press to select" data-choice-selectable="">1909</div><div id="choices--choices-year-item-choice-11" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="11" data-value="1910" data-select-text="Press to select" data-choice-selectable="">1910</div><div id="choices--choices-year-item-choice-12" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="12" data-value="1911" data-select-text="Press to select" data-choice-selectable="">1911</div><div id="choices--choices-year-item-choice-13" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="13" data-value="1912" data-select-text="Press to select" data-choice-selectable="">1912</div><div id="choices--choices-year-item-choice-14" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="14" data-value="1913" data-select-text="Press to select" data-choice-selectable="">1913</div><div id="choices--choices-year-item-choice-15" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="15" data-value="1914" data-select-text="Press to select" data-choice-selectable="">1914</div><div id="choices--choices-year-item-choice-16" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="16" data-value="1915" data-select-text="Press to select" data-choice-selectable="">1915</div><div id="choices--choices-year-item-choice-17" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="17" data-value="1916" data-select-text="Press to select" data-choice-selectable="">1916</div><div id="choices--choices-year-item-choice-18" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="18" data-value="1917" data-select-text="Press to select" data-choice-selectable="">1917</div><div id="choices--choices-year-item-choice-19" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="19" data-value="1918" data-select-text="Press to select" data-choice-selectable="">1918</div><div id="choices--choices-year-item-choice-20" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="20" data-value="1919" data-select-text="Press to select" data-choice-selectable="">1919</div><div id="choices--choices-year-item-choice-21" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="21" data-value="1920" data-select-text="Press to select" data-choice-selectable="">1920</div><div id="choices--choices-year-item-choice-22" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="22" data-value="1921" data-select-text="Press to select" data-choice-selectable="">1921</div><div id="choices--choices-year-item-choice-23" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="23" data-value="1922" data-select-text="Press to select" data-choice-selectable="">1922</div><div id="choices--choices-year-item-choice-24" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="24" data-value="1923" data-select-text="Press to select" data-choice-selectable="">1923</div><div id="choices--choices-year-item-choice-25" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="25" data-value="1924" data-select-text="Press to select" data-choice-selectable="">1924</div><div id="choices--choices-year-item-choice-26" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="26" data-value="1925" data-select-text="Press to select" data-choice-selectable="">1925</div><div id="choices--choices-year-item-choice-27" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="27" data-value="1926" data-select-text="Press to select" data-choice-selectable="">1926</div><div id="choices--choices-year-item-choice-28" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="28" data-value="1927" data-select-text="Press to select" data-choice-selectable="">1927</div><div id="choices--choices-year-item-choice-29" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="29" data-value="1928" data-select-text="Press to select" data-choice-selectable="">1928</div><div id="choices--choices-year-item-choice-30" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="30" data-value="1929" data-select-text="Press to select" data-choice-selectable="">1929</div><div id="choices--choices-year-item-choice-31" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="31" data-value="1930" data-select-text="Press to select" data-choice-selectable="">1930</div><div id="choices--choices-year-item-choice-32" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="32" data-value="1931" data-select-text="Press to select" data-choice-selectable="">1931</div><div id="choices--choices-year-item-choice-33" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="33" data-value="1932" data-select-text="Press to select" data-choice-selectable="">1932</div><div id="choices--choices-year-item-choice-34" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="34" data-value="1933" data-select-text="Press to select" data-choice-selectable="">1933</div><div id="choices--choices-year-item-choice-35" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="35" data-value="1934" data-select-text="Press to select" data-choice-selectable="">1934</div><div id="choices--choices-year-item-choice-36" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="36" data-value="1935" data-select-text="Press to select" data-choice-selectable="">1935</div><div id="choices--choices-year-item-choice-37" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="37" data-value="1936" data-select-text="Press to select" data-choice-selectable="">1936</div><div id="choices--choices-year-item-choice-38" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="38" data-value="1937" data-select-text="Press to select" data-choice-selectable="">1937</div><div id="choices--choices-year-item-choice-39" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="39" data-value="1938" data-select-text="Press to select" data-choice-selectable="">1938</div><div id="choices--choices-year-item-choice-40" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="40" data-value="1939" data-select-text="Press to select" data-choice-selectable="">1939</div><div id="choices--choices-year-item-choice-41" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="41" data-value="1940" data-select-text="Press to select" data-choice-selectable="">1940</div><div id="choices--choices-year-item-choice-42" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="42" data-value="1941" data-select-text="Press to select" data-choice-selectable="">1941</div><div id="choices--choices-year-item-choice-43" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="43" data-value="1942" data-select-text="Press to select" data-choice-selectable="">1942</div><div id="choices--choices-year-item-choice-44" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="44" data-value="1943" data-select-text="Press to select" data-choice-selectable="">1943</div><div id="choices--choices-year-item-choice-45" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="45" data-value="1944" data-select-text="Press to select" data-choice-selectable="">1944</div><div id="choices--choices-year-item-choice-46" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="46" data-value="1945" data-select-text="Press to select" data-choice-selectable="">1945</div><div id="choices--choices-year-item-choice-47" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="47" data-value="1946" data-select-text="Press to select" data-choice-selectable="">1946</div><div id="choices--choices-year-item-choice-48" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="48" data-value="1947" data-select-text="Press to select" data-choice-selectable="">1947</div><div id="choices--choices-year-item-choice-49" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="49" data-value="1948" data-select-text="Press to select" data-choice-selectable="">1948</div><div id="choices--choices-year-item-choice-50" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="50" data-value="1949" data-select-text="Press to select" data-choice-selectable="">1949</div><div id="choices--choices-year-item-choice-51" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="51" data-value="1950" data-select-text="Press to select" data-choice-selectable="">1950</div><div id="choices--choices-year-item-choice-52" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="52" data-value="1951" data-select-text="Press to select" data-choice-selectable="">1951</div><div id="choices--choices-year-item-choice-53" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="53" data-value="1952" data-select-text="Press to select" data-choice-selectable="">1952</div><div id="choices--choices-year-item-choice-54" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="54" data-value="1953" data-select-text="Press to select" data-choice-selectable="">1953</div><div id="choices--choices-year-item-choice-55" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="55" data-value="1954" data-select-text="Press to select" data-choice-selectable="">1954</div><div id="choices--choices-year-item-choice-56" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="56" data-value="1955" data-select-text="Press to select" data-choice-selectable="">1955</div><div id="choices--choices-year-item-choice-57" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="57" data-value="1956" data-select-text="Press to select" data-choice-selectable="">1956</div><div id="choices--choices-year-item-choice-58" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="58" data-value="1957" data-select-text="Press to select" data-choice-selectable="">1957</div><div id="choices--choices-year-item-choice-59" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="59" data-value="1958" data-select-text="Press to select" data-choice-selectable="">1958</div><div id="choices--choices-year-item-choice-60" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="60" data-value="1959" data-select-text="Press to select" data-choice-selectable="">1959</div><div id="choices--choices-year-item-choice-61" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="61" data-value="1960" data-select-text="Press to select" data-choice-selectable="">1960</div><div id="choices--choices-year-item-choice-62" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="62" data-value="1961" data-select-text="Press to select" data-choice-selectable="">1961</div><div id="choices--choices-year-item-choice-63" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="63" data-value="1962" data-select-text="Press to select" data-choice-selectable="">1962</div><div id="choices--choices-year-item-choice-64" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="64" data-value="1963" data-select-text="Press to select" data-choice-selectable="">1963</div><div id="choices--choices-year-item-choice-65" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="65" data-value="1964" data-select-text="Press to select" data-choice-selectable="">1964</div><div id="choices--choices-year-item-choice-66" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="66" data-value="1965" data-select-text="Press to select" data-choice-selectable="">1965</div><div id="choices--choices-year-item-choice-67" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="67" data-value="1966" data-select-text="Press to select" data-choice-selectable="">1966</div><div id="choices--choices-year-item-choice-68" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="68" data-value="1967" data-select-text="Press to select" data-choice-selectable="">1967</div><div id="choices--choices-year-item-choice-69" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="69" data-value="1968" data-select-text="Press to select" data-choice-selectable="">1968</div><div id="choices--choices-year-item-choice-70" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="70" data-value="1969" data-select-text="Press to select" data-choice-selectable="">1969</div><div id="choices--choices-year-item-choice-71" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="71" data-value="1970" data-select-text="Press to select" data-choice-selectable="">1970</div><div id="choices--choices-year-item-choice-72" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="72" data-value="1971" data-select-text="Press to select" data-choice-selectable="">1971</div><div id="choices--choices-year-item-choice-73" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="73" data-value="1972" data-select-text="Press to select" data-choice-selectable="">1972</div><div id="choices--choices-year-item-choice-74" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="74" data-value="1973" data-select-text="Press to select" data-choice-selectable="">1973</div><div id="choices--choices-year-item-choice-75" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="75" data-value="1974" data-select-text="Press to select" data-choice-selectable="">1974</div><div id="choices--choices-year-item-choice-76" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="76" data-value="1975" data-select-text="Press to select" data-choice-selectable="">1975</div><div id="choices--choices-year-item-choice-77" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="77" data-value="1976" data-select-text="Press to select" data-choice-selectable="">1976</div><div id="choices--choices-year-item-choice-78" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="78" data-value="1977" data-select-text="Press to select" data-choice-selectable="">1977</div><div id="choices--choices-year-item-choice-79" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="79" data-value="1978" data-select-text="Press to select" data-choice-selectable="">1978</div><div id="choices--choices-year-item-choice-80" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="80" data-value="1979" data-select-text="Press to select" data-choice-selectable="">1979</div><div id="choices--choices-year-item-choice-81" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="81" data-value="1980" data-select-text="Press to select" data-choice-selectable="">1980</div><div id="choices--choices-year-item-choice-82" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="82" data-value="1981" data-select-text="Press to select" data-choice-selectable="">1981</div><div id="choices--choices-year-item-choice-83" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="83" data-value="1982" data-select-text="Press to select" data-choice-selectable="">1982</div><div id="choices--choices-year-item-choice-84" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="84" data-value="1983" data-select-text="Press to select" data-choice-selectable="">1983</div><div id="choices--choices-year-item-choice-85" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="85" data-value="1984" data-select-text="Press to select" data-choice-selectable="">1984</div><div id="choices--choices-year-item-choice-86" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="86" data-value="1985" data-select-text="Press to select" data-choice-selectable="">1985</div><div id="choices--choices-year-item-choice-87" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="87" data-value="1986" data-select-text="Press to select" data-choice-selectable="">1986</div><div id="choices--choices-year-item-choice-88" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="88" data-value="1987" data-select-text="Press to select" data-choice-selectable="">1987</div><div id="choices--choices-year-item-choice-89" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="89" data-value="1988" data-select-text="Press to select" data-choice-selectable="">1988</div><div id="choices--choices-year-item-choice-90" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="90" data-value="1989" data-select-text="Press to select" data-choice-selectable="">1989</div><div id="choices--choices-year-item-choice-91" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="91" data-value="1990" data-select-text="Press to select" data-choice-selectable="">1990</div><div id="choices--choices-year-item-choice-92" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="92" data-value="1991" data-select-text="Press to select" data-choice-selectable="">1991</div><div id="choices--choices-year-item-choice-93" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="93" data-value="1992" data-select-text="Press to select" data-choice-selectable="">1992</div><div id="choices--choices-year-item-choice-94" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="94" data-value="1993" data-select-text="Press to select" data-choice-selectable="">1993</div><div id="choices--choices-year-item-choice-95" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="95" data-value="1994" data-select-text="Press to select" data-choice-selectable="">1994</div><div id="choices--choices-year-item-choice-96" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="96" data-value="1995" data-select-text="Press to select" data-choice-selectable="">1995</div><div id="choices--choices-year-item-choice-97" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="97" data-value="1996" data-select-text="Press to select" data-choice-selectable="">1996</div><div id="choices--choices-year-item-choice-98" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="98" data-value="1997" data-select-text="Press to select" data-choice-selectable="">1997</div><div id="choices--choices-year-item-choice-99" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="99" data-value="1998" data-select-text="Press to select" data-choice-selectable="">1998</div><div id="choices--choices-year-item-choice-100" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="100" data-value="1999" data-select-text="Press to select" data-choice-selectable="">1999</div><div id="choices--choices-year-item-choice-101" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="101" data-value="2000" data-select-text="Press to select" data-choice-selectable="">2000</div><div id="choices--choices-year-item-choice-102" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="102" data-value="2001" data-select-text="Press to select" data-choice-selectable="">2001</div><div id="choices--choices-year-item-choice-103" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="103" data-value="2002" data-select-text="Press to select" data-choice-selectable="">2002</div><div id="choices--choices-year-item-choice-104" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="104" data-value="2003" data-select-text="Press to select" data-choice-selectable="">2003</div><div id="choices--choices-year-item-choice-105" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="105" data-value="2004" data-select-text="Press to select" data-choice-selectable="">2004</div><div id="choices--choices-year-item-choice-106" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="106" data-value="2005" data-select-text="Press to select" data-choice-selectable="">2005</div><div id="choices--choices-year-item-choice-107" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="107" data-value="2006" data-select-text="Press to select" data-choice-selectable="">2006</div><div id="choices--choices-year-item-choice-108" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="108" data-value="2007" data-select-text="Press to select" data-choice-selectable="">2007</div><div id="choices--choices-year-item-choice-109" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="109" data-value="2008" data-select-text="Press to select" data-choice-selectable="">2008</div><div id="choices--choices-year-item-choice-110" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="110" data-value="2009" data-select-text="Press to select" data-choice-selectable="">2009</div><div id="choices--choices-year-item-choice-111" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="111" data-value="2010" data-select-text="Press to select" data-choice-selectable="">2010</div><div id="choices--choices-year-item-choice-112" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="112" data-value="2011" data-select-text="Press to select" data-choice-selectable="">2011</div><div id="choices--choices-year-item-choice-113" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="113" data-value="2012" data-select-text="Press to select" data-choice-selectable="">2012</div><div id="choices--choices-year-item-choice-114" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="114" data-value="2013" data-select-text="Press to select" data-choice-selectable="">2013</div><div id="choices--choices-year-item-choice-115" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="115" data-value="2014" data-select-text="Press to select" data-choice-selectable="">2014</div><div id="choices--choices-year-item-choice-116" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="116" data-value="2015" data-select-text="Press to select" data-choice-selectable="">2015</div><div id="choices--choices-year-item-choice-117" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="117" data-value="2016" data-select-text="Press to select" data-choice-selectable="">2016</div><div id="choices--choices-year-item-choice-118" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="118" data-value="2017" data-select-text="Press to select" data-choice-selectable="">2017</div><div id="choices--choices-year-item-choice-119" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="119" data-value="2018" data-select-text="Press to select" data-choice-selectable="">2018</div><div id="choices--choices-year-item-choice-120" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="120" data-value="2019" data-select-text="Press to select" data-choice-selectable="">2019</div><div id="choices--choices-year-item-choice-121" class="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice="" data-id="121" data-value="2020" data-select-text="Press to select" data-choice-selectable="">2020</div></div></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>Email</label>
                        <input type="email" class="form-control" placeholder="example@email.com" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>Confirm Email</label>
                        <input type="email" class="form-control" placeholder="example@email.com" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>Your location</label>
                        <input type="text" class="form-control" placeholder="Sydney, A" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group input-group-static">
                        <label>Phone Number</label>
                        <input type="number" class="form-control" placeholder="+40 735 631 620" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 align-self-center">
                    <label class="form-label mt-4 ms-0">Language</label>
                    <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" name="choices-language" id="choices-language" hidden="" tabindex="-1" data-choice="active"><option value="English">English</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="English" data-custom-properties="null" aria-selected="true">English</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""><div class="choices__list" role="listbox"><div id="choices--choices-language-item-choice-1" class="choices__item choices__item--choice is-selected choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="English" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">English</div><div id="choices--choices-language-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="French" data-select-text="Press to select" data-choice-selectable="">French</div><div id="choices--choices-language-item-choice-3" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="3" data-value="Spanish" data-select-text="Press to select" data-choice-selectable="">Spanish</div></div></div></div>
                </div>
                <div class="col-md-6">
                    <label class="form-label mt-4">Skills</label>
                    <div class="choices" data-type="text" aria-haspopup="true" aria-expanded="false">
                        <div class="choices__inner is-filled">
                            <input class="form-control choices__input" id="choices-skills" type="text" value="vuejs,angular,react" placeholder="Enter something" hidden="" tabindex="-1" data-choice="active" onfocus="focused(this)" onfocusout="defocused(this)" />
                            <div class="choices__list choices__list--multiple">
                                <div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="vuejs" data-custom-properties="null" aria-selected="true" data-deletable="">vuejs<button type="button" class="choices__button" aria-label="Remove item: 'vuejs'" data-button="">Remove item</button></div><div class="choices__item choices__item--selectable" data-item="" data-id="2" data-value="angular" data-custom-properties="null" aria-selected="true" data-deletable="">angular<button type="button" class="choices__button" aria-label="Remove item: 'angular'" data-button="">Remove item</button></div><div class="choices__item choices__item--selectable" data-item="" data-id="3" data-value="react" data-custom-properties="null" aria-selected="true" data-deletable="">react<button type="button" class="choices__button" aria-label="Remove item: 'react'" data-button="">Remove item</button></div></div><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" />
                        </div>
                        <div class="choices__list choices__list--dropdown" aria-expanded="false"></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-4" id="password">
        <div class="card-header">
            <h5>Change Password</h5>
        </div>
        <div class="card-body pt-0">
            <div class="input-group input-group-outline">
                <label class="form-label">Current password</label>
                <input type="password" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
            </div>
            <div class="input-group input-group-outline my-4">
                <label class="form-label">New password</label>
                <input type="password" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
            </div>
            <div class="input-group input-group-outline">
                <label class="form-label">Confirm New password</label>
                <input type="password" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
            </div>
            <h5 class="mt-5">Password requirements</h5>
            <p class="text-muted mb-2">
                Please follow this guide for a strong password:
            </p>
            <ul class="text-muted ps-4 mb-0 float-start">
                <li>
                    <span class="text-sm">One special characters</span>
                </li>
                <li>
                    <span class="text-sm">Min 6 characters</span>
                </li>
                <li>
                    <span class="text-sm">One number (2 are recommended)</span>
                </li>
                <li>
                    <span class="text-sm">Change it often</span>
                </li>
            </ul>
            <button class="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">Update password</button>
        </div>
    </div>
    <div class="card mt-4" id="2fa">
        <div class="card-header d-flex">
            <h5 class="mb-0">Two-factor authentication</h5>
            <span class="badge badge-success ms-auto mb-auto">Enabled</span>
        </div>
        <div class="card-body">
            <div class="d-flex">
                <p class="my-auto">Security keys</p>
                <p class="text-secondary text-sm ms-auto my-auto me-3">No Security Keys</p>
                <button class="btn btn-sm btn-outline-dark mb-0" type="button">Add</button>
            </div>
            <hr class="horizontal dark" />
            <div class="d-flex">
                <p class="my-auto">SMS number</p>
                <p class="text-secondary text-sm ms-auto my-auto me-3">+4012374423</p>
                <button class="btn btn-sm btn-outline-dark mb-0" type="button">Edit</button>
            </div>
            <hr class="horizontal dark">
                <div class="d-flex">
                    <p class="my-auto">Authenticator app</p>
                    <p class="text-secondary text-sm ms-auto my-auto me-3">Not Configured</p>
                    <button class="btn btn-sm btn-outline-dark mb-0" type="button">Set up</button>
                </div>
        </div>
    </div>
    <div class="card mt-4" id="accounts" />
    <div class="card-header">
        <h5>Accounts</h5>
        <p class="text-sm">Here you can setup and manage your integration settings.</p>
    </div>
    <div class="card-body pt-0">
        <div class="d-flex">
            <img class="width-48-px" src="../../../assets/img/small-logos/logo-slack.svg" alt="logo_slack" />
            <div class="my-auto ms-3">
                <div class="h-100">
                    <h5 class="mb-0">Slack</h5>
                    <a class="text-sm text-body" href="javascript:;">Show less <i class="fas fa-chevron-up text-xs ms-1" aria-hidden="true"></i></a>
                </div>
            </div>
            <p class="text-sm text-secondary ms-auto me-3 my-auto">Enabled</p>
            <div class="form-check form-switch my-auto">
                <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault1" />
            </div>
        </div>
        <div class="ps-5 pt-3 ms-3">
            <p class="mb-0 text-sm">You haven't added your Slack yet or you aren't authorized. Please add our Slack Bot to your account by clicking on <a href="javascript">here</a>. When you've added the bot, send your verification code that you have received.</p>
            <div class="d-sm-flex bg-gray-100 border-radius-lg p-2 my-4 is-filled">
                <p class="text-sm font-weight-bold my-auto ps-sm-2">Verification Code</p>
                <input class="form-control form-control-sm ms-sm-auto mt-sm-0 mt-2 w-sm-15 w-40" type="text" value="1172913" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Copy!" aria-label="Copy!" onfocus="focused(this)" onfocusout="defocused(this)" />
            </div>
            <div class="d-sm-flex bg-gray-100 border-radius-lg p-2 my-4">
                <p class="text-sm font-weight-bold my-auto ps-sm-2">Connected account</p>
                <h6 class="text-sm ms-auto me-3 my-auto">hello@creative-tim.com</h6>
                <button class="btn btn-sm bg-gradient-dark my-sm-auto mt-2 mb-0" type="button" name="button">Delete</button>
            </div>
        </div>
        <hr class="horizontal dark" />
        <div class="d-flex">
            <img class="width-48-px" src="../../../assets/img/small-logos/logo-spotify.svg" alt="logo_spotify" />
            <div class="my-auto ms-3">
                <div class="h-100">
                    <h5 class="mb-0">Spotify</h5>
                    <p class="mb-0 text-sm">Music</p>
                </div>
            </div>
            <p class="text-sm text-secondary ms-auto me-3 my-auto">Enabled</p>
            <div class="form-check form-switch my-auto">
                <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault2" />
            </div>
        </div>
        <hr class="horizontal dark"/>
            <div class="d-flex">
                <img class="width-48-px" src="../../../assets/img/small-logos/logo-atlassian.svg" alt="logo_atlassian" />
                <div class="my-auto ms-3">
                    <div class="h-100">
                        <h5 class="mb-0">Atlassian</h5>
                        <p class="mb-0 text-sm">Payment vendor</p>
                    </div>
                </div>
                <p class="text-sm text-secondary ms-auto me-3 my-auto">Enabled</p>
                <div class="form-check form-switch my-auto">
                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault3" />
                </div>
            </div>
            <hr class="horizontal dark">
                <div class="d-flex">
                    <img class="width-48-px" src="../../../assets/img/small-logos/logo-asana.svg" alt="logo_asana" />
                    <div class="my-auto ms-3">
                        <div class="h-100">
                            <h5 class="mb-0">Asana</h5>
                            <p class="mb-0 text-sm">Organize your team</p>
                        </div>
                    </div>
                    <div class="form-check form-switch ms-auto my-auto">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault4" />
                    </div>
                </div>
            </div>
    </div>
    <div class="card mt-4" id="notifications">
        <div class="card-header">
            <h5>Notifications</h5>
            <p class="text-sm">Choose how you receive notifications. These notification settings apply to the things you are watching.</p>
        </div>
        <div class="card-body pt-0">
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th class="ps-1" colspan="4">
                                <p class="mb-0">Activity</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">Email</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">Push</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">SMS</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Mentions</span>
                                    <span class="text-xs font-weight-normal">Notify when another user mentions you in a comment</span>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault11" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault12" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault13" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Comments</span>
                                    <span class="text-xs font-weight-normal">Notify when another user comments your item.</span>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault14" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault15" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault16" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Follows</span>
                                    <span class="text-xs font-weight-normal">Notify when another user follows you.</span>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault17" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault18" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault19" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <p class="text-sm mb-0">Log in from a new device</p>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault20" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault21" />
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                    <input class="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault22" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="card mt-4" id="sessions">
        <div class="card-header pb-3">
            <h5>Sessions</h5>
            <p class="text-sm">This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
        </div>
        <div class="card-body pt-0">
            <div class="d-flex align-items-center">
                <div class="text-center w-5">
                    <i class="fas fa-desktop text-lg opacity-6" aria-hidden="true"></i>
                </div>
                <div class="my-auto ms-3">
                    <div class="h-100">
                        <p class="text-sm mb-1">
                            Bucharest 68.133.163.201
                        </p>
                        <p class="mb-0 text-xs">
                            Your current session
                        </p>
                    </div>
                </div>
                <span class="badge badge-success badge-sm my-auto ms-auto me-3">Active</span>
                <p class="text-secondary text-sm my-auto me-3">EU</p>
                <a href="javascript:;" class="text-primary text-sm icon-move-right my-auto">See more
                    <i class="fas fa-arrow-right text-xs ms-1" aria-hidden="true"></i>
                </a>
            </div>
            <hr class="horizontal dark" />
            <div class="d-flex align-items-center">
                <div class="text-center w-5">
                    <i class="fas fa-desktop text-lg opacity-6" aria-hidden="true"></i>
                </div>
                <p class="my-auto ms-3">Chrome on macOS</p>
                <p class="text-secondary text-sm ms-auto my-auto me-3">US</p>
                <a href="javascript:;" class="text-primary text-sm icon-move-right my-auto">See more
                    <i class="fas fa-arrow-right text-xs ms-1" aria-hidden="true"></i>
                </a>
            </div>
            <hr class="horizontal dark"/>
                <div class="d-flex align-items-center">
                    <div class="text-center w-5">
                        <i class="fas fa-mobile text-lg opacity-6" aria-hidden="true"></i>
                    </div>
                    <p class="my-auto ms-3">Safari on iPhone</p>
                    <p class="text-secondary text-sm ms-auto my-auto me-3">US</p>
                    <a href="javascript:;" class="text-primary text-sm icon-move-right my-auto">See more
                        <i class="fas fa-arrow-right text-xs ms-1" aria-hidden="true"></i>
                    </a>
                </div>
        </div>
    </div>
    <div class="card mt-4" id="delete">
        <div class="card-body">
            <div class="d-flex align-items-center mb-sm-0 mb-4">
                <div class="w-50">
                    <h5>Delete Account</h5>
                    <p class="text-sm mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <div class="w-50 text-end">
                    <button class="btn btn-outline-secondary mb-3 mb-md-0 ms-auto" type="button" name="button">Deactivate</button>
                    <button class="btn bg-gradient-danger mb-0 ms-2" type="button" name="button">Delete Account</button>
                </div>
            </div>
        </div>
    </div>
</div >
        )
    }
}