import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AiChat } from './pages/ai-chat/AiChat.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<AiChat />} />
        </Routes>
    );
}

export default App;
