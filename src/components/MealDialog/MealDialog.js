import React from "react";
import { StyledMealModalDialogContainer } from "./MealDialog.styled";
import { Form, MyPhotoView, MyReview, MyTitle } from "components";

export default function MealDialog({ id, photo, review, title, calories }) {
  return (
    <StyledMealModalDialogContainer>
      <Form legend="meal Dialog">
        <MyPhotoView photo={photo} />
        <MyTitle title={title} calories={calories} />
        <MyReview review={review} />
      </Form>
    </StyledMealModalDialogContainer>
  );
}
