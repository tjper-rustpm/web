import React from "react";

import styles from "./Search.module.css";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

import FilterList from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

const search = () => {
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={styles.Search}
    >
      <SearchIcon className={styles.searchIcon} />
      <Grid item className={styles.input}>
        <InputBase
          className={styles.inputBase}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Grid>
      <Grid item className={styles.tools}>
        <IconButton aria-label="filter" color="secondary" size="small">
          <FilterList className={styles.filterIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default search;
