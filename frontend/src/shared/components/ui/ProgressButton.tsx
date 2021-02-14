import { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, ButtonProps, CircularProgress } from "@material-ui/core";

interface Props extends ButtonProps {
  customClass?: string;
  loading: boolean;
  progressSize?: number;
}

const useStyles = makeStyles<Theme, { size: number }>((theme) =>
  createStyles({
    progressButton: {
      position: "relative",
    },
    progress: ({ size }) => ({
      color: theme.palette.primary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: (size / 2) * -1,
      marginLeft: (size / 2) * -1,
    }),
  })
);

const ProgressButton: FC<Props> = (props) => {
  const { progressSize, customClass, loading, ...otherProps } = props;
  const classes = useStyles({ size: progressSize ? progressSize : 24 });
  return (
    <div className={`${classes.progressButton} ${customClass || ""}`}>
      <Button {...otherProps}>{props.children}</Button>
      {loading && (
        <CircularProgress
          size={props.progressSize || 24}
          className={classes.progress}
        />
      )}
    </div>
  );
};

export default ProgressButton;
