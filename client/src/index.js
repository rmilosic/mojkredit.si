// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  render () {
    return <p> Hello React project</p>;
  }
}

render(<App/>, document.getElementById('app'));