import React, { Component, useState } from "react";
import { DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';
import ZoomClickMeeting from "./ZoomClickMeeting.jsx"

export class ZoomClickDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: props.items.reduce((output, item) => { output[item[props.field]] = false; return output; }, {})
        }
    }

    render() {
        let name = this.props.dropdown_name.toLowerCase()
        let getMeetings = (item) => {
            let url = "http://localhost:5000/v1/meetings/" + "?" + this.props.field + "=" + item[this.props.field]
            return(
                fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            )
        }
        let open_modal = (field_name, item) => {
            getMeetings(item)
            .then(response => response.json())
            .then(meeting => {
                this.setState(prevState => {
                    return (
                        {
                        meetings: {
                            ...prevState.meetings,
                            [field_name]: meeting
                        },
                        show: {                   
                            ...prevState.show,
                            [field_name]: true  
                        }
                    })
                })
            })
        }
        let close_modal = (field_name) => {
            this.setState(prevState => {
                delete prevState.show[field_name];
                return (
                    {
                    show: {                   
                        ...prevState.show,
                        [field_name]: false 
                    }
                })})
        }
        
        // Create DropdownButton with items that have call-back to open_modals created after the dropdown menu
        return (
            <>
            <DropdownButton
                as={ButtonGroup}
                key={name}
                id={name}
                title={this.props.dropdown_name}
                variant='primary'
            >
                {
                    this.props.items.map( item => {
                        let field_name = item[this.props.field]
                        return(<Dropdown.Item eventKey={field_name} key={field_name} onClick={() => open_modal(field_name, item)}>{field_name}</Dropdown.Item>)
                    })
                }
            </DropdownButton>
            {
                this.props.items.map( item => {
                    let field_name = item[this.props.field]
                    return(
                            this.state.show[field_name] &&
                            <Modal show={this.state.show[field_name]} onHide={() => close_modal(field_name)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Meetings</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><ZoomClickMeeting meetings={this.state.meetings[field_name]}/></Modal.Body>
                            </Modal>  
                    )
                })
            }
            </>
        )
    }
}