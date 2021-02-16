import { FC } from "react";
import { Divider, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    tabSkeleton: {
      overflow: "hidden",
      width: "100%",
      height: "calc(100vh - 64px)",
    },
    header: {
      padding: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(2),
    },
  })
);

const ChatContainerSkeleton: FC = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.tabSkeleton}>
      {/* Chat Header start */}
      <Grid item container className={classes.header}>
        <Grid item>
          <Skeleton variant="circle" height={40} width={40} />
        </Grid>
        <Grid
          xs
          item
          container
          direction="column"
          style={{ marginLeft: "8px", maxWidth: "270px" }}
        >
          <Grid item>
            <Skeleton variant="text" width={"65%"} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Grid>
      {/* Chat Header end */}
      <Grid item>
        <Divider />
      </Grid>
      {/* Chat Content start */}
      <Grid xs item container direction="column">
        {/* Item start */}
        <Grid item container alignItems="flex-end" className={classes.content}>
          <Grid item>
            <Skeleton variant="circle" height={30} width={30} />
          </Grid>
          <Grid xs item style={{ marginLeft: "8px" }}>
            <Skeleton variant="rect" height={45} />
          </Grid>
        </Grid>
        {/* Item end */}
        {/* Item start */}
        <Grid item container alignItems="flex-end" className={classes.content}>
          <Grid item>
            <Skeleton variant="circle" height={30} width={30} />
          </Grid>
          <Grid xs item style={{ marginLeft: "8px" }}>
            <Skeleton variant="rect" height={100} width={100} />
          </Grid>
        </Grid>
        {/* Item end */}
        {/* Item start */}
        <Grid item container alignItems="flex-end" className={classes.content}>
          <Grid item>
            <Skeleton variant="circle" height={30} width={30} />
          </Grid>
          <Grid xs item style={{ marginLeft: "8px" }}>
            <Skeleton variant="rect" height={45} />
          </Grid>
        </Grid>
        {/* Item end */}
      </Grid>
      {/* Chat Content end */}
      <Grid item>
        <Divider />
      </Grid>
      {/* Chat Footer start */}
      <Grid item container alignItems="center" className={classes.content}>
        <Grid item>
          <Skeleton variant="circle" height={30} width={30} />
        </Grid>
        <Grid xs item style={{ margin: "0 8px" }}>
          <Skeleton variant="rect" height={45} />
        </Grid>
        <Grid item>
          <Skeleton variant="circle" height={30} width={30} />
        </Grid>
      </Grid>
      {/* Chat Footer end */}
    </Grid>
  );
};

export default ChatContainerSkeleton;
