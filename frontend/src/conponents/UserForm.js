import "./form.css";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const handleDobChange = (event) => {
    const dobValue = event.target.value;
    const ageThreshold = 18;
    const dobDate = new Date(dobValue);
    const ageInMs = Date.now() - dobDate.getTime();
    const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365.25;

    if (ageInYears < ageThreshold) {
      setDobError(`You must be at least ${ageThreshold} years old`);
    } else {
      setDobError("");
    }

    setDob(dobValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber } = credential;
    const dateOfBirth = dob;
    const response = await fetch("https://registerforms-api.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phoneNumber, dateOfBirth }),
    });
    const json = await response.json();
    console.log(json);
    navigate("/userForm");
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1 className="heading">Form</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="form-label">
              Name:-
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={onChange}
              name="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email:-
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNo" className="form-label">
              phoneNumber:-
            </label>

            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              onChange={onChange}
              name="phoneNumber"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div>
            <label htmlFor="name" className="form-label">
              dateOfBirth:-
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={dob}
              onChange={handleDobChange}
              required
            />
            {dobError && <span style={{ color: "red" }}>{dobError}</span>}
          </div>

          <div className="btn">
            <button type="submit" className="btn1">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
