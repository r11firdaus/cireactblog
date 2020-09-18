import React, { Component } from "react";
import Header from "../header";

class detailPost extends Component {
    state = {post: [], writer: []};

    async loadData() {
        await fetch(`http://localhost/ci3-reactjs-crud/index.php/postrestcontroller/post?post_id=${this.props.match.params.id}`)
            .then(response => {
                return response.json();
            }).then(result => {
                this.setState({
                    post:result
            });
        });
        fetch(`http://localhost/ci3-reactjs-crud/index.php/userrestcontroller/user?user_id=${this.state.post.user_id}`)
            .then(response => {
                return response.json();
            }).then(result => {
                this.setState({
                    writer:result
            });
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <header>
                        <h2 style={{textAlign: 'center'}}>{this.state.post.post_title}</h2>
                        <p style={{fontSize: '15px', fontWeight: 'bold', margin: '15px', float: 'left'}}>Writer: {this.state.writer.user_name}</p>
                        <p style={{fontSize: '13px', margin: '15px', float: 'right'}}>{this.state.post.post_date}</p>
                    </header><br/><br/><br/>
                    <article style={{margin: '15px'}}>
                        <p>{this.state.post.post_content}</p>
                    </article>
                </main>

            </div>
        )
    }

}

export default detailPost;
