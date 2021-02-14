import { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  GridList,
  GridListTile,
  Paper,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import SideBar from "../../../shared/components/Navigation/SideBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    sidebarDrawerPaper: {
      width: "260px",
      [theme.breakpoints.up("sm")]: {
        position: "static",
        height: `calc(100vh - 64px)`,
      },
    },
  })
);

interface Props {
  photos: string[];
  chatDetailOpen: boolean;
  ctrlChatDetailOpen(value: boolean): void;
}

const ChatDetail: FC<Props> = ({
  chatDetailOpen,
  ctrlChatDetailOpen,
  photos,
}) => {
  const classes = useStyles();

  return (
    <SideBar
      mobileHiddenBreakPoints={{ smUp: true }}
      hiddenBreakPoints={{ xsDown: true }}
      onMobileClosed={ctrlChatDetailOpen}
      isMobileOpen={chatDetailOpen}
      anchor="right"
      classes={{ paper: classes.sidebarDrawerPaper }}
    >
      <Paper
        variant="outlined"
        square
        style={{ padding: "8px", height: "inherit" }}
      >
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Photos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GridList cellHeight={100}>
              {photos.map((tile, index) => (
                <GridListTile key={index}>
                  <img src={tile} alt={index.toString()} />
                </GridListTile>
              ))}
            </GridList>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </SideBar>
  );
};

export default ChatDetail;
