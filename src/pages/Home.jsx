/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useUserStore } from '../store/useUserStore';
import Login from './Login';
import SharedList from './Lists/SharedList';

export default function Home() {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />; // Toujours attendre l'hydratation !

  return user ? <SharedList user={user} /> : <Login />;
}
