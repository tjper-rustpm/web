import React, { useState } from "react";
import { DateTime } from "luxon";

import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import BookmarkIcon from "@material-ui/icons/Bookmark";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import TimerIcon from "@material-ui/icons/Timer";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import MapIcon from "@material-ui/icons/Map";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CasinoIcon from "@material-ui/icons/Casino";
import ScheduleIcon from "@material-ui/icons/Schedule";

import IconDetail from "./IconDetail/IconDetail";
import { useInterval } from "../../hooks/set-interval.js";
import styles from "./Cron.module.css";

const Cron = props => {
  const [open, setOpen] = useState(false);
  const sessionCountdown = useCountdown(props.cron.schedule.start);

  return (
    <Paper elevation={7} className={styles.Paper}>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className={styles.wrapper}
      >
        <Grid item>
          <IconButton color="secondary" size="small">
            <BookmarkIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="secondary" size="small">
            <MonetizationOnIcon />
          </IconButton>
        </Grid>
        <Grid item className={styles.thumbnailItem}>
          <img
            className={styles.thumbnail}
            src={props.cron.thumbnail}
            alt="thumbnail"
          />
        </Grid>
        <Grid item className={styles.nameItem}>
          <Typography variant="h6" display="inline" className={styles.name}>
            {props.cron.name}
            {props.cron.online ? (
              <FiberManualRecordIcon className={styles.online} />
            ) : null}
          </Typography>
        </Grid>
        <Grid item className={styles.countdownItem}>
          <IconDetail
            icon={props.cron.online ? HourglassEmptyIcon : TimerIcon}
            detail={sessionCountdown.toFormat("hh:mm:ss")}
            variant="medium"
            className={styles.countdown}
          />
        </Grid>
        <Grid item className={styles.details}>
          <Grid container>
            <Grid item className={styles.players}>
              <IconDetail
                icon={PeopleIcon}
                detail={`${props.cron.players.current} / ${props.cron.players.max}`}
                variant="small"
              />
            </Grid>
            <Grid item className={styles.schedule}>
              <IconDetail
                icon={ScheduleIcon}
                detail={`${props.cron.schedule.start.toLocaleString(
                  DateTime.TIME_SIMPLE
                )} - ${props.cron.schedule.end.toLocaleString(
                  DateTime.TIME_SIMPLE
                )}`}
                variant="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.expand}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={open}>
        <Grid
          container
          justify="space-evenly"
          className={styles.mobileDropdown}
        >
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <IconDetail
                  icon={PeopleIcon}
                  detail={`${props.cron.players.current} / ${props.cron.players.max}`}
                  variant="small"
                />
              </Grid>
              <Grid item>
                <IconDetail
                  icon={GroupWorkIcon}
                  detail={`${props.cron.groups.min} - ${props.cron.groups.max}`}
                  variant="small"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <IconDetail
                  icon={MapIcon}
                  detail={props.cron.map.size}
                  variant="small"
                />
              </Grid>
              <Grid item>
                <IconDetail
                  icon={CasinoIcon}
                  detail={props.cron.map.seed}
                  variant="small"
                  tilt
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <IconDetail
                  icon={ScheduleIcon}
                  detail={`${props.cron.schedule.start.toLocaleString(
                    DateTime.TIME_SIMPLE
                  )} - ${props.cron.schedule.end.toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}`}
                  variant="small"
                />
              </Grid>
              <Grid item>
                <IconDetail
                  icon={EventIcon}
                  detail={props.cron.wipe.frequency}
                  variant="small"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

const useCountdown = start => {
  const [countdown, setCountdown] = useState(
    start.diffNow(["hours", "minutes", "seconds"])
  );
  useInterval(() => {
    if (!countdown) return;
    setCountdown(countdown.minus(1000));
  }, 1000);
  return countdown;
};

export default Cron;
