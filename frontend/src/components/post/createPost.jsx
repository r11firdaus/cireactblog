import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header';
import Cookies from 'universal-cookie';

class createPost extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		//                 userid: '',
		//                 title:'',
		//                 content:'',
		//             };
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const cookie = new Cookies
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		}
	}

	//   handleChange(event) {
	// 	  const state = this.state
	// 	  state[event.target.id] = event.target.value
	// 	  this.setState(state);
	//   }

	handleSubmit(event) {
		const cookie = new Cookies
		let title = document.querySelector('#title').value;
		let content = document.querySelector('#content').value;
		event.preventDefault();
		fetch('http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/add_post', {
			method: 'POST',
			body: JSON.stringify({
				user_id: cookie.get('user_id'),
				post_title: title,
				post_content: content,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("New post saved successfully");
				this.props.history.push('/');
			}
		});
	}


	render() {
		return (
			<div>
				<Header />
				<main>
					<div class="card w-100 p-3 mx-auto mt-5">
						<Link to="/">Back</Link><br /><br /><br />
						<div class="card-body">
							<form onSubmit={this.handleSubmit}>
								<div class="mb-3">
									<label for="exampleFormControlInput1" class="form-label">Title</label>
									<input type="text" id='title' class="form-control" />
								</div>
								<div class="mb-3">
									<label for="exampleFormControlInput1" class="form-label">Content</label>
									<textarea id='content' class="form-control" he placeholder="Your content..." />
								</div>
								<button type="submit" class="btn btn-success">Save</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default createPost;