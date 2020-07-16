import React, { Component, useState } from "react";
import { DropdownButton, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';

export class ZoomClickDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: props.items.reduce((output, item) => { output[item[props.field]] = false; return output; }, {})
        }
    }

    render() {
        let name = this.props.dropdown_name.toLowerCase()
        let open_modal = (field_name) => {
            this.setState(prevState => ({
                show: {                   
                    ...prevState.show,    
                    [field_name]: true       
                }
            }))
            console.log("Open Modal")
        }
        let close_modal = (field_name) => {
            this.setState(prevState => ({
                show: {                   
                    ...prevState.show,    
                    [field_name]: false       
                }
            }))
            console.log("Close Modal")
        }
        return (
            <>
            <DropdownButton
                as={ButtonGroup}
                key={name}
                id={name}
                title={this.props.dropdown_name}
                variant='primary'
            >
                {this.props.items.map(
                    item => {
                        let field_name = item[this.props.field]
                        return(<Dropdown.Item eventKey={field_name} key={field_name} onClick={() => open_modal(field_name)}>
                            {
                            <>    
                                {field_name}
                                <Modal show={this.state.show[field_name]} onHide={() => close_modal(field_name)}>
                                <Modal.Header closeButton>
                                <Modal.Title>Meetings</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Render a list of meetings as a component here</Modal.Body>
                                </Modal>  
                            </>
                            }
                    
                        </Dropdown.Item>)
                    }
                )}
            </DropdownButton>
            </>
        )
    }
}