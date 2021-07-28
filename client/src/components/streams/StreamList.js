import React from 'react'; 
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';


class StreamList extends React.Component{

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderListOptions({userId, id}){
        if(userId === this.props.userId){
            return (
                <span className="float-right">
                    <Link to={`/stream/edit/${id}`} className="btn btn-primary">EDIT</Link>  <Link to={`/stream/delete/${id}`} className="btn btn-danger">DELETE</Link>
                </span>
            );
        }
    }

    renderList(){
        const list = this.props.streams.map((stream)=>{
            return (
                <div className="media" key={stream.id}>
                    <img src="https://www.frsuu.org/wp-content/uploads/2019/12/streaming-icon-png-1.jpg.png" className="align-self-top mr-3" style={{width:'60px'}} alt="LiveStreams" />
                    <div className="media-body">
                        {this.renderListOptions(stream)}
                        <h4><Link to={`/stream/${stream.id}`}>{stream.title}</Link></h4>
                        <p>{stream.description}</p>
                        <hr />
                    </div>
                </div>
            );
        });

        return list;
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return (<div className="float-right">
                <Link to="/stream/create" className="btn btn-primary">Create Stream</Link>
            </div>);
        }
    }

    render(){
        return (
            <div className="container">
                <h3 className="row text-center">Streams</h3>
                <hr />
                {this.renderList()}
                {this.renderCreate()}
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        streams: Object.values(state.streams),
        userId : state.auth.userId,
        isSignedIn : state.auth.isSignedIn
    };
};

export default connect(mapPropsToState, {fetchStreams})(StreamList);