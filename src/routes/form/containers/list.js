import React from 'react';
import { Row, Col } from 'reactstrap';
import ListItem from '../components/listItem';

const List = ({ list = [], handleClearList }) => (
    <Col xs={12} md={6} lg={8}>
        <div className="panel">
            {list.length > 0 ?
                <Row>
                    <Col xs={12} className="text-right">
                        <button className="secondary" onClick={handleClearList}>Clear List</button>
                    </Col>
                    {list.map(p => <Col xs={12} md={6}>
                        <ListItem person={p} key={p.name} />
                    </Col>)}
                </Row>
                : <p className="margin-bottom-0x">List is empty. Please use the form to add people to the list.</p>}
        </div>
    </Col>
);

export default List;
