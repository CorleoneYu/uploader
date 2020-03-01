import React from 'react';
// import stores from './store';
// import { Provider } from "mobx-react";
import Layout from './component/layout';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Layout />
      </div>
    );
  }
}

export default App;
