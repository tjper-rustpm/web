import React from "react";
import cx from "classnames";

import Typography from "@material-ui/core/Typography";

import styles from "./IconDetail.module.css";

const IconDetail = props => {
  let style = styles.medium;
  switch (props.variant) {
    case "small":
      style = styles.small;
      break;
    case "large":
      style = styles.large;
      break;
    default:
  }
  const iconCN = cx(styles.icon, props.className, {
    [styles.tilt]: props.tilt
  });
  const Icon = props.icon;
  return (
    <div className={style}>
      <div className={styles.wrapper}>
        <Icon className={iconCN} />
        <Typography className={styles.detail} display="inline">
          {props.detail}
        </Typography>
      </div>
    </div>
  );
};

export default IconDetail;
