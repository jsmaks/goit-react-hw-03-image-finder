import Modal from './Components/Modal/Modal';
import React, { Component } from 'react';

import Button from './Components/Button/Button';
import Container from './Components/Container/Container';
import Searchbar from './Components/Searchbar/SearchBar';
import ImagesFinderApiService from './api/apiService';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import ImageGalleryItem from './Components/ImageGallery/ImageGalleryItem';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = {
    images: [],
    showModal: false,
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    selectedImg: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onImgClick = event => {
    const { source } = event.target.dataset;
    this.setState({ selectedImg: source });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
    if (prevState.selectedImg !== this.state.selectedImg) {
      this.toggleModal();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchHits = () => {
    const { currentPage, searchQuery } = this.state;
    const imgOption = {
      currentPage,
      searchQuery,
    };
    this.setState({ isLoading: true });

    ImagesFinderApiService.fetchImages(imgOption)
      .then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };
  render() {
    const { showModal, images, isLoading, error, selectedImg } = this.state;
    const imagesLength = images.length;
    const shouldRenderLoadMoreBtn = imagesLength > 0 && !isLoading;

    return (
      <Container>
        {error && <h1>Ошибка</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery onImgClick={this.onImgClick}>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        {isLoading && <Loader />}
        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchHits} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
