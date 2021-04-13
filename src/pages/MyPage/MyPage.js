import React from 'react';
import {
  StyledPlusButton,
  StyledCalendarButton,
  StyledCalendarIcon
} from './MyPage.styled';
import MenuListContainer from 'containers/MenuListContainer/MenuListContainer';

export default function MyPage() {
  return (
    <>
      <MenuListContainer />
      <StyledCalendarButton>
        <StyledCalendarIcon />
      </StyledCalendarButton>
      <StyledPlusButton />
    </>
  );
}
