import { SVGAttributes } from "react";

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  color?: string;
  width?: string;
  height?: string;
}
