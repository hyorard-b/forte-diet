import React, { useState } from 'react';
import { checkByte } from '../../utils/validation/DailyReviewValidation';
import { useSelector } from 'react-redux';
import {
  StyledDailyReview,
  StyledDailyReviewModal
} from './DailyReview.styled';

export default function DailyReview({
  date,
  dailyTextarea,
  reviewIsActive,
  setReviewIsActive,
  onSubmit,
  onRemove
}) {
  let { dailyReview } = useSelector(state => state.menuList[date]);
  dailyReview = dailyReview || '';

  const [wroteReview, setWroteReview] = useState(dailyReview);
  const [totalBytes, setTotalBytes] = useState(0);
  const maxByte = 150;

  const onSubmitReview = () => {
    onSubmit(date, wroteReview);
    setReviewIsActive(false);
  };

  const onDeleteReview = () => {
    onRemove(date);
    setWroteReview('');
    setReviewIsActive(false);
    setTotalBytes(0);
  };

  return (
    <>
      {reviewIsActive && (
        <StyledDailyReviewModal
          onMouseDown={() => {
            setReviewIsActive(false);
          }}
        />
      )}
      <StyledDailyReview>
        <textarea
          name='dailyReview'
          id='dailyReview'
          rows='2'
          placeholder='오늘도 즐거운 식사 되셨나요? 오늘의 느낀 점을 기록해보세요. (180btyes 이내)'
          value={wroteReview}
          onChange={e => {
            totalBytes < maxByte && setWroteReview(e.target.value);
            setTotalBytes(checkByte(e));
          }}
          onFocus={e => setTotalBytes(checkByte(e))}
          ref={dailyTextarea}
          disabled={reviewIsActive ? '' : 'disabled'}
        ></textarea>
        {reviewIsActive && (
          <>
            <span>{totalBytes}/150bytes</span>
            <button onMouseDown={() => onDeleteReview()}>삭제</button>
            <button onMouseDown={() => onSubmitReview()}>등록</button>
          </>
        )}
      </StyledDailyReview>
    </>
  );
}