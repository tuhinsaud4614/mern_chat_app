import { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { dateTimeFormation } from "../../../util/time-formation";

const useStyles = makeStyles<Theme, { isOther: boolean }>((theme) =>
  createStyles({
    message: ({ isOther }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: isOther ? "flex-start" : "flex-end",
      // float: isOther ? "left" : "right",
      // clear: "both",
      padding: theme.spacing(1.2, 1.5),
    }),
    messageContainer: ({ isOther }) => ({
      display: "flex",
      alignItems: "flex-end",
      justifyContent: isOther ? "flex-start" : "flex-end",
      width: "100%",
    }),
    senderImg: {
      height: "30px",
      width: "30px",
      marginRight: theme.spacing(1.5),
    },
    messageTextBox: ({ isOther }) => ({
      padding: theme.spacing(1.5),
      maxWidth: "100%",
      color: isOther ? theme.palette.grey[50] : theme.palette.text.primary,
      backgroundColor: isOther
        ? theme.palette.primary.light
        : theme.palette.grey[300],
      borderColor: isOther ? theme.palette.grey[300] : undefined,
    }),
    messageText: {
      overflowWrap: "break-word",
      hypens: "auto",
      "-web-hypens": "auto",
      "-moz-hypens": "auto",
      "-ms-hypens": "auto",
      "-ms-word-break": "break-all",
      wordBreak: "break-all",
      wordWrap: "break-word",
    },
    messageImg: ({ isOther }) => ({
      marginBottom: theme.spacing(0.9),
      maxWidth: "100px",
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      background: isOther
        ? theme.palette.primary.light
        : theme.palette.grey[300],
    }),
    timerText: ({ isOther }) => ({
      marginTop: theme.spacing(0.9),
      paddingLeft: isOther ? 30 + theme.spacing(1.5) : undefined,
    }),
  })
);

interface Props {
  id: string;
  msg: string;
  img: string;
  avatar: string;
  creator: string;
  dateTime: Date;
}

const Message: FC<Props> = ({ id, msg, img, avatar, creator, dateTime }) => {
  const isOther = creator !== "user1";
  const classes = useStyles({ isOther: isOther });

  const timeText = (
    <Typography
      variant="caption"
      color="textSecondary"
      align={isOther ? "right" : "left"}
      component="p"
      className={classes.timerText}
    >
      {dateTimeFormation(dateTime)}
    </Typography>
  );

  return (
    <>
      {!!msg && (
        <div className={classes.message}>
          <div className={classes.messageContainer}>
            {isOther && (
              <Avatar
                className={classes.senderImg}
                src={avatar}
                alt={id.toString()}
              />
            )}
            <Paper className={classes.messageTextBox} variant="outlined">
              <Typography className={classes.messageText} component="p">
                {msg}
              </Typography>
            </Paper>
          </div>
          {timeText}
        </div>
      )}
      {!!img && (
        <div className={classes.message}>
          <div className={classes.messageContainer}>
            {isOther && (
              <Avatar
                className={classes.senderImg}
                src={avatar}
                alt={id.toString()}
              />
            )}
            <img className={classes.messageImg} src={img} alt={id.toString()} />
          </div>
          {timeText}
        </div>
      )}
    </>
  );
};

export default Message;
