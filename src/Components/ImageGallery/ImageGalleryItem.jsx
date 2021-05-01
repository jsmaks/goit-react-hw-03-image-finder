const ImageGalleryItem = ({ images }) => {
  return images.map(el => (
    <li key={el.id} className="ImageGalleryItem">
      <img
        src={el.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        data-source={el.largeImageURL}
      />
    </li>
  ));
};

export default ImageGalleryItem;
