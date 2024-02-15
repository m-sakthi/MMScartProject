const ListItemLoader = () => {
  return (
    <div className="row gx-5">
      <div className="col-auto">
        <div className="avatar">
          <svg className="avatar-img placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
          </svg>
        </div>
      </div>

      <div className="col">
        <div className="d-flex align-items-center mb-3">
          <h5 className="placeholder-glow w-100 mb-0">
            <span className="placeholder col-5"></span>
          </h5>
        </div>

        <div className="placeholder-glow">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-8"></span>
        </div>
      </div>
    </div>
  );
};

export default ListItemLoader;