import {useEffect, useState} from 'react';
import {useMediaQuery, useTheme} from '@mui/material';

const useWindowSize = () => {
  const themeS = useTheme();
  const isXs = useMediaQuery(themeS.breakpoints.only('xs'));
  const isSm = useMediaQuery(themeS.breakpoints.only('sm'));
  const isMd = useMediaQuery(themeS.breakpoints.only('md'));
  const isLg = useMediaQuery(themeS.breakpoints.only('lg'));
  const isXl = useMediaQuery(themeS.breakpoints.only('xl'));
  const xxl = useMediaQuery(`(min-width:1920px)`);
  const xl = useMediaQuery(`(min-width:1052px)`);
  const _1280 = useMediaQuery(`(max-width:1280px)`);
  const _1366 = useMediaQuery(`(max-width:1366px)`);
  const _1536 = useMediaQuery(`(max-width:1536px)`);
  const _1600 = useMediaQuery(`(max-width:1600px)`);
  const _1920 = useMediaQuery(`(max-width:1920px)`);
  const [windowSize, setWindowSize] = useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  useEffect(() => {

    const handleResize = () => {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };

    window?.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window?.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowSize,
    screenResponsive: {
      isXl,
      isSm,
      isLg,
      isXs,
      isMd,
      xxl,
      xl,
    },
    screenModify: {
      _1280,
      _1366,
      _1536,
      _1600,
      _1920,
    },
  };
};

export default useWindowSize;
