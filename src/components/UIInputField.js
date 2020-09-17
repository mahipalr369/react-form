import React, { Component } from 'react';
import { transformPhoneInput } from '../helpers/functions';

class UIInputField extends Component {
    state = {
        value: this.props.defaultValue || ""
    }

    static getDerivedStateFromProps(props, state) {
        const currentValue = state.value;
        const newValue = props.value;
        if(currentValue !== newValue) return { value: newValue };
        else return null;
    }

    getErrorDetails = (name, errorMessage) => {
        if(!errorMessage || errorMessage==null) return null;
        else {
            let errorStr = "Error: " + errorMessage;
            return <div role="alert" id={`${name}-error`} className="error" >
                {errorStr}
            </div>
        }
    }

    onChange = (event) => {
        const { name, handleChange } = this.props;
        event.preventDefault();
        if(handleChange) handleChange(name, event.target.value)
        else this.setState({ value: event.target.value})
    }

    render(){
        const {
            name,
            type,
            required,
            label,
            labelClass,
            inputClass,
            errorMessage
        } = this.props;
        const { value } = this.state;
        
        let formattedValue = value;
        if(type==="tel") formattedValue = transformPhoneInput(value);

        const labelField = (
            <label className={labelClass} htmlFor={name}>
                {label}
            </label>
        )
        const inputField = (
            <input 
                id={name}
                autoComplete={"off"}
                type={type}
                className={inputClass}
                required={required}
                value={formattedValue}
                onChange={this.onChange}
                pattern="[0-9]*"
            />
        )
        const errorField = this.getErrorDetails(name, errorMessage)
        return (
            <div className="input-field">
                {label && labelField}
                {inputField}
                {errorField}
            </div>
          );
    }

    static defaultProps = {
        type: "text",
        required: "false",
        labelClass: "block",
        inputClass: "block",
        label: "",
        errorMessage: ""
    }
}

export default UIInputField;
