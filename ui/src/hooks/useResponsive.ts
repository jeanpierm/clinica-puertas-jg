import { Breakpoint, useTheme, useMediaQuery } from '@mui/material';

type Query = 'up' | 'down' | 'between' | 'only';

export default function useResponsive(
  query: Query,
  key: Breakpoint,
  start?: number | Breakpoint,
  end?: number | Breakpoint
): boolean {
  const theme = useTheme();
  const mediaUp = useMediaQuery(theme.breakpoints.up(key));
  const mediaDown = useMediaQuery(theme.breakpoints.down(key));
  const mediaBetween =
    start && end ? useMediaQuery(theme.breakpoints.between(start, end)) : false;
  const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

  const queryHandler = {
    up: mediaUp,
    down: mediaDown,
    between: mediaBetween,
    only: mediaOnly,
  };

  return queryHandler[query];
}
