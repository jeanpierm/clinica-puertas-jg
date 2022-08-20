import { Helmet } from 'react-helmet-async';
import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

type PageProps = {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
};

const Page: React.FC<PageProps> = forwardRef(
  ({ children, title = '', meta, ...rest }, ref) => {
    return (
      <>
        <Helmet>
          <title>{`${title}`}</title>
          {meta}
        </Helmet>

        <Box ref={ref} {...rest}>
          {children}
        </Box>
      </>
    );
  }
);

export default Page;
