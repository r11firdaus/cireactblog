import React, { Component } from "react";
import { Link } from "react-router-dom";
import './header.css';
import Cookies from "universal-cookie";
// import { actionLogOut } from "../config/redux/action";
// import { connect } from "react-redux";

class Header extends Component {

    logOut = () => {
        // this.props.changeLogOut()
        const cookies = new Cookies();
        cookies.remove('user_id')
        cookies.remove('user_password')
        cookies.remove('user_status')
        cookies.remove('user_email')
        cookies.remove('user_name')
    }

    render() {
        const cookies = new Cookies();
        const datauser = cookies.getAll()
        return (
            <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link to='/' class="navbar-brand mx-auto">FakeBlog</Link>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                            {
                                datauser.user_password ?
                                <ul class="navbar-nav mb-auto mb-2 mb-md-0 ml-2">
                                    <li class="nav-item">
                                        <Link to={`/myprofile/${datauser.user_id}`} class="nav-link" id='link'>My Profile</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/listuser' class="nav-link" id='link'>User</Link>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id='link'>Statistic</a>
                                    </li>
                                </ul> : null
                            }
                        
                    <form class="d-flex mt-2 ml-2">
                        <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                    <ul class="navbar-nav mb-auto mb-2 mb-md-0 ml-2">
                            <li class="nav-item">
                                {
                                    datauser.user_password ?
                                    <Link to='/login' class="nav-link" onClick={this.logOut} id='link'>Logout</Link> :
                                    <Link to='/login' class="nav-link" onClick={this.logOut} id='link'>Login</Link>
                                }
                            </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

// const reduxState = state => ({
//     isLoginProps: state.isLogin
// })

// const reduxDispatch = dispatch => ({
//     changeLogOut: () => dispatch(actionLogOut())
// })

// export default connect(reduxState, reduxDispatch) (Header);
export default Header;