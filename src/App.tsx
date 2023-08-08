import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AiChat } from './pages/ai-chat/AiChat.tsx';

function App() {
    return (
        <Routes>
            <Route path="ai-chat" element={<AiChat />} />
            {/*<Route path="*" element={<NotFound />} />*/}
            {/*/!* add the 404 route *!/*/}
        </Routes>
    );
}

export default App;
