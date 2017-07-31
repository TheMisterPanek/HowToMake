import React, { Component } from 'react';

export class VideoBlock extends Component {
  render() {
    return (
      <iframe width={this.props.width} height={this.props.height} src={this.props.url}></iframe>
    );
  }
}
