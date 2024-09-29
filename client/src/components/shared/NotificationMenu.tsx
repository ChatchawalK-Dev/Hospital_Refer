import React, { useState, useEffect } from 'react';
import { Notifications, KeyboardArrowDown } from '@mui/icons-material';

interface NotificationMenuProps {
  onClose: () => void;
}

interface Notification {
  HN: string;
  CID: string;
  fullNameTH: string;
  fullNameEN: string;
  status: string;
  emergency: boolean;
  idreferout_popup: number;
  date_refer: string;
  time_refer: string;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]); // Update the type as per your data structure
  const [openSubMenu, setOpenSubMenu] = useState<{ [key: number]: boolean }>({});
  const [NotificationData, setNotificationData] = useState<any[]>([]);
  const [hospcode, setHospcode] = useState('');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const setEmergency = (Emergency: any) => {
    switch (Emergency) {
      case "1":
        return (
          <div className="mx-auto w-8 h-8 rounded-full bg-red-500 border border-black" />
        );
      case "2":
        return (
          <div className="mx-auto w-8 h-8 rounded-full bg-pink-400 border border-black" />
        );
      case "3":
        return (
          <div className="mx-auto w-8 h-8 rounded-full bg-amber-500 border border-black" />
        );
      case "4":
        return (
          <div className="mx-auto w-8 h-8 rounded-full bg-green-500 border border-black" />
        );
      case "5":
        return (
          <div className="mx-auto w-8 h-8 rounded-full bg-white border border-black" />
        );
      default:
        return "-";
    }
  };

  const setStatus = (status: any) => {
    switch (status) {
      case "1":
        return "อนุมัติ";
      case "2":
        return "รอดำเนินการอนุมัติ";
      case "3":
        return "ปฎิเสธ";
      default:
        return "ไม่ทราบสถานะ";
    }
  };


  useEffect(() => {
    const getHospcode = async () => {
      try {
        const storedHospcode = await localStorage.getItem('hospcode');
        if (storedHospcode) {
          const parsedHospcode = JSON.parse(storedHospcode);
          setHospcode(parsedHospcode);

          // Fetch data using the updated hospcode
          fetch(`http://localhost:3001/notification/?hospcode=${parsedHospcode}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch notifications');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Fetched data:', data);
              setNotifications(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      } catch (error) {
        console.error("Error retrieving hospcode from local storage:", error);
      }
    };

    getHospcode();
  }, []);

  const toggleSubMenu = (item: number) => {
    setOpenSubMenu(prevState => ({ ...prevState, [item]: !prevState[item] }));
    setSelectedItem(selectedItem === item ? null : item);
  };

  return (
    <div className="abosolute w-96 h-[50vh] max-h-[50vh] bg-white shadow-md rounded-3xl rounded-tl overflow-y-auto">
      <h2 className="sticky top-0 text-center w-full py-3 border-b text-blue-700 font-bold text-3xl bg-white">
        Notification
      </h2>
      <section className="flex flex-col gap-4 p-4">
        {notifications.map(({ HN, CID, fullNameTH, fullNameEN, status, emergency, idreferout_popup, date_refer, time_refer }) =>
          <article key={idreferout_popup} className="flex w-full items-start text-gray-500 gap-2">
            <header className="flex flex-col justify-center items-center my-auto w-16 gp-1">
              <p className="text-gray-700 text-lg font-bold">{setEmergency(emergency)}</p>
              <p className="text-gray-700 text-sm">ระดับ {emergency}</p>
            </header>
            <section className="flex flex-col justify-center items-start flex-1 gap-1 text-sm leading-4">
              <p>{fullNameTH} {fullNameEN}</p>
              <p>{idreferout_popup}</p>
              <p>{formatDate(date_refer)} {time_refer}</p>
            </section>
            <p className="bg-blue-600 px-2.5 py-1 rounded-full shadow-md text-white text-sm my-auto">
              {setStatus(status)}
            </p>
          </article>
        )}
      </section>
    </div>
  );
};

export default NotificationMenu;