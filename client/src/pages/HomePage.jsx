import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmbdbConfigs from '../api/configs/tmdb.configs';
import { Box } from '@mui/material';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/common/Container';
import MediaSlide from '../components/common/MediaSlide';

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmbdbConfigs.mediaType.movie}
        mediaCategory={tmbdbConfigs.mediaCategory.popular}
      />

      <Box marginTop='-4rem' sx={{ ...uiConfigs.style.mainContent }}>
        <Container header='popular movies'>
          <MediaSlide
            mediaType={tmbdbConfigs.mediaType.movie}
            mediaCategory={tmbdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header='popular series'>
          <MediaSlide
            mediaType={tmbdbConfigs.mediaType.tv}
            mediaCategory={tmbdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header='top rated movies'>
          <MediaSlide
            mediaType={tmbdbConfigs.mediaType.movie}
            mediaCategory={tmbdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header='top rated series'>
          <MediaSlide
            mediaType={tmbdbConfigs.mediaType.tv}
            mediaCategory={tmbdbConfigs.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
