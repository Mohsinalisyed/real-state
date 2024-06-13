import styled from "styled-components";

interface FlexProps {
  direction?: string;
  align?: string;
  justify?: string;
  wrap?: string;
  gap?: string;
  gapX?: string;
  gapY?: string;
  flex?: string;
  padding?: string;
  variant?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => props.direction || "row"};
  align-items: ${(props) => props.align || "stretch"};
  justify-content: ${(props) => props.justify || "start"};
  flex-wrap: ${(props) => props.wrap || "noWrap"};
  gap: ${(props) => props.gap && `$${props.gap}`};
  column-gap: ${(props) => props.gapX && `$${props.gapX}`};
  row-gap: ${(props) => props.gapY && `$${props.gapY}`};
  flex: ${(props) => props.flex && props.theme.flex[props.flex]};
  padding: ${(props) => props.padding && `$${props.padding}`};

  ${(props) =>
    props.variant === "productsFilter" &&
    `
    align-items: center;
    border-top: 1px solid ${props.theme.productsTableBorder};
    padding: ${props.theme.space.$18} ${props.theme.space.$12};
    border-bottom: 1px solid ${props.theme.productsTableBorder};

    @media screen and (max-width: ${props.theme.breakpoints.xs_max}) {
      flex-wrap: wrap;
      gap: ${props.theme.space.$12};
      padding: ${props.theme.space.$12};
    }

    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

// Set default variants
Flex.defaultProps = {
  direction: "row",
  align: "stretch",
  justify: "start",
  wrap: "noWrap",
};
