import "./App.css";
import "@/utils/i18n";
import {BrowserRouter, Route, Routes} from "react-router";
import {BackupJobPage} from "@/views/backup/jobs";
import {HelloPage} from "@/views/hello";
import {LoginPage} from "@/views/user/login";
import {BackupFilesPage} from "@/views/backup/files";
import {Panel} from "./views/layout";
import {BackupRecordsPage} from "@/views/backup/records";
import {UserListPage} from "./views/user/user-list";
import { MaidsPage } from "./views/system/maids";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Panel/>}>
                    <Route path="/backup/jobs" element={<BackupJobPage/>}/>
                    <Route path="/backup/files" element={<BackupFilesPage/>}/>
                    <Route path="/backup/records" element={<BackupRecordsPage/>}/>
                    <Route path="/user/list" element={<UserListPage/>}/>
                    <Route path="/system/maids" element={<MaidsPage/>}/>
                    <Route path="/hello" element={<HelloPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
