import { Helmet } from 'react-helmet-async';
import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

type PageProps = {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
};

const Page = forwardRef(
  ({ children, title = '', meta, ...rest }: PageProps, ref) => {
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

Page.displayName = 'Page';

export default Page;
