import React, { Component } from 'react';
import './App.css';

import Converter from './Converter'
import Currency from './Currency'

class App extends Component {
  constructor() {
    super();
    this.currencies = ['AUD', 'CAD', 'CHF', 'CNY', 'INR', 'USD', 'EUR', 'GBP', 'JPY', 'NZD'];
    this.cached = {};
    this.state = {
      base: 'USD',
      other: 'EUR',
      value: 0,
      converted: 0,
      rates: [],
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
  }

  handleLoad() {
    this.recalculate();
  }

  render() {
    
    return(
      <div id="container">
            <div className="box">
                <Converter
                    state={this.state}
                    currencies={this.currencies}
                    makeSelection={this.makeSelection}
                    changeValue={this.changeValue} />
                    <hr className="seperator" />
                <Currency
                    rates={this.state.rates}
                    state={this.state} />
            </div>
        </div>
    );
  }

  makeSelection = (event) => {
    if(event.target.value === this.state.other || event.target.value === this.state.base) {
      let temp = this.state.base;
      this.setState({
        base: this.state.other,
        other: temp,
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    }, this.recalculate);
  }

  changeValue = (event) => {
    this.setState({
      value: event.target.value,
    }, this.recalculate);
  }

  recalculate = async () => {
    const value = this.state.value;
    if(isNaN(value)) {
      return;
    }

    if(this.cached[this.state.base] !== undefined && Date.now() - this.cached[this.state.base].timestamp < 1000 * 60) {
      this.setState({
          converted: this.cached[this.state.base].rates[this.state.other] * value,
          rates: this.cached[this.state.base].rates
      });
      return;
    }

    await fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
    .then(response => response.json())
    .then(data => {
      this.cached[this.state.base] = {
        rates: data.rates,
        timestamp: Date.now()
      };
      this.setState({
        converted: data.rates[this.state.other] * value,
        rates: data.rates
      });
    });
  }
}

export default App;
