import React from 'react';
import { connect } from 'react-redux';
import { deleteStream, fetchStream } from '../../actions';
import history from '../../history';

class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id)
    };

    onCancel = () => {
        history.push('/');
    };

    renderDelete(){
        if(!this.props.stream){
            return <h4 className="text-center">Loading.....</h4>
        }
        return (
            <div className="w-50 m-auto">
                <h5 className="text-center"> Are you sure you want to delete stream with title : </h5>
                <h3 className="text-center">
                   "{this.props.stream.title}"
                </h3>
                <div className="text-center">
                    <button onClick={this.onDelete} className="btn btn-danger">Delete</button>   <button onClick={this.onCancel} className="btn btn-primary">Cancel</button>
                </div>
            </div>
        );
    }

    render(){
        return (
            <>{this.renderDelete()}</>
        );
    }
}

const mapPropsToState = (state, props) => {
    return {
        stream : state.streams[props.match.params.id]
    };
};


export default connect(mapPropsToState, {deleteStream, fetchStream} )(StreamDelete);