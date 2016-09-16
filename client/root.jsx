// Copyright David Lu 2016
// See LICENSE.txt for details

import React from 'react';
import { render } from 'react-dom';

class Root extends React.Component {
  render() {
    return (
      <p>{'Under Development'}</p>
    );
  }
}

render(<Root />, document.getElementById('app'));
