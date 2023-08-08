import { useState } from 'react';
import './Chat.css';

interface ChatProps {
    messages: string[];
    onSendMessage: (message: string) => void;
}
export const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        onSendMessage(message);
        setMessage('');
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };
    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Добавляем лидирующий ноль, если минуты меньше 10
        return `${hours}_${minutes}'`;
    };
    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message message-right`}>
                        <span className="message-text">{msg}</span>
                        <span className="message-time">{getCurrentTime()}</span>
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    className="input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="btn-send" onClick={handleSendMessage}>
                    {'^'}
                </button>
            </div>
        </div>
    );
};
