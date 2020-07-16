import React, { Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {hot} from "react-hot-loader"
import "./ZoomClick.css";
import { ZoomClickDropdown } from "./ZoomClickDropdowns"


class ZoomClick extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      users: [],
      meetings: [],
    }
  }

   componentDidMount() {
    fetch("http://localhost:5000/v1/users/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(
      data => {
          this.setState({
            isLoaded: true,
            users: data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    fetch("http://localhost:5000/v1/meetings/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            meetings: data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    const { error, isLoaded, users, meetings } = this.state;
    if(!isLoaded){
      return "Loading!"
    }
    else if(error) {
      return error
    }
    else{
      return(
        <div className="ZoomClick">
          <Container fluid>
            <Row>
              <Col md={6}>
                <ZoomClickDropdown items={users} dropdown_name='Users' field='user_name'/>
              </Col>
              <Col md={6}>
              <ZoomClickDropdown items={meetings} dropdown_name='Meetings' field='meeting_name'/>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default hot(module)(ZoomClick);
