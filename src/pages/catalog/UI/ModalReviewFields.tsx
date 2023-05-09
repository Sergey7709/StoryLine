import { Rating, Textarea } from '@mantine/core';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { ReviewUpdate } from '../../../common/types';

type ModalREviewFieldsProps = {
  setReview: Dispatch<SetStateAction<ReviewUpdate>>;
  review: ReviewUpdate;
};

const ModalReviewFields: FC<ModalREviewFieldsProps> = ({ review, setReview }) => {
  return (
    <>
      <Rating value={review.rate} onChange={(rate) => setReview((prev) => ({ ...prev, rate }))} />
      <Textarea
        onChange={(e) => setReview((prev) => ({ ...prev, text: e.target.value }))}
        autosize
        value={review.text}
        placeholder="Ваш отзыв"
        mt={10}
        mb={20}
        size="sm"
        color="dimmed"
      />
    </>
  );
};

export default ModalReviewFields;
