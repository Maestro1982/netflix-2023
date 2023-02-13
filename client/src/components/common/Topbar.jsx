import React, { cloneElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.configs.js';
import { themeModes } from '../../configs/theme.configs';
import { setIsAuthModalOpen } from '../../redux/features/authModalSlice';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import Logo from './Logo';

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
};

const Topbar = () => {
  return <div>Topbar</div>;
};

export default Topbar;
