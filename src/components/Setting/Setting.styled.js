import styled from "styled-components";
import { palette } from "styles";

export const StyledFormWrapper = styled.div`
  margin-top: 5rem;
  padding: 0 0 4rem 1.8rem;
  border-radius: 5px;
  background-color: ${palette.themeBrightYellow};
  /* box-shadow: 0 0 10px 5px ${palette.themePrimary}; */
  box-shadow: 0 0 5px 5px ${palette.themeTertiary};
`;

export const StyledInputWrapper = styled.div`
  margin-top: 4.5rem;
`;

// export const StyledSettingInput = styled(Input)`
//   label {
//     display: inline-block;
//     font-size: 1.2rem;
//     width: 60px;
//     text-align: right;
//   }

//   input {
//     width: 30rem;
//     height: 35px;
//     font-size: 1.1rem;
//     margin-left: 15px;
//     margin-bottom: 2rem;

//     // 스타일링 바꿔보는중
//     border: none;
//     border-radius: 0;
//     border-bottom: 2px solid ${palette.themeTertiary};
//     background-color: inherit;
//   }
// `;

export const StyledSettingInput = styled.div`
  position: relative;
  /* padding-left: 1rem; */

  label {
    display: inline-block;
    font-size: 1.2rem;
    width: 60px;
    text-align: right;
  }

  input {
    box-sizing: border-box;
    width: 30rem;
    height: 35px;
    font-size: 1.1rem;
    margin-left: 2rem;
    margin-bottom: 2rem;
    padding-right: 35px;
    border-radius: 0;

    border: 0;
    border-bottom: 1px solid ${palette.themePrimary};

    &:focus {
      border: 2px solid;
      /* border-image: linear-gradient(to left, #61c69d 0%, #2d72bc 100%); */
      border-image: linear-gradient(to left, #f12711 0%, #f5af19 100%);
      /* border-image: linear-gradient(to left, #1e9600, #fff200, #ff0000); */
      border-image-slice: 1;

      /* transition: border linear 0.3s; */
    }
  }

  svg {
    position: absolute;
    top: 7px;
    right: 45px;
    cursor: pointer;
    /* opacity: 0; */
  }
`;

export const StyledRadio = styled.div`
  width: 417px;
  margin-bottom: 2rem;

  p {
    display: inline-block;
    font-size: 1.2rem;
    text-align: right;
    width: 60px;
    margin-right: 2rem;
  }

  label {
    box-sizing: border-box;
    width: 151px;
    height: 35px;
    line-height: 35px;

    &:hover {
      /* border: 2px solid #f5af19; */
      background: linear-gradient(to bottom, #fdc830, #f37335);
    }
  }
`;

export const StyledButtonGroup = styled.div`
  padding-top: 20px;
`;