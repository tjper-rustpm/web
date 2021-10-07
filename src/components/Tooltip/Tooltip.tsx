import styled from 'styled-components';

import MaterialTooltip from '@material-ui/core/Tooltip';

type TooltipProps = {
  className?: string;
};
const Tooltip = styled((props) => <MaterialTooltip classes={{ popper: props.className }} {...props} />)<TooltipProps>`
  & .MuiTooltip-tooltip {
    font-size: 1.6rem;
  }
`;

export default Tooltip;
