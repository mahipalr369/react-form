import React, { Component } from "react";
import { Row } from 'reactstrap';
import Form from './containers/form';
import List from './containers/list';

class Home extends Component {
    state = {
        list: []
    }

    handleSubmit = newItem => this.setState((prevState) => ({
        list: [...prevState.list, newItem]
    }));

    handleClearList = () => this.setState({ list: [] })

    render() {
        const { list } = this.state;
        return (
            <Row>
                <Form handleSubmit={this.handleSubmit} />
                <List list={list} handleClearList={this.handleClearList} />
            </Row>
        )
    }
}

export default Home;
