import { useState, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa';
import NotificationMenu from './NotificationMenu';

const Navbar = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleNotification = () => {
    setIsNotificationActive(!isNotificationActive);
  };

  // Get user data from localStorage
  const userString = localStorage.getItem('@user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <header className="bg-white border-b border-gray text-gray p-4 pr-16 relative">
      <div className="flex items-center justify-end">
        <div className="relative bg-gray-200 flex items-center rounded-full">
          <FaRegBell className="text-blue-700 h-8 w-8 ml-4" onClick={toggleNotification} />
          <div className="m-2">
            <div>
              {user && (
                <>
                  <div className="text-blue-700 font-medium">Name: {user.name} {user.lastname}</div>
                  <div className="text-gray-500">Hospital Name: {user.hospital_name}</div>
                </>
              )}
            </div>
          </div>
          {/* Notification badge */}
          {notifications.length > 0 && (
            <div className="absolute top-2 left-7 bg-blue-700 text-white w-6 h-6 flex items-center justify-center rounded-full">
              {notifications.length}
            </div>
          )}
        </div>
        {/* Notification menu (positioned absolutely) */}
        {isNotificationActive && (
          <div className="absolute top-full right-0 z-50 bg-white shadow-md rounded-lg overflow-hidden">
            <NotificationMenu notifications={notifications} onClose={toggleNotification} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
