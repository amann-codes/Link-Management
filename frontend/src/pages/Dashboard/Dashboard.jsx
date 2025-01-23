import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon } from 'lucide-react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import styles from './Dashboard.module.css';
import React from 'react';
const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/links/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome to Covette</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <LinkIcon size={20} />
          Create new link
        </Button>
      </div>

      {loading ? (
        <p>Loading stats...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>Total Links</h3>
              <p>{stats.totalLinks}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Clicks</h3>
              <p>{stats.totalClicks}</p>
            </div>
          </div>
          <div className={styles.quickLinks}>
            <h3>Quick Links</h3>
            <div className={styles.linkGrid}>
              <Link to="/links" className={styles.linkCard}>
                <LinkIcon size={24} />
                <span>Manage Links</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
