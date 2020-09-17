import React from 'react';
import { transformPhoneInput } from "../../../helpers/functions";
import * as Constants from '../constants';

const ListItem = ({ person = {} }) => (
    <div className="panel border text-center">
        <div>{person[Constants.FIRST_NAME]}</div>
        <div>{person[Constants.EMAIL]}</div>
        <div>{transformPhoneInput(person[Constants.PHONE])}</div>
    </div>
)

export default ListItem;