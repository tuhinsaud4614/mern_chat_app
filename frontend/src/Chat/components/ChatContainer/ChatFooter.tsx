import { FC, FormEvent, ChangeEvent, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton, Paper, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) =>
  createStyles({
    chatFooter: {
      padding: theme.spacing(1.5),
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
      margin: 0,
    },
  })
);

interface Props {
  addMsg(msg: string, img: string, dateTime: Date): void;
}

const ChatFooter: FC<Props> = ({ addMsg }) => {
  const classes = useStyles();
  const [messageText, setMessageText] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const onImgChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length === 1) {
      const image = files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        if (result) {
          addMsg("", result.toString(), new Date());
        }
      };
      fileReader.readAsDataURL(image);
    }
  };

  const onSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMsg(messageText, "", new Date());
    setMessageText("");
  };

  return (
    <form onSubmit={onSubmitted}>
      <Paper variant="outlined" square className={classes.chatFooter}>
        <input
          type="file"
          id="imgMsg"
          name="imgMsg"
          accept=".jpg, .png, .jpeg"
          onChange={onImgChange}
          hidden
        />
        <label htmlFor="imgMsg">
          <IconButton component="span" color="secondary">
            <ImageIcon />
          </IconButton>
        </label>
        <TextField
          id="message-text"
          name="messageText"
          type="text"
          value={messageText}
          autoFocus
          onChange={onChangeHandler}
          variant="outlined"
          margin="normal"
          fullWidth
          rowsMax={3}
          multiline
          className={classes.input}
        />

        <IconButton type="submit" color="primary" disabled={!messageText}>
          <SendIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

export default ChatFooter;
