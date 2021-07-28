import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {editStream, fetchStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formProps) => {
        this.props.editStream(this.props.match.params.id ,formProps);
    }

    render(){
        return (
            <div className="container">
                <h3>Edit a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        );
    }
}

const mapPropsToState = (state, props) => {
    return {
        stream : state.streams[props.match.params.id]
    };
};

export default connect(mapPropsToState, {
    editStream, fetchStream
})(StreamEdit);