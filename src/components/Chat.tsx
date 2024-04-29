import './Chat.css';
import { useEffect, useRef, useState } from 'react';

interface ChatProps {
    messages: string[];
    onSendMessage: (message: string, time: string) => void;
}

interface MessageData {
    message: string;
    time: string;
}

export const Chat: React.FC<ChatProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState<MessageData[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim() === '') {
            return;
        }

        const currentTime = getCurrentTime();
        onSendMessage(message, currentTime);

        const url = 'https://r3vv1l.fvds.ru:5173';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: message }),
        };
        console.log({ q: message });
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessageData([
                    ...messageData,
                    { message: message, time: currentTime },
                    { message: data.answer, time: getCurrentTime() },
                ]);
            })
            .catch((error) => console.log(error));

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
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messageData]);

    return (
        <div>
            <div className="messages" ref={messagesRef}>
                {messageData.map((data, index) => (
                    <div
                        key={index}
                        className={
                            index % 2 === 0 ? 'message-right' : 'message-left'
                        }
                    >
                        <span className="message-text">{data.message}</span>
                        <span className="message-time">{data.time}</span>
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    placeholder=" есть вопрос ?"
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
