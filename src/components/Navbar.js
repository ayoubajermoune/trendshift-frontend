import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faTachometerAlt, 
  faEdit, 
  faSignOutAlt, 
  faSignInAlt, 
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <FontAwesomeIcon icon={faHome} /> TrendShift
      </Link>
      <ul className="navbar-nav">
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && (
              <li>
                <Link to="/dashboard" className="nav-item">
                  <FontAwesomeIcon icon={faTachometerAlt} /> {t('navbar.dashboard')}
                </Link>
              </li>
            )}
            <li>
              <Link to="/create-post" className="nav-item">
                <FontAwesomeIcon icon={faEdit} /> {t('navbar.createPost')}
              </Link>
            </li>
            <li>
              <button 
                onClick={logout} 
                className="btn btn-outline"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> {t('navbar.logout')}
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-item">
                <FontAwesomeIcon icon={faSignInAlt} /> {t('navbar.login')}
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-item">
                <FontAwesomeIcon icon={faUserPlus} /> {t('navbar.register')}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
