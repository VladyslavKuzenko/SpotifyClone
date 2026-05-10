import Main from "./components/main-page/Main";
import PlayerPage from "./components/player-page/PlayerPage";
import UserProfile from "./components/user-profile-page/UserProfile";
import MyProfile from "./components/my-profile-page/MyProfile";
import Rating from "./components/rating-page/Rating";
import Likes from "./components/likes-page/Likes";
import ChatPage from "./components/chat-page/ChatPage";
import ProfileSetup from "./components/profile-page/ProfileSetup";
import EditProfile from "./components/edit-profile-page/EditProfile";

import LoginButton from "./components/exampleAuth0/LoginButton";
import LogoutButton from "./components/exampleAuth0/LogoutButton";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { hiddenLeftSideRoutes } from './constants/hiddenRoutes'

import Test from "./components/exampleAuth0/Test";
import LeftSide from "./components/main-components/LeftSide";

export const routes = [
    {
        path: '/main',
        element:  <MainLayout><Main /></MainLayout>
    },
    {
        path: '/main',
        element: <MainLayout><Navigate to="/main" replace /></MainLayout>
    },
    {
        path: '/login',
        element: <MainLayout><LoginButton /></MainLayout>
    },
    {
        path: "/logout",
        element: <MainLayout><LogoutButton /></MainLayout>
    },
    {
        path: "/chat",
        element: <MainLayout><ChatPage /></MainLayout>
    },
    {
        path: "/my-profile",
        element: <MainLayout><MyProfile /></MainLayout>
    },
    {
        path: "/rating",
        element: <MainLayout><Rating /></MainLayout>
    },
    {
        path: "/likes",
        element: <MainLayout><Likes /></MainLayout>
    },
    {
        path: "/profileSetup",
        element: <MainLayout><ProfileSetup /></MainLayout>
    },
    {
        path: "/test",
        element: <MainLayout><Test /></MainLayout>
    },
    {
        path: '/player',
        element: <MainLayout><PlayerPage /></MainLayout>
    },
    {
        path: '/user-profile/:userId',
        element: <MainLayout><UserProfile /></MainLayout>
    },
    {
        path: '/edit-profile',
        element: <MainLayout><EditProfile /></MainLayout>
    }
]