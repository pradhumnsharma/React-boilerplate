import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

const App = () => (
  <h1 className="main-heading">
    This is first page
  </h1>
);

ReactDOM.render(<App />, document.getElementById('root'));
