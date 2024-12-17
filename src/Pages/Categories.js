import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch("http://localhost:9000/categories")
      .then((resp) => resp.json())
      .then((data) => setCategories(data));
  };

  const deleteProduct = (category) => {
    Swal.fire({
      title: `Are You Sure To Delete : ${category.title} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`http://localhost:9000/categories/${category.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => getAllCategories());
      }
    });
  };

  return (
    <>
      <h1>Categories</h1>

      <Link to={"/categories/add"} className="btn btn-success mt-3">
        Add New Category
      </Link>

      <table className="table table-striped mt-5 products-table">
        <thead>
          <tr>
            <th>Categories</th>
            <th>ID</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteProduct(category);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Categories;
