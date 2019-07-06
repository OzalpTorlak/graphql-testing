import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';

import {getDirectorsQuery, newMovieMutation, getMoviesQuery} from '../queries/queries'



class NewMovieForm extends Component {

    state = {
        title : '',
        description : '',
        year : null,
        directorId: ''
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
   
    render(){
        return (
            <Mutation mutation={newMovieMutation}>
                { (addMovie, {loading, error}) => (
                    <div>
                        <form onSubmit={ e => {
                            e.preventDefault();
                            addMovie({
                                variables: {
                                    title : this.state.title,
                                    description : this.state.description,
                                    year: parseInt(this.state.year, 10),
                                    directorId : this.state.directorId
                                },
                                refetchQueries: [{ query: getMoviesQuery}] //apollo client tarafından sayfa yeniden refetch oluyor ve eklenilen movie'ler ekrana geliyor.
                            });
                        } }>
                            <div>
                                <label>Title</label>
                                <input type="text" name="title" onChange = {this.onChange} placeholder="title"></input>
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" onChange = {this.onChange} placeholder="description"></textarea>
                            </div>
                            <div>
                                <label>Year</label>
                                <input type="text" name="year" onChange = {this.onChange} placeholder="year"></input>
                            </div>
                            <div>
                                <label>Directors</label>
                                <select name="directorId" onChange = {this.onChange} >
                                    <option disabled={true}>
                                        Select Directors
                                    </option>
                                    <Query query={getDirectorsQuery}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <option disabled = {true}>Loading...</option>
                                            if (error) return <option disabled = {true}>Errors...</option>
                                            
                                            return data.directors.map(director => (
                                                <option key={director.id} value={director.id}>{director.name}</option>
                                            ))
                                        }}
                                    </Query>
                                </select>
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        {loading && <div>Loading</div>}
                        {error && <div>Error...</div>}
                    </div>
                )}
            </Mutation>
        );
    }
}

export default NewMovieForm;