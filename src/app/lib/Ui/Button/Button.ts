import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primaryLarge" | "primarySmall" | "secondary" | "destructive";
}

const buttonStyles = css`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;

const primaryButtonStyles = css`
  background-color: #635fc7;
  color: #fff;
`;

const secondaryButtonStyles = css`
  background-color: #2ecc71;
  color: #fff;
`;

const destructiveButtonStyles = css`
  background-color: #e74c3c;
  color: #fff;
`;

export const Button = styled.button<ButtonProps>`
  ${buttonStyles}

  ${({ variant }) => {
    switch (variant) {
      case "primaryLarge":
        return primaryButtonStyles;
      case "primarySmall":
        return css`
          ${primaryButtonStyles}
          font-size: 0.8rem;
        `;
      case "secondary":
        return secondaryButtonStyles;
      case "destructive":
        return destructiveButtonStyles;
      default:
        return "";
    }
  }}
`;
