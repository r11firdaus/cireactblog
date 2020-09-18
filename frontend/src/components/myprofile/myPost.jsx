import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../post.css';

class MyPost extends Component {
	constructor(props) {
		super(props);
		this.state = {posts: []};
		this.deletePost = this.deletePost.bind(this);
	}
	
	componentDidMount() {
		const cookie = new Cookies();
		if (!cookie.get('user_password')) {
			this.props.history.push('/login');
		}
		this.loadData();
	}
    
    loadData() {
		const cookie = new Cookies
        fetch(`http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/userpost?user_id=${cookie.get('user_id')}`)
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					posts:result
			});
		});
    }
	
	deletePost(id, title) {
		const cookie = new Cookies();
		if (this.state.posts.user_id = '') {
			alert('You must login to continue.')
        }
        if (this.state.user_id = cookie.get('user_id')) {
			if(window.confirm(`Delete '${title}'?`)) {
				fetch(`http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/delete_post/${id}`, {
									method : 'DELETE'
									   }).then(response => { 
						if(response.status === 200) {
							alert("Post deleted successfully");
							this.loadData();
						} 
				 });
			}
        } else {
            alert('Action aborted !')
		}
	}
	
	render() {
		const cookie = new Cookies();
		return (
			<div>
					{
						cookie.get('user_id') ?
						<Link to="/createpost">+ Add Post</Link> : null
					}
                    {
                        this.state.posts.map(function(p) {
                            return(
                                <div className='card mb-5 mt-5' id='beda' key={p.id}>
                                    <div className='card-header' id='bedahead'>
                                        <h5>{p.post_title}</h5>
                                        <p>{p.post_date}</p>
                                    </div>
                                    <div className='card-body' id='bedabody'>
                                        <p>{p.post_content}</p>
										{
											cookie.get('user_password') ?
											<div>
												<a href="javascript:void(0)" onClick={this.deletePost.bind(this, p.post_id, p.post_title)} class="btn btn-light">Delete</a>
												<Link to={`/updatepost/${p.post_id}`} class="btn btn-success">Edit</Link>
											</div> : null
										}
                                    </div>
                                </div>
                            )
                        }.bind(this))
                    }
			</div>
		)
	}
}

export default MyPost;