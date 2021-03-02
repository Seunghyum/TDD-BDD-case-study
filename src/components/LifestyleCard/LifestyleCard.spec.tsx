import React from 'react';
import { fireEvent, getByAltText, getByTestId, getByText, render } from '@testing-library/react';
import LifestyleCard, { testId } from './LifestyleCard';

describe('Feature : LifestyleCard 컴포넌트로 유저의 라이프스타일을 카드로 보여준다', () => {
  describe('Scenario : 입력값에 따라 정상적으로 렌더링 되어야한다', () => {
    it(`
      Given : imageUrl, nickname, profileImageUrl, isBookmarked, onClick을 설정할 수 있다.
      When : imageUrl, nickname, profileImageUrl을 설정할 수 있다.
      Then : 설정한 값들이 정상적으로 DOM Element에 렌더링된다
    `, () => {
      const testData = {
        imageUrl: 'test1.jpg',
        nickname: '테스트 유저',
        profileImageUrl: 'test2.jpg',
        isBookmarked: true,
        onClick: () => '',
      };

      const { container } = render(
        <LifestyleCard
          imageUrl={testData.imageUrl}
          nickname={testData.nickname}
          profileImageUrl={testData.profileImageUrl}
          isBookmarked={testData.isBookmarked}
          onClick={testData.onClick}
        />,
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByText(container, testData.nickname)).toBeTruthy();
      expect(getByAltText(container, testData.profileImageUrl)).toBeTruthy();
      expect(getByAltText(container, testData.imageUrl)).toBeTruthy();
    });
  });

  describe('Scenario : 클릭시 설정한 콜백을 실행시켜야한다', () => {
    it(`
    Given : imageUrl, nickname, profileImageUrl, isBookmarked, onClick을 설정할 수 있다.
    When : onClick에 콜백 함수를 설정할 수 있다.
    Then : 설정한 콜백이 정상적으로 작동한다.
  `, () => {
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
});
