import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../header';
import Cookies from 'universal-cookie';

class updateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			email: '',
			password: '',
			phone: '',
			isAdmin: false,
			ready: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const cookie = new Cookies
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		}
		if (cookie.get('user_status') == '1') {
			this.setState({ ready: true })
		}
		this.loadData();
	}

	loadData = () => {
		const cookie = new Cookies
		if (this.state.isAdmin) {
			this.setState({ ready: true })
		}
		if (cookie.get('user_id') == this.props.match.params.id) {
			this.setState({ ready: true })
		}
		fetch(`http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/user?user_id=${this.props.match.params.id}`)
			.then(response => {
				return response.json();
			}).then(result => {
				if (this.state.ready) {
					this.setState({
						id: result.user_id,
						name: result.user_name,
						email: result.user_email,
						password: result.user_password,
						phone: result.user_phone
					});
				} else {
					return null
				}
			});
	}

	handleChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/update_user', {
			method: 'PUT',
			body: JSON.stringify({
				user_id: this.state.id,
				user_name: this.state.name,
				user_email: this.state.email,
				user_password: this.state.password,
				user_phone: this.state.phone
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Website update successfully.");
				this.props.history.push('/listuser');
				// this.setState({ready:false})
			}
		});
	}


	render() {
		return (
			<div>
				<Header />
				<main>
					{
						this.state.ready ?
							<div class="card w-100 p-3 mx-auto mt-5">
								<Link to="/listuser">Back</Link><br /><br />
								<div class='card-body'>
									<form onSubmit={this.handleSubmit}>
										<div class='mb-3'>
											<label>Name</label><br />
											<input type="text" name="name" value={this.state.name} onChange={this.handleChange} class='form-control' placeholder="Full Name..." />
										</div>
										<div class='mb-3'>
											<label>Phone</label><br />
											<input type="number" name="phone" value={this.state.phone} onChange={this.handleChange} class='form-control' placeholder="Phone..." />
										</div>
										<div class='mb-3'>
											<label>Email</label><br />
											<input type="text" name="email" value={this.state.email} onChange={this.handleChange} class='form-control' placeholder="Email..." />
										</div>
										<div class='mb-3'>
											<label>Password</label><br />
											<input type="password" name="password" value={this.state.password} onChange={this.handleChange} class='form-control' placeholder="Password..." />
										</div>
										<button type="submit" class="btn btn-success">Save</button>
									</form>
								</div>
							</div> :
							<div className='alert alert-danger alert-dismissible fade show' role='alert' style={{ margin: 'auto' }}>
								<strong>Unknown error.</strong>
							</div>
					}
				</main>
			</div>
		);
	}
}

export default updateUser;