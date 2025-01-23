import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';
import styles from '../DashboardLayout/AuthLayout.module.css'
import React from 'react';
const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"
          alt="Space background"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.right}>
        <div className={styles.logo}>
          <LinkIcon size={24} />
          <h1>Covette</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;