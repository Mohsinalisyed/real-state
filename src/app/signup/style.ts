import styled from "styled-components";

export const AuthCard = styled.div`
  padding: 24px; /* Equivalent to p-8 */
  margin-bottom: 0; /* Equivalent to md:mb-0 */
  width: calc(100% - 24px); /* Equivalent to md:w-8/12 */

  @media (min-width: 768px) {
    width: calc(41.666% - 24px); /* Equivalent to lg:w-5/12 */
  }

  @media (min-width: 1024px) {
    width: calc(48.666% - 24px); /* Equivalent to xl:w-5/12 */
  }

  border-radius: 8px; /* Equivalent to rounded-lg */
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
