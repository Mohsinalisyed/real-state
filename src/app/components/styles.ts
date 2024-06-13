import styled from "styled-components";
const plusJakartaSans = "Plus Jakarta Sans, sans-serif";
import { Menu } from "react-pro-sidebar";

export const StyledMenu = styled(Menu)`
  height: 80vh;
  li {
    padding: 0px;
  }
  .ps-menu-button {
    paddingleft: 20px !important;
  }
`;
// Common styles
const commonStyles = () => `
  font-family: ${plusJakartaSans};
  line-height: 21px;
  -webkit-font-smoothing: antialiased;
  margin:0;
`;

// Heading (XL)
export const HeadingXL = styled.h1`
  ${commonStyles}
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
`;

// Heading (L)
export const HeadingL = styled.h2`
  ${commonStyles}

  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
`;

// Heading (M)
export const HeadingM = styled.h3`
  ${commonStyles}

  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;
export const HeadingSM = styled.h3`
  ${commonStyles}

  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
`;

// Heading (S)
export const HeadingS = styled.h4`
  ${commonStyles}
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

// Additional variant with Medium weight
export const MediumText = styled.p`
  ${commonStyles}

  font-weight: medium;
  font-size: 13px;
  line-height: 23px;
`;

export const Container = styled.div`
  ${commonStyles}
  margin: 0 auto;
  padding: 0;
  max-width: 1920px;
`;
