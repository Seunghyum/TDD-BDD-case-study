import React, { ReactElement } from 'react';
import styled from 'styled-components';

import BookmarkIcon from '~components/buttons/BookmarkButton';

const CardBlock = styled.div`
  flex: 0 0 25%;
  padding: 0 10px 30px 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    flex: 0 0 50%;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 999px;
`;

const Nickname = styled.div`
  font-weight: bold;
  margin-left: 10px;
  color: 'rgba(0, 0, 0, 0.74)';
`;

const Content = styled.div`
  position: relative;
`;

const ContentImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const BookmarkButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

type CardItemProps = {
  imageUrl: string;
  nickname: string;
  profileImageUrl: string;
  isBookmarked: boolean;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export const testId = 'bookmark';

function LifestyleCard({ imageUrl, nickname, profileImageUrl, isBookmarked, onClick }: CardItemProps): ReactElement {
  return (
    <CardBlock>
      <Profile>
        <ProfileImage src={profileImageUrl} alt="profile thumbnail" />
        <Nickname>{nickname}</Nickname>
      </Profile>
      <Content>
        <ContentImage src={imageUrl} alt="content thumbnail" />
        <BookmarkButton type="button" data-testid={testId} onClick={onClick}>
          <BookmarkIcon isBookmarked={isBookmarked} />
        </BookmarkButton>
      </Content>
    </CardBlock>
  );
}

export default LifestyleCard;
