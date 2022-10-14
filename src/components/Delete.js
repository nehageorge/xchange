import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Delete() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/delete_image/" + params.name, { method: "DELETE" })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        navigate("/");
      })
      .catch((error) => {
        return error;
      });
  }, []);
}

export default Delete;
