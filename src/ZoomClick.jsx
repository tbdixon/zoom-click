import React, { Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {hot} from "react-hot-loader"
import "./ZoomClick.css";
import { ZoomClickDropdown } from "./ZoomClickDropdowns.jsx";
import { ZoomClickMeetingForm, ZoomClickUserForm } from "./ZoomClickForms.jsx";


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
  /* The two fetch calls should be chained, isLoaded probably has a race condition but this isn't robust */
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

  /* The rendering and usage of things like <br> is hideous here, but all the necessary buttons exist... can clean up this bit later */
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
          <Row className="justify-content-md-center">
              <Col>
                <ZoomClickDropdown items={users} dropdown_name='Join by Meeting Owner' field='user_name'/>
              </Col>
              <Col>
              <ZoomClickDropdown items={meetings} dropdown_name='Join by Meeting Name' field='meeting_name'/>
              </Col>
          </Row>
          <Row>
              <Col>
              <br/><br/>
              <h1>
                {"Create a new meeting"}
              </h1>
              <br/><br/> 
                <ZoomClickMeetingForm/>
              </Col>
              <Col>
              <br/><br/>
              <h1>
              {"Create a new user"}
              </h1>
                <br/><br/> 
                <ZoomClickUserForm/>
              </Col>
          </Row>
          </Container>
        </div>
      );
    }
  }
}

export default hot(module)(ZoomClick);
