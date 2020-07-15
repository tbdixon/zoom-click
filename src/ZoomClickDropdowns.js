import React, { Component} from "react";
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

export class ZoomClickDropdown extends Component {
    render() {
        let name = this.props.dropdown_name.toLowerCase()
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
                    (item) => (
                        <Dropdown.Item eventKey={item[this.props.field]} key={item[this.props.field]}>{item[this.props.field]}</Dropdown.Item>
                    )
                )}
            </DropdownButton>
            </>
        )
    }
}