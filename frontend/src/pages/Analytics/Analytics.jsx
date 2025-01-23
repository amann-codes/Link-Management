import { BarChart2, Smartphone, Monitor, Tablet } from 'lucide-react';
import styles from './Analytics.module.css';
import React from 'react';
const Analytics = () => {
  const clickData = [
    { date: '21-01-25', clicks: 1234 },
    { date: '20-01-25', clicks: 1140 },
    { date: '19-01-25', clicks: 134 },
    { date: '18-01-25', clicks: 34 },
  ];

  const deviceData = [
    { device: 'Mobile', clicks: 134 },
    { device: 'Desktop', clicks: 40 },
    { device: 'Tablet', clicks: 3 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Total Clicks</h2>
        <div className={styles.totalClicks}>1234</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Date-wise Clicks</h3>
          <div className={styles.clicksList}>
            {clickData.map(item => (
              <div key={item.date} className={styles.clickItem}>
                <div className={styles.clickDate}>{item.date}</div>
                <div className={styles.clickBar}>
                  <div 
                    className={styles.clickBarFill} 
                    style={{ width: `${(item.clicks / 1234) * 100}%` }}
                  />
                </div>
                <div className={styles.clickCount}>{item.clicks}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3>Click Devices</h3>
          <div className={styles.deviceList}>
            {deviceData.map(item => (
              <div key={item.device} className={styles.deviceItem}>
                <div className={styles.deviceIcon}>
                  {item.device === 'Mobile' && <Smartphone size={20} />}
                  {item.device === 'Desktop' && <Monitor size={20} />}
                  {item.device === 'Tablet' && <Tablet size={20} />}
                  <span>{item.device}</span>
                </div>
                <div className={styles.deviceBar}>
                  <div 
                    className={styles.deviceBarFill} 
                    style={{ width: `${(item.clicks / 177) * 100}%` }}
                  />
                </div>
                <div className={styles.deviceCount}>{item.clicks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;