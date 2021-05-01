const ImageGallery = ({onImgClick, children}) => {
  
  return (
    <div className="image__container">
      <ul onClick={onImgClick} className="ImageGallery">{children}</ul>
    </div>
  );
};

export default ImageGallery;
