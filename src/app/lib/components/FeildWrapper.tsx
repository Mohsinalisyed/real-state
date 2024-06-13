import React from "react";
import { Flex } from "../Ui";
import { HeadingL, HeadingM } from "@/app/components/styles";
interface IFeild {
  heading: string;
  data: string | number | undefined;
}
export const FeildWrapper: React.FC<IFeild> = ({ heading, data }) => {
  return (
    <Flex>
      {!!heading && <HeadingM className="text-zinc">{heading}:</HeadingM>}
      <HeadingL className="pl-1">{data}</HeadingL>
    </Flex>
  );
};
