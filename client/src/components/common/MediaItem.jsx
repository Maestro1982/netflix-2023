import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import uiConfigs from '../../configs/ui.configs';
import { routesGen } from '../../routes/routes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularRate from './CircularRate';
import { useSelector } from 'react-redux';
import favoriteUtils from '../../utils/favorite.utils';

const MediaItem = ({ media, mediaType }) => {
  return <div>MediaItem</div>;
};

export default MediaItem;
