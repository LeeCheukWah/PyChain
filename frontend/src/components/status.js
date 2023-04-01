import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col,Button  } from 'react-bootstrap';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const endpoint = '/get_chain'
const mint = '/mine_block'

class Status extends Component {
  constructor(props){
    super(props);
    this.state = {
      length: [],
      address: '',
    }
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(){
    axios.get(mint)  
    window.location.reload()
  }
  componentDidMount() {
    axios.get(endpoint)
      .then(res => {
        const length = res.data.length;
       // const address = res.data.chain[1].transactions[0].receiver;
       const address = res.data.address;
        this.setState({ length, address });
      })
  }
  render(){
    return (
      
    <Container>
    <br/>
    <Row>
    <Col sm="6">
  <h5> <div></div> Mined Blocks Number: </h5> <hr/>
 <h5 style={{color: '#007bff'}}>#<b>{this.state.length} </b></h5>
 <Button variant="primary" onClick={this.handleClick}>Click To Mint</Button>

    </Col>

    <Col md="6"> <br/>
    <h5> <div>Node Address (sync <a href=""><i className="fa fa-refresh"></i></a> )</div></h5> <hr/>
      <h5 style={{color: '#007bff'}}>{this.state.address}</h5>
    </Col >
    </Row>
    <br/><br/><br/>
    </Container>
    );
  }
}

export default Status;
