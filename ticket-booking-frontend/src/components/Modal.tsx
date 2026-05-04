"use client";

import React from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info'
}) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9E9E9',
                borderRadius: '8px',
                width: '422px',
                height: '256px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                boxSizing: 'border-box',
                gap: '24px'
            }}>
                {/* Vector / Icon Area */}
                {type === 'danger' && (
                    <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#E63946',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        flexShrink: 0
                    }}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                )}

                {/* Text Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%'
                }}>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: '32px',
                        textAlign: 'center',
                        color: '#000000',
                        maxWidth: '310px'
                    }}>
                        {title}
                        <br />
                        {message}
                    </div>
                </div>

                {/* Buttons Area */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 'auto'
                }}>
                    <Button
                        variant="outline"
                        color="white"
                        onClick={onClose}
                        style={{
                            width: '179px',
                            height: '48px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #C4C4C4',
                            borderRadius: '4px',
                            color: '#262626',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            padding: '12px 16px',
                            boxSizing: 'border-box',
                            flex: 1
                        }}
                    >
                        {cancelText}
                    </Button>
                    {onConfirm && (
                        <Button
                            onClick={onConfirm}
                            style={{
                                width: '179px',
                                height: '48px',
                                backgroundColor: '#E63946',
                                color: '#FFFFFF',
                                borderRadius: '4px',
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '24px',
                                padding: '12px 16px',
                                boxSizing: 'border-box',
                                border: 'none',
                                flex: 1
                            }}
                        >
                            {confirmText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
