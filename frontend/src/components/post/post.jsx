import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../header'
import './post.css';
import Cookies from 'universal-cookie';

class listPost extends Component {
	constructor(props) {
		super(props);
		this.state = {posts: []};
		this.deletePost = this.deletePost.bind(this);
		this.detailPost = this.detailPost.bind(this);
	}
	
	componentDidMount() {
		this.loadData();
	}
    
    loadData() {
        fetch('http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/posts')
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					posts:result
			});
		});
    }	
	
	deletePost(id, title) {
		if (this.state.posts.user_id = '') {
			alert('You must login to continue.')
		} else {
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
		}
	}

	detailPost(id){
		this.props.history.push(`/detailpost/${id}`)
	}
	
	render() {
		const cookies = new Cookies();
		const datauser = cookies.getAll()
		return (
			<div>
				<Header />
				<main>
					{
						datauser.user_password ?
						<Link to="/createpost">+ Add Post</Link> : null
					}
                    {
                        this.state.posts.map(function(p) {
							if (p.post_content.length > 120) {
								p.post_content=p.post_content.substring(0,128)
								p.post_content += '.......'
							}
                            return(
                                <div className='card mb-5 mt-5' id='beda' key={p.id}>
                                    <div className='card-header' id='bedahead'>
                                        <h5 onClick={this.detailPost.bind(this, p.post_id)}><Link>{p.post_title}</Link></h5>
                                        <p>{p.post_date}</p>
                                    </div>
                                    <div className='card-body' id='bedabody'>
										<p id='content'>{p.post_content}
										</p>
										{
											datauser.user_id === p.user_id ?
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
				</main>
			</div>
		)
	}
}

export default listPost;