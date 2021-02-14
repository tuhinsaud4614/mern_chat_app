import { FC } from "react";
import { Drawer, DrawerClassKey, Hidden } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

interface IBreakPoints {
  xlDown?: boolean;
  xlUp?: boolean;
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  smDown?: boolean;
  smUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
}

interface Props {
  anchor?: "bottom" | "left" | "right" | "top";
  hiddenBreakPoints?: IBreakPoints;
  mobileHiddenBreakPoints?: IBreakPoints;
  onMobileClosed(value: boolean): void;
  isMobileOpen: boolean;
  classes?: Partial<Record<DrawerClassKey, string>>
}

const SideBar: FC<Props> = ({
  isMobileOpen,
  onMobileClosed,
  anchor,
  hiddenBreakPoints,
  mobileHiddenBreakPoints,
  classes,
  children,
}) => {
  return (
    <>
      <Hidden {...mobileHiddenBreakPoints} implementation="css">
        <Drawer
          classes={classes}
          anchor={anchor}
          variant="temporary"
          open={isMobileOpen}
          onClose={() => onMobileClosed(false)}
          ModalProps={{ keepMounted: true }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden {...hiddenBreakPoints} implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={classes}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};

export default SideBar;
