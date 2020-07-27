import React, { Component } from "react";
import { DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';

export default class ZoomClickMeeting extends Component {
    render() {
            let copy_pw = (pw) => navigator.clipboard.writeText(pw);
            return(
                    <>
                        { 
                            this.props.meetings.map(meeting => 
                                <>
                                <a href={`https://${meeting.meeting_company}.zoom.us/s/${meeting.meeting_id}`} target="_blank" onClick={() => copy_pw(meeting.meeting_pw)}>
                                {meeting.meeting_name}
                                </a>
                                <br></br>
                                </>
                            )
                        }
                    </>
            )
    }
}