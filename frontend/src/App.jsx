import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import UnauthenticatedPageWrapper from "./containers/UnauthenticatedPageWrapper"

function App() {
    return(
        <Routes>
            <Route path="/" element={<UnauthenticatedPageWrapper><HomePage /></UnauthenticatedPageWrapper>} /> 
        </Routes>
    )
}

export default App
