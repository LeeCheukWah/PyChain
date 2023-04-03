import React, { Component, Button } from 'react';
import './App.css';
import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import axios from 'axios';
const replace = '/replace_chain'
const get = '/get_chain'
const connect = '/connect_node'
const postEndpoint = '/add_transaction'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    open: false
    }
    this.handleClick = this.handleClick.bind(this);

  }
  componentWillMount() {
    axios.get(replace)
    axios.get(replace)
    axios.post(connect, { 
      "nodes":["http://127.0.0.1:8002","http://127.0.0.1:8001","http://127.0.0.1:8000"
    ]      
    })
  }
  handleClick(){
    this.setState({ open: true});
  }
  
  render() {
    return (

      <div className="App">
        {/* {this.open ? <> <Button variant="primary" size="lg" onClick={this.handleClick}>
          Block level button
        </Button>
       </> : */}
          <><Status />
          <Send /></>
        {/* } */}


      </div>
    );
  }
}

export default App;
