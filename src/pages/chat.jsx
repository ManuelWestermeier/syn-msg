import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChatPage() {
    const { id } = useParams();
    return (
        <div>ChatPage {id}</div>
    )
}
