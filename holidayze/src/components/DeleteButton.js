import { useState } from "react";
import useAxios from "../utils/useAxios";
import { BASE_URL } from "../utils/constants";

const DeleteButton = ({ id, param, className }) => {
  const [error, setError] = useState(null);

  const http = useAxios();

  const url = `${BASE_URL}/${param}/${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      try {
        await http.delete(url);
        window.location.reload(false);
      } catch (err) {
        setError(err);
      }
    }
  }

  return (
    <button className={className} onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </button>
  );
};

export default DeleteButton;
