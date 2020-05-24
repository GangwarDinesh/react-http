import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from 'axios';
import './Posts.css';

class Posts extends Component {
    
    state = {
        posts : []
    }
    componentDidMount(){
        console.log(this.props);
        axios.get("/posts")
                .then( response => {
                    const posts = response.data.slice(0, 4);
                    const updatedPosts =  posts.map(post => {
                        return {
                            ...post,
                            author : "Dinesh"
                        }
                    });
                    this.setState({posts : updatedPosts});
                })
                .catch( err => {
                    console.log(err);
                    this.setState({error: true})
                });
    }

    postSelectHandler = (id) => {
        this.setState({selectedPostId: id});   
    }

    render () {
        let posts = <p>Something went wrong!</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectHandler(post.id)} />
            });
        }
        
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;