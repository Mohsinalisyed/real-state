import styled from "styled-components";

export const Product = styled.div`
  border: 1px solid #fffdd0;
  width: 24%;
  margin: 10px 0.5%;
  border-radius: 8px;
  padding: 8px;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  @media (max-width: 768px) {
    width: 48%;
  }
  @media (min-width: 768px) {
    width: 32%;
  }

  @media (min-width: 1024px) {
    width: 24%;
  }
`;
