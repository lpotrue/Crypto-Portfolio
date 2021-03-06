import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { decrement } from '../actions/auth';
import { updateEntry } from '../actions/decrement';

export class Decrement extends React.Component {

    componentDidMount() {
    }

    onSubmit(values) {
      
        console.log(values, this.props.selectedCoin);
        
        let submission = this.props.selectedCoin;

        submission.amount = values.amount(-1)
        return this.props.dispatch(updateEntry(submission));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <form
                className="decrement-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <br />
                
                    
            </form>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : ''
    };
};

Decrement = connect(
    mapStateToProps
    )(Decrement);

export default reduxForm({
    form: 'decrement',
    onSubmitFail: (errors, dispatch) => dispatch(focus('decrement', 'email'))
})(Decrement);






