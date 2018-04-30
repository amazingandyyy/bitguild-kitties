import React from 'react';
import { Container } from 'semantic-ui-react';

const Layout = (props) => {
  return (<Container>
    {props.children}
  </Container>)
}

export default Layout;