import { Icon } from "@chakra-ui/react";

export const ExitIcon = (props: object) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M16.5 15V19.5H5.5V5.5H16.5V10M10 12.5H22.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M20 10L22.5 12.5L20 15" stroke="currentColor" strokeWidth="2" />
  </Icon>
);
