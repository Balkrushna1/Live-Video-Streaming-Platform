import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import {fetchStream} from '../../actions'

class StreamShow extends React.Component{

    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);

        this.loadPlayer();
    }

    componentDidUpdate(){
        this.loadPlayer();
    }

    loadPlayer(){
        if(this.player || !this.props.stream)
            return;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,

        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderShow(){
        if(!this.props.stream){
            return <h4 className="text-center">Loading.....</h4>
        }
        return (
            <div>
                <video ref={this.videoRef} controls></video>
                <h2>{this.props.stream.title}</h2><br />
                <h5>{this.props.stream.description}</h5>
            </div>
        );
    }

    render(){
        return (
            <div className="container streamShow">
                {this.renderShow()}
            </div>
        );
    }
}

const mapPropsToState = (state,props) => {
    return {
        stream : state.streams[props.match.params.id]
    };
};

export default connect(mapPropsToState, {fetchStream})(StreamShow);