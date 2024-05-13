
function CategoryForm ({hadleSubmit , value , setValue})  {
  return (
    <>
      <form onSubmit={hadleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
