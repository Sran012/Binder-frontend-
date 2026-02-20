import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeContent from '../components/HomeContent';
import TasksContent from '../components/TasksContent';
import DepartmentContent from '../components/DepartmentContent';
import ProfileContent from '../components/ProfileContent';
import IMSContent from '../components/IMSContent';
import {
  Menu,
  Home,
  ListChecks,
  Building2,
  Boxes,
  MessageCircle,
  UserCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [departmentResetKey, setDepartmentResetKey] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    return [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'tasks', label: 'Tasks', icon: ListChecks },
      { id: 'department', label: 'Departments', icon: Building2 },
      { id: 'ims', label: 'IMS', icon: Boxes },
      { id: 'community', label: 'Community', icon: MessageCircle },
      { id: 'profile', label: 'Profile', icon: UserCircle },
    ];
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeContent user={user} />;
      case 'tasks':
        return <TasksContent />;
      case 'department':
        return <DepartmentContent />;
      case 'ims':
        return <IMSContent />;
      case 'profile':
        return <ProfileContent user={user} />;
      case 'community':
        navigate('/community');
        return null;
      default:
        return <HomeContent user={user} />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-wrapper">
            <button
              type="button"
              className="sidebar-toggle"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
            <div className="logo-icon-dash">B</div>
            <span className="logo-text-dash">Binder</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'community') {
                  navigate('/community');
                } else if (item.id === 'department') {
                  setActivePage('department');
                  // Bump reset key so DepartmentContent resets even if already active
                  setDepartmentResetKey((key) => key + 1);
                } else {
                  setActivePage(item.id);
                }
              }}
            >
              <span className="nav-icon" aria-hidden="true">
                <item.icon size={18} />
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer" />
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <h2 className="page-title">Binder Dashboard</h2>
          </div>
          <div className="top-bar-right" ref={profileMenuRef}>
            <button
              type="button"
              className="profile-trigger"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-label="Open profile menu"
            >
              <span className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')}
              </span>
            </button>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <div className="profile-menu-name">{user?.name || 'User'}</div>
                  <div className="profile-menu-email">{user?.email || ''}</div>
                </div>
                <div className="profile-menu-divider" />
                <button type="button" className="profile-menu-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="content-wrapper">
          {activePage === 'department' ? (
            <DepartmentContent resetKey={departmentResetKey} />
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
