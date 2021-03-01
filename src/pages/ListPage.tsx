import React, { ReactElement } from 'react';
import Container from '~src/components/Container';
import LifestyleCardListContainer from '~src/containers/LifestyleCardListContainer';

function ListPage(): ReactElement {
  return (
    <Container>
      <LifestyleCardListContainer />
    </Container>
  );
}

export default ListPage;
