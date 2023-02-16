import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmbdbConfigs from '../api/configs/tmdb.configs';

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmbdbConfigs.mediaType.movie}
        mediaCategory={tmbdbConfigs.mediaCategory.popular}
      />
    </>
  );
};

export default HomePage;
