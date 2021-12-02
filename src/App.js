import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Searchbar from './components/Searchbar';
import ImageInfo from './components/ImageInfo';

export default class App extends Component {
  static propTypes = {
    handleFormSubmit: PropTypes.func,
  };
  state = {
    query: '',
    page: 1,
  };
  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo query={this.state.query} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}