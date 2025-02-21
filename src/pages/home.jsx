import React from 'react'
import { useUserData } from '../provider/user-data'

export default function Home() {
    /**
    * @type {{ contacts: [], chats: {}, notes: [], todos: []}}
    */
    const { userData, setUserData } = useUserData();

    return Object.keys(userData).map(data => <p>{data}</p>);
}