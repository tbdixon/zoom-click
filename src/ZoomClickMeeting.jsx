import React, { Component } from "react";
import { DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';

export default class ZoomClickMeeting extends Component {
    render() {
            console.log(this.props.meetings)
            let copy_pw = (pw) => navigator.clipboard.writeText(pw);
            return(
                    <>
                        { 
                            this.props.meetings.map(meeting => 
                                <>
                                <a href={`https://goldmansachs.zoom.us/my/${meeting.meeting_id}?pwd=${meeting.meeting_password}`} target="_blank" onClick={() => copy_pw(meeting.meeting_pw)}>
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