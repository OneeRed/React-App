import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddCategory() {
  const [title, setTitle] = useState("");
  const [ID, setID] = useState("");

  let navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:9000/categories", {
        title,
        ID,
      })
      .then((data) => {
        navigate("/categories");
      });

    // fetch version
    // fetch("http://localhost:9000/products", {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    //   body: JSON.stringify({
    //     // title: title,
    //     // price: price
    //     // same as
    //     title,
    //     price,
    //     description
    //   })
    // })
    // .then((res) => res.json())
    // .then((data) => {console.log(data);
    // })
  };

  return (
    <>
      <h1>Add New Category</h1>

      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryID" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryID"
            placeholder="category ID"
            aria-describedby="category ID"
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryTitle"
            placeholder="Category Title"
            aria-describedby="Category title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddCategory;
