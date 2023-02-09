import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const navigate = useNavigate();
  const { rowIndex } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    date: new Date().toString(),
  });

  const getData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/cc0b6f69-f05e-4319-a1d6-88ecbbc3a3e1${rowIndex}`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/cc0b6f69-f05e-4319-a1d6-88ecbbc3a3e1${rowIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
      <h1 className="text-muted text-center">Edit</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          name="message"
          cols="30"
          rows="3"
          className="form-control"
          value={data.message}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">Update</button>
      </div>
    </form>
  );
}
