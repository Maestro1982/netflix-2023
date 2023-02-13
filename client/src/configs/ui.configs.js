const uiConfigs = {
  style: {
    gradientBackgroundImage: {
      dark: {
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)',
      },
      light: {
        backgroundImage:
          'linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0)',
      },
    },
    horizontalGradientBackgroundImage: {
      dark: {
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0)',
      },
      light: {
        backgroundImage:
          'linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0)',
      },
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || 'justify',
      display: 'webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: lines,
    }),
    mainContent: {
      maxWidth: '1366px',
      margin: 'auto',
      padding: 2,
    },
    backgroundImage: (imagePath) => ({
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'darkgrey',
      backgroundImage: `url(${imagePath})`,
    }),
    size: {
      sidebarWidth: '300px',
      contentMaxWidth: '1366px',
    },
  },
};

export default uiConfigs;
