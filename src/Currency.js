import React, { Component } from 'react';

class Currency extends Component {
  constructor() {
    super();
  }  

  render() {
    return (
        <div>
            {Object.entries(this.props.rates).map((e, i) => 
                <div className="result" key={i}>
                    <div className="flag"><img src={`img/flags/${e[0].toLowerCase()}.png`} width="70" height="40" /><span>{e[0]}</span></div>                  
                    <div className="value">{e[1].toFixed(2)} {e[0]}</div>
                </div>
            )}        
        </div>
    );
  }
}

export default Currency;
