import { FC } from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    tabSkeleton: {
      overflow: "hidden",
      width: "100%",
      margin: 0,
    },
    s1: {
      height: "40px",
      borderRadius: theme.shape.borderRadius,
    },
  })
);

const ChatTabSkeleton: FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      className={classes.tabSkeleton}
      spacing={2}
    >
      <Grid item>
        <Skeleton animation="wave" variant="rect" className={classes.s1} />
      </Grid>
      <Grid item>
        <Skeleton variant="rect" className={classes.s1} />
      </Grid>
      <Grid xs item container style={{ margin: 0, padding: 0 }} spacing={1}>
        {/* Item start */}
        <Grid item container spacing={2} style={{ margin: 0 }}>
          <Grid item>
            <Skeleton variant="circle" height={40} width={40} />
          </Grid>
          <Grid xs item container direction="column">
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
          </Grid>
        </Grid>
        {/* Item end */}
        {/* Item start */}
        <Grid item container spacing={2} style={{ margin: 0 }}>
          <Grid item>
            <Skeleton variant="circle" height={40} width={40} />
          </Grid>
          <Grid xs item container direction="column">
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
          </Grid>
        </Grid>
        {/* Item end */}
        {/* Item start */}
        <Grid item container spacing={2} style={{ margin: 0 }}>
          <Grid item>
            <Skeleton variant="circle" height={40} width={40} />
          </Grid>
          <Grid xs item container direction="column">
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
          </Grid>
        </Grid>
        {/* Item end */}
        {/* Item start */}
        <Grid item container spacing={2} style={{ margin: 0 }}>
          <Grid item>
            <Skeleton variant="circle" height={40} width={40} />
          </Grid>
          <Grid xs item container direction="column">
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
            <Grid item>
              <Skeleton variant="text" />
            </Grid>
          </Grid>
        </Grid>
        {/* Item end */}
      </Grid>
    </Grid>
  );
};

export default ChatTabSkeleton;
