import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, BarChart2, Settings, LogOut } from 'lucide-react';
import styles from './DashboardLayout.module.css';
import React from 'react';
const DashboardLayout = () => {
  const location = useLocation();
  const username = "Sujith"; // This would come from your auth context

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Links', path: '/links', icon: LinkIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <LinkIcon size={24} />
          <h1>Covette</h1>
        </div>
        
        <nav className={styles.nav}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`${styles.navLink} ${
                  location.pathname === item.path ? styles.active : ''
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.greeting}>
            <span className={styles.star}>⭐</span>
            <h2>Good morning, {username}</h2>
            <span className={styles.date}>Tue, Jan 25</span>
          </div>
          <div className={styles.profile}>
            <button className={styles.logoutBtn}>
              <LogOut size={20} />
            </button>
            <div className={styles.avatar}>SU</div>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;