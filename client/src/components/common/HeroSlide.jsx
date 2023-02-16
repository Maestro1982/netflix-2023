import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AutoPlay from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import { setIsGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { routesGen } from '../../routes/routes';
import uiConfigs from '../../configs/ui.configs';
import CircularRate from './CircularRate';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import genreApi from '../../api/modules/genre.api';
import mediaApi from '../../api/modules/media.api';

const HeroSlide = ({ mediaType, mediaCategory }) => {
  return <>HeroSlide</>;
};

export default HeroSlide;
