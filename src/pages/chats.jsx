import React from 'react'
import { useUserData } from '../provider/user-data'

export default function ChatsPage() {
    const { userData } = useUserData();
    console.log(userData);
}