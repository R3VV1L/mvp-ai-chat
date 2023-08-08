import { useState } from 'react';
import { Chat } from '../../components/Chat.tsx';
import './AiChat.css';

export const AiChat = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message]);
    };

    return (
        <>
            <div>
                {showModal && (
                    <div className="chat-group">
                        <div className="chat">
                            <div className="chat-content">
                                <div className="chat-group-header">
                                    <div className="text-header">ai-chat</div>
                                    <div
                                        className="close-button"
                                        onClick={handleCloseModal}
                                    >
                                        [ x ]
                                    </div>
                                </div>
                                <Chat
                                    messages={messages}
                                    onSendMessage={handleSendMessage}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="open-button"
                    onClick={handleOpenModal}
                ></button>
            </div>
        </>
    );
};
