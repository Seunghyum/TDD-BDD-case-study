import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import LifestyleCard, { testId } from './LifestyleCard';

describe('LifestyleCard', () => {
  test('renders LifestyleCard component', () => {
    const { container } = render(
      <LifestyleCard
        imageUrl="test1.jpg"
        nickname="테스트 유저"
        profileImageUrl="test2.jpg"
        isBookmarked
        onClick={() => ''}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('클릭시 콜백함수가 실행된다', () => {
    let isClicked = false;
    const handleClick = () => {
      isClicked = true;
    };

    const { container } = render(
      <LifestyleCard
        imageUrl="test.jpg"
        nickname="테스트 유저"
        profileImageUrl="test2.jpg"
        isBookmarked
        onClick={handleClick}
      />,
    );
    fireEvent(
      getByTestId(container, testId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(isClicked).toBeTruthy();
  });
});
