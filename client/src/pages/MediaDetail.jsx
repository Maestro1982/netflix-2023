import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularRate from '../components/common/CircularRate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';
import uiConfigs from '../configs/ui.configs';
import tmdbConfigs from '../api/configs/tmdb.configs';
import mediaApi from '../api/modules/media.api';
import favoriteApi from '../api/modules/favorite.api';
import { setIsGlobalLoading } from '../redux/features/globalLoadingSlice';
import { setIsAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import CastSlide from '../components/common/CastSlide';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOnRequest, setIsOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setIsGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setIsGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) toast.error(error.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setIsAuthModalOpen(true));

    if (isOnRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setIsOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await favoriteApi.add(body);
    setIsOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Added Favorite to favorites list successfully');
    }
  };

  const onRemoveFavorite = async () => {
    if (isOnRequest) return;
    setIsOnRequest(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });
    setIsOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Deleted Favorite from favorites list successfully');
    }
  };

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* Media Content */}
        <Box
          sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Poster */}
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* Poster */}

            {/* Media Info */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                color: 'text.primary',
              }}
            >
              <Stack spacing={5}>
                {/* Title */}
                <Typography
                  variant='h4'
                  fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                  fontWeight='700'
                  sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                >{`${media.title || media.name} ${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date.split('-')[0]
                    : media.first_air_date.split('-')[0]
                }`}</Typography>
                {/* Title */}

                {/* Rate and Genres */}
                <Stack direction='row' spacing={1} alignItems='center'>
                  {/* Rate */}
                  <CircularRate value={media.vote_average} />
                  {/* Rate */}
                  <Divider orientation='vertical' />
                  {/* Genres */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant='filled'
                      color='primary'
                      key={index}
                    />
                  ))}
                  {/* Genres */}
                </Stack>
                {/* Rate and Genres */}

                {/* Overview */}
                <Typography
                  variant='body1'
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* Overview */}

                {/* Buttons */}
                <Stack direction='row' spacing={1}>
                  <LoadingButton
                    variant='text'
                    sx={{
                      width: 'max-content',
                      '& .MuiButon-starIcon': { marginRight: '0' },
                    }}
                    size='large'
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition='start'
                    loading={isOnRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant='contained'
                    sx={{ width: 'max-content' }}
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    Watch Now
                  </Button>
                </Stack>
                {/* Buttons */}

                {/* Cast */}
                <Container header='Cast'>
                  <CastSlide casts={media.credits.cast} />
                </Container>
                {/* Cast */}
              </Stack>
            </Box>
            {/* Media Info */}
          </Box>
        </Box>
        {/* Media Content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
