import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Settings.module.css';

const Settings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Rahul Singh',
    email: 'rahulsingh@gmail.com',
    mobile: '1234567890'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Email id"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Mobile no."
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth>
          Save Changes
        </Button>
      </form>

      <div className={styles.dangerZone}>
        <Button 
          variant="danger" 
          fullWidth
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </Button>
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Are you sure, you want to delete the account?</h3>
            <div className={styles.modalActions}>
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteModal(false)}
              >
                NO
              </Button>
              <Button variant="danger">YES</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;