import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css'

export default class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };
    state = {
        query: '',
    };
    handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
    };
    handleQuerySubmit = event => {
        event.preventDefault();
        if (this.state.query.trim() === '') {
            return toast.error('Please enter a search term to begin');
            
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };
    
    
    render() {
        return(
            <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={this.handleQuerySubmit}>
                <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={s.SearchFormInput}
                    type="text"
                    value={this.state.query}
                    onChange={this.handleQueryChange}
                    placeholder="Search images and photos"
                />
            </form>
        </header>
        );
    }
}