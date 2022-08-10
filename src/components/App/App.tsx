import React, { Component } from 'react';

import './App.css';

type OwnProps = {
  title?: string;
};

type Props = OwnProps;

class App extends Component<Props> {
  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

export default App;
