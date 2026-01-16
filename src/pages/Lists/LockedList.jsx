import Title from '@/components/Title'
import React from 'react'
import SelectList from './components/SelectList'
import { useUserStore } from '@/store/useUserStore';
import PersonnalInput from './components/PersonnalInput';

export default function LockedList() {
    const user = useUserStore((state) => state.user);
   return (
      <div className="flex flex-col w-full p-2 relative">
           <Title text="Listes Perso" />
           <SelectList />
           <PersonnalInput user={user} />
        
        </div>
    )
}
