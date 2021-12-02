import { Component } from "react";
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
const KEY = '23526711-d54635d6fd3abb803255ed000';
const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

export default class ImageInfo extends Component {
    state = {
        reject: 0,
        photo: [],
        error: null,
        status: Status.IDLE,
        page: 1,
        showModal: false,
        modalUrl: '',
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.setState({ status: Status.PENDING });
            fetch(
                `https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
            )
            .then(respons => {
                return respons.json();
                })
                .then(photo =>
                this.setState({
                    photo: [...photo.hits],
                    page: this.state.page + 1,

                    status: Status.RESOLVED,
                }),
                )
                .catch(error => this.setState({ error, status: Status.REJECTED }));
        }
    }
    loadMore = () => {
        fetch(
                `https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(respons => {
        return respons.json();
        })
        .then(newPhoto =>
            this.setState(({ photo }) => {
            return {
                photo: [...photo, ...newPhoto.hits],
                page: this.state.page + 1,

                status: Status.RESOLVED,
            };
            }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        });
    };

    toggleModal = modalUrl => {
        this.setState(({ showModal }) => ({
        showModal: !showModal,
        modalUrl: modalUrl,
        }));
    };
    onGalleryCardClick = e => {
        const url = e.currentTarget.getAttribute('datalarge');
        this.toggleModal(url);
    };
    render() {
        const { photo, status } = this.state;

        if (status === 'idle') {
            return <div>Please enter your search </div>;
        }
        if (status === 'pending') {
            return <div>loading...</div>;
        }

        if (photo.length === 0) {
            return (
                <div>Sorry we nothing found for you</div>
            );
        }
        if (status === 'resolved') {
            return (
                <div>
                    {this.state.showModal && (
                        <Modal onClose={this.toggleModal} modalUrl={this.state.modalUrl} />
                    )}
                    <ImageGallery photo={photo} onImgClick={this.onGalleryCardClick} />
                    {this.state.photo.length > 10 && <Button onClick={this.loadMore} />}
                </div>
            )
        }

    }
}