import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { getErrorMessage, confirmConstraints } from '../../../helpers/utilities';
import { getRequiredField, getEmailRequiredField, getPhoneRequiredField } from '../../../helpers/constraintHelper';
import UIInputField from '../../../components/UIInputField';
import * as Constants from '../constants';

class Form extends Component {
    state = {
        [Constants.FIRST_NAME]: "",
        [Constants.EMAIL]: "",
        [Constants.PHONE]: ""
    }

    runValidations = state => {
        let v = {};
        v[Constants.FIRST_NAME] = getRequiredField();
        v[Constants.EMAIL] = getEmailRequiredField(state[Constants.PHONE]);
        v[Constants.PHONE] = getPhoneRequiredField(state[Constants.EMAIL]);

        return confirmConstraints(state, v);
    }

    handleSubmit = () => {
        const { firstName, email, phone } = this.state;
        const validations = this.runValidations(this.state);
        if (validations) {
            this.setState({ error: validations })
        } else {
            delete this.state.error;
            this.setState({
                [Constants.FIRST_NAME]: "",
                [Constants.EMAIL]: "",
                [Constants.PHONE]: ""
            }, () => this.props.handleSubmit({
                firstName, email, phone
            }))
        }
    }

    handleChange = (key, value) => this.setState({ [key]: value })

    render() {
        const { firstName, email, phone } = this.state;
        const isEmailPhoneRequired = (email || phone) ? false : true;
        return (
            <Col xs={12} md={6} lg={4}>
                <div className="panel">
                    <UIInputField
                        name={Constants.FIRST_NAME}
                        label={"First Name:"}
                        required={true}
                        value={firstName}
                        handleChange={this.handleChange}
                        errorMessage={getErrorMessage(Constants.FIRST_NAME, this.state.error)} />
                    <UIInputField
                        name={Constants.EMAIL}
                        label={"Email:"}
                        type="email"
                        required={isEmailPhoneRequired}
                        value={email}
                        handleChange={this.handleChange}
                        errorMessage={getErrorMessage(Constants.EMAIL, this.state.error)} />
                    <UIInputField
                        name={Constants.PHONE}
                        label={"Phone:"}
                        type="tel"
                        required={true}
                        value={phone}
                        handleChange={this.handleChange}
                        errorMessage={getErrorMessage(Constants.PHONE, this.state.error)} />
                    <div className="text-left margin-top-2x">
                        <button onClick={this.handleSubmit} className="margin-bottom-0x">Add to the list</button>
                    </div>
                </div>
            </Col>
        );
    }
}

export default Form;
