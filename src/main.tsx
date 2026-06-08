import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App'
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router";
import {BackupJobPage} from "@/views/backup/jobs";
import {HelloPage} from "@/views/hello";
import {LoginPage} from "@/views/user/login";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/backup/jobs" element={<BackupJobPage/>}/>
            <Route path="/hello" element={<HelloPage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
