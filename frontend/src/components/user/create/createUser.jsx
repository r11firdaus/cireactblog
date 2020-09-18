import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';
import Cookies from 'universal-cookie';
import { Button } from '../../buton';

class createUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    name: '',
                    email:'',
                    password:'',
					phone:'',
					loading: false
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
	const cookie = new Cookies
	if (!cookie.get('user_password')) {
		this.props.history.push('/login');
	}
  }

  handleChange(event) {
	  const state = this.state
	  state[event.target.name] = event.target.value
	  this.setState(state);
  }

  handleSubmit(event) {
	  this.setState({loading: true})
	  event.preventDefault();
	  fetch('http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/add_user', {
			method: 'POST',
			body: JSON.stringify({
				user_name: this.state.name,
				user_email: this.state.email,
				user_password: this.state.password,
				user_phone: this.state.phone
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
				if(response.status === 200) {
                    this.props.history.push('/listuser');
				} else {
					this.setState({loading: false})
				}
			});
  }

  
  render() {
    return (
		<div>
			<Header />
			<main>
				<div class="card w-100 p-3 mx-auto mt-5">
					<Link to="/listuser">Back</Link><br /><br /><br />
					<div class="card-body">
						<form>
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Full Name</label>
								<input type="text" name='name' value={this.state.name} onChange={this.handleChange} class="form-control" id="exampleFormControlInput1" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Email address</label>
								<input type="email" name='email' value={this.state.email} onChange={this.handleChange} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Password</label>
								<input type="password" name='password' value={this.state.password} onChange={this.handleChange} class="form-control" id="exampleFormControlInput1" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Phone number</label>
								<input type="number" name='phone' value={this.state.phone} onChange={this.handleChange} class="form-control" id="exampleFormControlInput1" />
							</div>
							<Button onClick={this.handleSubmit} text='Save' loading={this.state.loading} />
						</form>
					</div>
				</div>
			</main>
		</div>
    );
  }
}

export default createUser;