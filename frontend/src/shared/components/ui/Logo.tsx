import { FC } from "react";
import { Typography } from "@material-ui/core";

interface Props {
  className?: string;
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <Typography className={className} variant="h6">
      MY CHAT
    </Typography>
  );
};

export default Logo;
