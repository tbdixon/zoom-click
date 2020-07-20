import React, { Component } from "react";
import {Form, Button} from 'react-bootstrap'

/* Add validation here... e.g do things like users exist, error handling would be nice */

export class ZoomClickMeetingForm extends Component {
    render() {
        return(
            <Form>
            <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group controlId="formUserAlias">
                <Form.Label>User Alias</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        )
    }
}

/* Make user name a drop down from the DB */
export class ZoomClickUserForm extends Component {
    render() {
        return(
            <Form>
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
            <Form.Group controlId="formMeetingUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Meeting
            </Button>
            </Form>
        )
    }
}
