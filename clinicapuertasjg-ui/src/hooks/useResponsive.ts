import { Breakpoint, useTheme, useMediaQuery } from '@mui/material';

type Query = 'up' | 'down' | 'only';

export default function useResponsive(query: Query, key: Breakpoint): boolean {
  const theme = useTheme();
  const mediaUp = useMediaQuery(theme.breakpoints.up(key));
  const mediaDown = useMediaQuery(theme.breakpoints.down(key));
  const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

  const queryHandler = {
    up: mediaUp,
    down: mediaDown,
    only: mediaOnly,
  };

  return queryHandler[query];
}
