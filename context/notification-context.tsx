"use client";

import { newNotificationCount } from "@/lib/actions/notification.actions";
import React, { useEffect } from "react";

export type NotifContextType = {
  notifCount: number;
};

export const NotifContext = React.createContext<NotifContextType | null>(null);

const NotifProvider: React.FC<{
  userId?: string;
  children: React.ReactNode;
}> = ({ children, userId }) => {
  const [notifCount, setNotifCount] = React.useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await newNotificationCount(userId);
      setNotifCount(count || 0);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotifContext.Provider value={{ notifCount }}>
      {children}
    </NotifContext.Provider>
  );
};

export default NotifProvider;
