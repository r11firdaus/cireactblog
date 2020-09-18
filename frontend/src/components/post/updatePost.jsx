import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header';
import Cookies from 'universal-cookie';

class updatePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			title: '',
			content: '',
			date: '',
			user: '',
			loadForm: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const cookie = new Cookies
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		} else {
			this.loadData();
		}
	}

	loadData() {
		const cookie = new Cookies
		fetch(`http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/post?post_id=${this.props.match.params.id}`)
			.then(response => {
				return response.json();
			}).then(result => {
				if (cookie.get('user_id') !== result.user_id) {
					this.props.history.push('/');
				} else {
					this.setState({
						id: result.post_id,
						title: result.post_title,
						content: result.post_content,
						date: result.post_date,
						user: result.user_id,
						loadForm: true
					});
				}
			});
	}

	handleChange(event) {
		const state = this.state
		state[event.target.id] = event.target.value
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/update_post', {
			method: 'PUT',
			body: JSON.stringify({
				user_id: this.state.user,
				post_id: this.state.id,
				post_title: this.state.title,
				post_content: this.state.content,
				post_date: this.state.date
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("Post update successfully.");
				this.setState({loadForm: false})
				this.props.history.push('/');
			}
		});
	}


	render() {
		return (
			<div>
				<Header />
				<main>
					{
						this.state.loadForm ?
							<div class="card w-100 p-3 mx-auto mt-5">
								<Link to="/">Back</Link><br /><br />
								<div class='card-body'>
									<form onSubmit={this.handleSubmit}>
										<div class='mb-3'>
											<label>Title</label><br />
											<input type="text" id="title" value={this.state.title} onChange={this.handleChange} class='form-control' required />
										</div>
										<div class='mb-3'>
											<label>content</label><br />
											<textarea id="content" value={this.state.content} onChange={this.handleChange} class='form-control' />
										</div>
										<button type="submit" class="btn btn-success">Save</button>
									</form>
								</div>
							</div> : null
					}
				</main>
			</div>
		);
	}
}

export default updatePost;