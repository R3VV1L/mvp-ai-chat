import './Chat.css';
import { useEffect, useRef, useState } from 'react';

interface ChatProps {
    messages: string[];
    onSendMessage: (message: string, time: string) => void;
}

export const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [messageTimes, setMessageTimes] = useState<string[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim() === '') {
            return;
        }

        const currentTime = getCurrentTime();
        onSendMessage(message, currentTime);

        const url = 'http://sharon.drach.pro:8081/question';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: message }),
        };
        console.log({ q: message });
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

        setMessage('');
        setMessageTimes([...messageTimes, currentTime]);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <div className="messages" ref={messagesRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message message-right`}>
                        <span className="message-text">{msg}</span>
                        <span className="message-time">
                            {messageTimes[index]}
                        </span>
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
