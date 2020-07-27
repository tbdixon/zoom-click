import React, { Component } from "react";
import {Form, Button} from 'react-bootstrap'

export class ZoomClickUserForm extends Component {
    render() {
        let createUser = (event) => {
            let body = JSON.stringify({
                user_name: event.target.elements.formUserName.value,
                user_alias: event.target.elements.formUserAlias.value
            })
            fetch("http://localhost:5000/v1/users/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json'
                },
                body
            })
        }
        
        return(
            <Form onSubmit={createUser}>
            <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formUserAlias">
                <Form.Label>User Alias</Form.Label>
                <Form.Control/>
            <Button type="submit">
                Create User
            </Button>
            </Form.Group>
            </Form>
        )
    }
}

export class ZoomClickMeetingForm extends Component {
    render() {
        let createMeeting = (event) => {
            let body = JSON.stringify({
                meeting_id: event.target.elements.formMeetingID.value,
                meeting_pw: event.target.elements.formMeetingPW.value,
                user_name: event.target.elements.formMeetingUserName.value,
                meeting_name: event.target.elements.formMeetingName.value,
                meeting_company: event.target.elements.formMeetingCompany.value
            })
            fetch("http://localhost:5000/v1/meetings/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json'
                },
                body
            })
        }
        
        return(
            <Form onSubmit={createMeeting}>
            <Form.Group controlId="formMeetingID">
                <Form.Label>Meeting ID</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formMeetingPW">
                <Form.Label>Meeting Password</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formMeetingName">
                <Form.Label>Meeting Name</Form.Label>
            <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formMeetingCompany">
                <Form.Label>Meeting Company Domain</Form.Label>
            <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formMeetingUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control as="select" className="my-1 mr-sm-2" id="formMeetingUserName" custom>
                {
                    this.props.users.map(user => <option value={user.user_name}>{user.user_name}</option>)
                }
                </Form.Control>
                <Button type="submit">
                Create Meeting
                </Button>
            </Form.Group>
            </Form>
        )
    }
}
