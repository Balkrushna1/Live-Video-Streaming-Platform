import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component{

    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="error">* {error}</div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        return(
           <div className="form-group">
                <label>{label}</label> 
                {this.renderError(meta)}
                <input className="form-control" type="text" {...input}  autoComplete='off' />
                
           </div>
        );
    }

    onSubmit = (formProps) => {
        this.props.onSubmit(formProps);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput}  label="Enter title"></Field>
                <Field name="description" component={this.renderInput} label="Enter description"></Field>
                <button className="btn btn-success">Submit</button>
            </form>
        );
    }
}

const validate = (formProps) => {
    const error = {};

    if(!formProps.title){
        error.title = 'Title is must';
    }
    if(!formProps.description){
        error.description = 'Description is must';
    }
    return error;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);