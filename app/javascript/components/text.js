import React, { Component } from 'react';

export class TextBlock extends Component {
  render() {
    return (
      <div className="block">{this.props.text}</div>
    );
  }
}
