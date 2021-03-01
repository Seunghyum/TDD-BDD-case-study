import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ContainerBlock = styled.div<Partial<ContainerProps>>`
  margin: 0 auto;
  width: calc(100% - 120px);
  max-width: ${(props) => (props.fluid === true ? '1136px' : 'auto')};

  @media (min-width: 1256px) {
    max-width: 1136px;
  }
  @media (max-width: 1024px) {
    max-width: calc(100% - 120px);
  }
  @media (max-width: 768px) {
    max-width: calc(100% - 80px);
  }
  @media (max-width: 375px) {
    max-width: calc(100% - 30px);
  }
`;

type ContainerProps = {
  fluid?: boolean;
  children: React.ReactNode;
};

const Container = ({ children, fluid = false, ...rest }: ContainerProps): ReactElement => {
  return (
    <ContainerBlock fluid={fluid} {...rest}>
      {children}
    </ContainerBlock>
  );
};

export default Container;
