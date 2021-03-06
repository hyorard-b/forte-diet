import { StyledRadioGroup, StyledRadioTitle } from './SignUpRadioGroup.styled';
import { InputRadio } from 'components';

const SignUpFormRadioGroup = ({ groupTitle, onChange, SelectGender, name }) => {
  return (
    <>
      <StyledRadioGroup>
        <StyledRadioTitle>{groupTitle}</StyledRadioTitle>
        {/* <Icons type="gender" /> */}
        <InputRadio id='female' name='gender' value='female' label='여성' onChange={onChange} />
        <InputRadio id='male' name='gender' value='male' label='남성' onChange={onChange} />
      </StyledRadioGroup>
    </>
  );
};

export default SignUpFormRadioGroup;
