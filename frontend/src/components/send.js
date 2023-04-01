import React, { Component } from 'react';
import { Form, Container, Col, Row, Button,Table } from 'react-bootstrap';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const postEndpoint = '/app_add_transaction'
const getEndpoint = '/get_chain'
class Send extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      amount: 0,
      time: '',
      index: '',
      transactions: [],
      coins:0,
      adress:''
    }
    this.handleRecipient = this.handleRecipient.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRecipient(event){
    this.setState({ recipient: event.target.value});
  }
  handleAmount(event){
    this.setState({ amount: event.target.value});
  }
  componentDidMount() {
    axios.get(getEndpoint)
      .then(res => {
        const index = res.data.index;
        this.setState({ index });
        const address = res.data.address;
        this.setState({ address });
        const transactions = res.data.chain;
        this.setState({ transactions });
        var amount = 0;
        this.state.transactions.slice(0).reverse().map(transaction =>
          transaction.transactions.map(   
            t =>
            
           { if(t.txOuts.address===address){
            amount=amount+t.txOuts.amount}
           else if(t.txIns.signature==="sign("+address+")"){
            console.log('-'+t.txOuts.amount)
            amount=amount-t.txOuts.amount
           } }  
           
        ))
       
        this.setState({ coins:amount});        
      })
    }
 
    // handleSubmit(event) {
    //   event.preventDefault();
  
    //     axios.post(postEndpoint, { "Sending": this.state.sender,
    //     "receiver": this.state.recipient,
    //     "amount": this.state.amount,
    //     "time": this.state.time })
    //      .then(res => {
    //        console.log(res);
    //        console.log(res.data);
    //      })
    // }

  handleSubmit(event) {
    if( this.state.recipient===''||this.state.amount===''){
      alert("Input cannot be empty!")
    }else{
    event.preventDefault();
      axios.post(postEndpoint, { 'id':this.state.recipient+this.state.amount+this.state.index ,              
      'txIns': "",
      'txOuts': {"address":  this.state.recipient,      
        "amount": Number(this.state.amount),
    }})
       .then(res => {
         console.log(res);
         console.log(res.data);
       })
       alert("Sent! Transaction will be displayed in next block")
       window.location.reload()
      }
  }

  // def add_transaction(self, id, txIns, txOut): #New
  // self.transactions.append({'id': id,              
  //                           'txIns': txIns,
  //                           'txOuts': txOut})
  // previous_block = self.get_last_block()
  // return previous_block['index'] + 1
 
  render(){
    return (
      <Tabs
      defaultActiveKey="Transactions"
      id="uncontrolled-tab-example"
      className="mb-3"
      justify="true"
    >
        <Tab eventKey="Transactions" title="Transactions">
              <Container>
      <h3><b> Transactions </b></h3> 
      <h4 style={{color:"Green"}}><b> Your Dummy Coins: {this.state.coins}</b></h4> 

      <p>(Sync to get the latest transactions in the blockchain)</p>
      <Table responsive>
  <thead>
  <tr>
    
      <th>txID</th>
      <th>From</th>
      <th>To</th>
      <th>Amount (Dummy)</th>
    </tr>
  </thead>
  <tbody>
  { this.state.transactions.slice(0).reverse().map(transaction =>
    transaction.transactions.map(
      t =>
     <tr key={t}>
      <td><b style={{color: '#007bff'}}>{t.id.slice(0,24)+"..."}</b></td>
      <td><b style={{color: '#007bff'}}>{t.txIns.signature}</b></td>
      <td><b style={{color: '#007bff'}}>{t.txOuts.address} </b></td>
      <td><b style={{color: '#007bff'}}>{t.txOuts.amount}</b></td>
    </tr>
  ))}
    </tbody>
    </Table>
      </Container>
      </Tab>
  <Tab eventKey="Sending" title="Sending">
 
        <Container>
  <br/>
  <h3><b>DummyCoin</b></h3>
  <h4><b style={{color: '#007bff'}}>Send unlimited dummy crypto to anyone.</b> </h4>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row}>
         <Form.Label column sm="2">
           Recipient
         </Form.Label>
         <Col sm="8">
           <Form.Control onChange={this.handleRecipient} value={this.state.recipient} placeholder="Enter Recipient Address" />
         </Col>
       </Form.Group>
       <Form.Group as={Row}>
        <Form.Label column sm="2">
          Amount
        </Form.Label>
        <Col sm="2">
          <Form.Control onChange={this.handleAmount} placeholder="Amount" value={this.state.amount} />
        </Col>
        <Col sm="0.5"><b> Dummy </b></Col>
      </Form.Group>
      <Form.Group as={Row}>
      <Col sm="5">
      <Button variant="primary" type="submit">
    Send
  </Button>
  </Col>
  </Form.Group>
     </Form>
     <br/><br/>
      </Container>
      </Tab>
    
      </Tabs> 
    );
  }
}

export default Send;
