import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../header'
import Cookies from 'universal-cookie';

class listUser extends Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
		this.headers = [
			{ key: 'user_id', label: 'Id'},
			{ key: 'user_name', label: 'Name' },
			{ key: 'user_email', label: 'Email' },
			{ key: 'user_phone', label: 'Phone' }
		];
		this.deleteUser = this.deleteUser.bind(this);
	}
	
	componentDidMount() {
		const cookie = new Cookies
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		}
		this.loadData();
	}
    
    loadData() {
        fetch('http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/users')
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					users:result
			});
		});
    }	
	
	deleteUser(id) {
		const cookie = new Cookies
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		}
		if(window.confirm("Are you sure want to delete?")) {
			fetch(`http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/delete_user/${id}`, {
                                method : 'DELETE'
                                   }).then(response => { 
					if(response.status === 200) {
						alert("User deleted successfully");
                        this.loadData();
					}
			 });
		}
	}
	
	render() {
		const cookie = new Cookies
		return (
			<div>
				<Header />
				<main>
				{
					cookie.get('user_status') == '1' ?
					<Link to="/create">+ Add User</Link> : null
				}
					<div class='table-responsive'>

						<table class='table table-bordered'>
							<thead>
								<tr>
								{
									this.headers.map(function(h) {
										return (
											<th scope='col' key={h.key}>{h.label}</th>
										)
									})
								}
								{
									cookie.get('user_status') == '1' ?
									<th scope='col' colSpan='2'>Actions</th> : null
								}
								</tr>
							</thead>
							<tbody>
								{
									this.state.users.map(function(item, key) {
									return (
										<tr scope='row' key = {key}>
										<td>{item.user_id}</td>
										<td>{item.user_name}</td>
										<td>{item.user_email}</td>
										<td>{item.user_phone}</td>
										{
											cookie.get('user_status') == '1' ?
											<td>
													<Link to={`/update/${item.user_id}`}>Edit</Link>
											</td> : null
										}
										{
											cookie.get('user_status') == '1' ?
											<td>
													<a href="javascript:void(0);" onClick={this.deleteUser.bind(this, item.user_id)}>Delete</a>
											</td> : null
										}
										</tr>
									)}.bind(this))
								}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		)
	}
}

export default listUser;