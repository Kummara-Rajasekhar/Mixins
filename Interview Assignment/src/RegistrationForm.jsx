import { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    address: '',
    branch: ''
  });

  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};

    if (!formData.fullName.trim()) {
      err.fullName = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      err.fullName = 'Only alphabets are allowed';
    }

    if (!formData.dob) {
      err.dob = 'DOB is required';
    } else if (new Date(formData.dob) > new Date()) {
      err.dob = 'DOB must be a past date';
    }

    if (!formData.address.trim()) {
      err.address = 'Address is required';
    } else if (formData.address.length < 10) {
      err.address = 'Minimum 10 characters';
    }

    if (!formData.branch) {
      err.branch = 'Branch is required';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const calculatedAge = calculateAge(formData.dob);
      setAge(calculatedAge);
      setSubmitted(true);
      console.log('Submitted Data:', { ...formData, age: calculatedAge });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      dob: '',
      address: '',
      branch: ''
    });
    setErrors({});
    setAge('');
    setSubmitted(false);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Student Registration Form</h1>

        {submitted ? (
          <div className="success-message">
            <div className="check-icon">✔</div>
            <p className="success-title">Registration Successful!</p>
            <p className="success-age">Calculated Age: <strong>{age}</strong> years</p>
            <button onClick={resetForm} className="submit-btn">
              Register Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'input error' : 'input'}
              />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={errors.dob ? 'input error' : 'input'}
              />
              {errors.dob && <p className="error-text">{errors.dob}</p>}
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={errors.address ? 'input error' : 'input'}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label>Branch *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={errors.branch ? 'input error' : 'input'}
              >
                <option value="">Select Branch</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="E&TC">Electronics & Telecommunication</option>
                <option value="Mechanical">Mechanical Engineering</option>
              </select>
              {errors.branch && <p className="error-text">{errors.branch}</p>}
            </div>

            <div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
