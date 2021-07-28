import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions'
import history from '../history';

class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '88089057686-oma60r2el9q24563gaebkqcotj9orafs.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setAuth(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.setAuth);
            });
        });
    }

    setAuth = isSignedIn => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignOut = () => {
        this.auth.signOut();
        history.push('/');
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null)
            return null;
        else if(this.props.isSignedIn){
            return <span className="sign out  btn-danger" onClick={this.onSignOut}><i className="fab fa-google"></i> Sign Out</span>;
        }else{
            return <span className="sign in" onClick={this.onSignIn}><i className="fab fa-google"></i> Sign In with Google</span>;
        }
    }

    render(){
        return (
            <>
              {this.renderAuthButton()} 
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn : state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);