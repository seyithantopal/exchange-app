import React, { Component } from 'react';

class Converter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="currencies">
            <div className="firstCurrency">
                <input type="number" min="0" onChange={this.props.changeValue} value={this.props.state.value} />
                <select onChange={this.props.makeSelection} name="base" value={this.props.state.base}>
                    {this.props.currencies.map((currency, i) => <option key={i} value={currency}>{currency}</option>)}
                </select>
            </div>
            <div className="equalSign">=</div>
            <div className="secondCurrency">
                <input type="number" disabled={true} value={this.props.state.converted.toFixed(2)}/>
                <select onChange={this.props.makeSelection} name="other" value={this.props.state.other}>
                    {this.props.currencies.map((currency, i) => <option key={i} value={currency}>{currency}</option>)}
                </select>
            </div>
        </div>
    );
  }
}

export default Converter;
