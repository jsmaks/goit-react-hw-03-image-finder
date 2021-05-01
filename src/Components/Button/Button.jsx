const Button = ({ onClick }) => {
  return (
    <div className="container__load-more">
      <button type="button" onClick={onClick} className="Button">
        LoadMore
      </button>
    </div>
  );
};

export default Button;
