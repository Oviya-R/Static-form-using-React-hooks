import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
    gender: '',
    startTime: '',
    endTime: '',
    jobPosition: '',
    teams: '',
    designation: '',
    billableHours: '',
    isBillable: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.dob) newErrors.dob = 'Date is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.startTime) newErrors.startTime = 'Start Time is required';
    if (!formData.endTime) newErrors.endTime = 'End Time is required';
    if (!formData.jobPosition) newErrors.jobPosition = 'Job Position is required';
    if (!formData.teams) newErrors.teams = 'Required';
    if (!formData.designation) newErrors.designation = 'Required';
    if (!formData.billableHours || formData.billableHours <= 0) newErrors.billableHours = 'Billable Hours is required and must be a positive number';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="container">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>Employee Form</h2>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your First Name" />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input type="text" id="middleName" value={formData.middleName} onChange={handleChange} placeholder="Enter your Middle Name" />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your Last Name" />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Birth Date</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Select Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Choose Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" id="startTime" value={formData.startTime} onChange={handleChange} />
          {errors.startTime && <span className="error">{errors.startTime}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input type="time" id="endTime" value={formData.endTime} onChange={handleChange} />
          {errors.endTime && <span className="error">{errors.endTime}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jobPosition">Job Position</label>
          <input type="text" id="jobPosition" value={formData.jobPosition} onChange={handleChange} placeholder="Enter the job position" />
          {errors.jobPosition && <span className="error">{errors.jobPosition}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="teams">Select Teams</label>
          <select id="teams" value={formData.teams} onChange={handleChange}>
            <option value="">Select</option>
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="team3">Team 3</option>
          </select>
          {errors.teams && <span className="error">{errors.teams}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="designation">Select Designation</label>
          <select id="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="designation1">Designation 1</option>
            <option value="designation2">Designation 2</option>
            <option value="designation3">Designation 3</option>
          </select>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="billableHours">Billable Hours</label>
          <input type="number" id="billableHours" value={formData.billableHours} onChange={handleChange} placeholder="Enter the billable hours" />
          {errors.billableHours && <span className="error">{errors.billableHours}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="isBillable">Is Billable</label>
          <span><input type="checkbox" id="isBillable" checked={formData.isBillable} onChange={handleChange} /></span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
