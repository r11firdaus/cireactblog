import React, { Component } from "react";
import "./login.css";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { actionLogin } from "../../config/redux/action";
import { Button } from "../buton";

class Login extends Component {
    state = { loginFalse: false }

    componentDidMount() {
        const cookies = new Cookies()
        if (cookies.get('user_id') && cookies.get('user_password')) {
            this.props.history.push('/');
        }
    }

    handleSubmit =async e => {
        const userid = document.querySelector('#id').value;
        const userpass = document.querySelector('#password').value;
        const data = {userid, userpass}
        await this.props.changeLoading(data)
        // console.log(this.props.isloginProps)
              
        if (this.props.isloginProps) {
            this.props.history.push('/')
        } else {
            this.setState({loginFalse: true})
        }
        fetch('http://localhost/ci3-reactjs-crud/index.php/loginrestcontroller/login', {
            method: 'post',
            body: JSON.stringify({
                user_id: userid,
                user_password: userpass,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    const cookies = new Cookies();
                    cookies.set('user_id', data.user[0].user_id, { path: '/' });
                    cookies.set('user_name', data.user[0].user_name, { path: '/' });
                    cookies.set('user_password', data.user[0].user_password, { path: '/' });
                    cookies.set('user_email', data.user[0].user_email, { path: '/' });
                    cookies.set('user_status', data.user[0].user_status, { path: '/' });
                })
                this.props.history.push('/');
            } else {
                this.setState({ loading: false, loginFalse: true })
            }
        })
        e.preventDefault()
    }

    render() {
        let warning;
        if (this.state.loginFalse) {
            warning = (
                <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                    <strong>ID</strong> or <strong>Password</strong> is incorrect.
                </div>
            )
        }
        return (
            <div>
                {warning}
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">ID</label>
                    <input type="text" id='id' className="form-control" placeholder="ID" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id='password' className="form-control" placeholder="Password" required />
                    {/* <Button onClick={this.handleSubmit} text='Login' loading={this.state.loading} /> */}
                    <Button onClick={this.handleSubmit} text='Login' loading={this.props.isloadingProps} />
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
                </form>
            </div>
        )
    }
}



const reduxState = state => ({
    isloginProps: state.isLogin,
    isloadingProps: state.isLoading,
})

const reduxDispatch = dispatch => ({
    changeLoading: data => dispatch(actionLogin(data))
})


export default connect(reduxState, reduxDispatch)(Login);