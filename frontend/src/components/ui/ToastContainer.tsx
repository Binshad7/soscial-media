'use client';

import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

interface ToastProviderProps {
    position?: ToastPosition;
    autoClose?: number; // by defualt is 5 seconds after desappear
    hideProgressBar?: boolean; // to show the toast bar in bottom
    newestOnTop?: boolean;  // where new stack in visible 
}

export default function ToastProvider({
    position = 'top-right',
    autoClose = 5000,
    hideProgressBar = false,
    newestOnTop = false,
}: ToastProviderProps) {
    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
        />
    );
}
