import React, { Component } from "react";
import Header from "../header";
import { Link } from "react-router-dom";
import MyPost from "./myPost";
import Cookies from "universal-cookie";

class myProfile extends Component {
    state = {
            id:'',
            name:'',
            email:'',
            phone:''
    }
    componentDidMount() {
        const cookie = new Cookies
        if (!cookie.get('user_id')) {
            this.props.history.push('/login');
        } else {
            // fetch(`http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/user?user_id=${this.props.match.params.id}`)
            fetch(`http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/user?user_id=${cookie.get('user_id')}`)
		.then(response => {
            return response.json();
		}).then(result => {
            this.setState({
                id:result.user_id,
                name:result.user_name,
                email:result.user_email,
                phone:result.user_phone
			});
		});
    }
}
    render() {
        return(
            <div>
                <Header />
                <main style={{ marginTop: '120px'}}>
                    <h3>{this.state.name}</h3>
                    <Link to={`../update/${this.state.id}`}>Update your profile</Link><br/><br/>
                    <table class='table table-unbordered' style={{ margin: 'auto', fontSize: '18px'}}>
                            <tr>
                                <td>ID</td>
                                <td>{this.state.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{this.state.phone}</td>
                            </tr>
                    </table><br/><br/><br/>
                    <h3>Your Post</h3>
                    <MyPost />
                </main>
            </div>
        )
    }
}

export default myProfile;