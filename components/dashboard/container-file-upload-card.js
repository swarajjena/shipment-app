import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  fileInput: {
    display: 'none'
  },
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Upload document</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Select document "A"</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography variant="caption">Some helper info</Typography>
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <input
              className={classes.fileInput}
              id="flat-button-file"
              multiple
              type="file"
            />
            <label htmlFor="flat-button-file">
              <Button component="span" className={classes.button}>
                <Typography variant="caption">
                  Upload
                </Typography>
              </Button>
            </label>
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              some thing
              <br />
              <a href="#sub-labels-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Button variant="contained" color="primary">
              <Typography variant="caption" style={{color: '#fff'}}>
                Approve
              </Typography>
            </Button>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          {/* <Button size="small">Cancel</Button> */}
          <Button size="small" color="primary">
            Download
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);