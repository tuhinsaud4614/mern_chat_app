import { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Avatar, Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    statusBadge: {
      backgroundColor: "#44b700",
      color: "#44b700",

      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "1px solid #44b700",
        animation: "$ripple 1.2s infinite ease-in-out",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(0.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
);

interface Props {
  avatar: string;
  name: string;
}

const StatusAvatar: FC<Props> = ({ name, avatar }) => {
  const classes = useStyles();
  return (
    <Badge
      classes={{ badge: classes.statusBadge }}
      overlap="circle"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar src={avatar} alt={name} />
    </Badge>
  );
};

export default StatusAvatar;
