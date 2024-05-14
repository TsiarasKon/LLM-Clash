import ChatInterface from "@/components/ChatInterface";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    return (
        <React.StrictMode>
            <ChatInterface />
            <ToastContainer autoClose={4000} newestOnTop theme="dark" />
        </React.StrictMode>
    );
}
