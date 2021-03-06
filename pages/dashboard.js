import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MainListItems from '../components/dashboard/list-items';
import SimpleLineChart from '../components/dashboard/simple-line-chart';
import SimpleTable from '../components/dashboard/simple-table';
import BlockchainStepper from '../components/dashboard/horizontal-blockchain-stepper';

import PortOperationsContent from '../components/dashboard/port-operations-content';
import MapOperations from '../components/dashboard/map-operations';
import Snackbar from '../components/snackbar';


import TruckIcon from '@material-ui/icons/LocalShipping';
import CraneIcon from '@material-ui/icons/Subway';
import ContainerIcon from '@material-ui/icons/Store';
import VesselIcon from '@material-ui/icons/Waves';
import RailIcon from '@material-ui/icons/DirectionsRailway';
import FilterIcon from '@material-ui/icons/FilterList';

import Notifications from '../components/notification';

import { setInterval } from 'timers';

import { dummyTimelineInfo } from '../helper/dummy-data';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FileUploadCard from '../components/dashboard/container-file-upload-card'
import EventsTable from '../components/dashboard/events-table';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  selectedTab: {
    background: '#fff',
    color: '#800080',
    '&:hover': {
      color: '#800080',
      background: '#fff',
    }
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    selectedTab: 'container_information_system',
    notifications: [1],
    currentSidebarFilter: 'container_information_system',
    checkedFilters: [
      //berth allocation
      'Allocated', 
      'To be allocated',
      //logistics
      'Logistic1',
      'Logistic2',
      //maintaince
      'Trucks', 
      'Cranes'
    ]
  };

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     notifications: [...this.state.notifications, this.state.notifications[this.state.notifications.length - 1] + 1]
    //   });
    // }, 7500);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  mapOperationsFilterNode = () => {
    return (
      <React.Fragment>
        <List>{
          <MainListItems
            checkedFilters={this.state.checkedFilters}
            handleToggle={this.handleSidebarFilterToggle}
            icon={<TruckIcon />}
            title="TRUCKS"
            options={[1, 2]}
            open={true}
          />
        }</List>
        <Divider />
        <List>{<MainListItems checkedFilters={this.state.checkedFilters} handleToggle={this.handleSidebarFilterToggle} icon={<CraneIcon />} title="CRANES" options={[3, 4]} />}</List>
        <Divider />
        <List>{<MainListItems checkedFilters={this.state.checkedFilters} handleToggle={this.handleSidebarFilterToggle} icon={<ContainerIcon />} title="CONTAINER" options={[5, 6]} />}</List>
        <Divider />
        <List>{<MainListItems checkedFilters={this.state.checkedFilters} handleToggle={this.handleSidebarFilterToggle} icon={<VesselIcon />} title="VESSEL" options={[7, 8]} />}</List>
        <Divider />
        <List>{<MainListItems checkedFilters={this.state.checkedFilters} handleToggle={this.handleSidebarFilterToggle} icon={<RailIcon />} title="RAIL" options={[9, 10]} />}</List>
      </React.Fragment>
    )
  }

  maintenanceFilterNode = () => {
    const { checkedFilters } = this.state;
    return (
      <React.Fragment>
        <List>
          {
            <MainListItems
              checkedFilters={this.state.checkedFilters}
              icon={<FilterIcon />}
              title="FILTER"
              options={['Trucks', 'Cranes']}
              checkAllFilters
              open={true}
              handleToggle={this.handleSidebarFilterToggle}
            />
          }
        </List>
      </React.Fragment>
    )
  }


  logisticsFilterNode = () => {
    const { checkedFilters } = this.state;
    return (
      <React.Fragment>
        <List>
          {
            <MainListItems
              checkedFilters={this.state.checkedFilters}
              icon={<FilterIcon />}
              title="FILTER"
              options={['Logistic1', 'Logistic2']}
              checkAllFilters
              open={true}
              handleToggle={this.handleSidebarFilterToggle}
            />
          }
        </List>
      </React.Fragment>
    )
  }

  berthAllocationFilterNode = () => {
    const { checkedFilters } = this.state;
    return (
      <React.Fragment>
        <List>
          {
            <MainListItems
              checkedFilters={this.state.checkedFilters}
              icon={<FilterIcon />}
              title="FILTER"
              options={['Allocated', 'To be allocated']}
              checkAllFilters
              open={true}
              handleToggle={this.handleSidebarFilterToggle}
            />
          }
        </List>
      </React.Fragment>
    )
  }

  handleSidebarFilterChange = (currentSidebarFilter) => {
    this.setState({
      currentSidebarFilter
    });
  }

  handleSidebarFilterToggle = value => () => {
    const { checkedFilters } = this.state;
    const currentIndex = checkedFilters.indexOf(value);
    const newChecked = [...checkedFilters];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedFilters: newChecked,
    });
  };

  getFilterNode = (currentSidebarFilter) => {
    switch (currentSidebarFilter) {
      case 'container_and_space_management':
        return this.mapOperationsFilterNode();
        break;
      case 'berth_allocation':
        return this.berthAllocationFilterNode();
      case 'logistics':
        return this.logisticsFilterNode();
      case 'maintenance':
        return this.maintenanceFilterNode();
      case 'container_information_system':
        return this.mapOperationsFilterNode();
      case 'map_operations':
        return this.berthAllocationFilterNode();
      case 'port_operations':
        return this.berthAllocationFilterNode();
      case 'transport':
        return this.berthAllocationFilterNode();
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    const { notifications, selectedTab, currentSidebarFilter, checkedFilters } = this.state;

    let content;

    switch (selectedTab) {
      case 'container_information_system':
        content = <ContainerInfoSystemContent classes={classes} />;
        break;
      case 'map_operations':
        content = <MapOperations />;
        break;
      case 'port_operations':
        content = <PortOperationsContent checkedFilters={checkedFilters} handleSidebarFilterChange={this.handleSidebarFilterChange} />;
        break;
      case 'transport':
        content = <PortOperationsContent />;
        break;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Dashboard
              </Typography>
              <Button
                color="inherit"
                className={
                  classNames(
                    selectedTab === 'container_information_system' && classes.selectedTab || ''
                  )
                }
                onClick={() => this.setState({ selectedTab: 'container_information_system' })}
              >
                CONTAINER INFORMATION SYSTEM
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'map_operations' && classes.selectedTab || ''
                }
                onClick={() => this.setState({ selectedTab: 'map_operations' })}
              >
                MAP OPERATIONS
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'port_operations' && classes.selectedTab || ''
                }
                onClick={() => this.setState({ selectedTab: 'port_operations' })}
              >
                PORT OPERATIONS
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'transport' && classes.selectedTab || ''
                }
                onClick={() => this.setState({ selectedTab: 'transport' })}
              >
                TRANSPORT
              </Button>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit">
                {/* <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge> */}
                <Notifications />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            {this.getFilterNode(currentSidebarFilter)}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {content}
          </main>
        </div>
        {
          notifications.map(
            (notification) => (
              <Snackbar
                message={notification}
              />
            )
          )
        }
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const dummyTimelineInfoMapped = dummyTimelineInfo.map((info, index) => {
  return ({
    date: info.date,
    component: (
      <div className='container' key={index}>
        <h1>{ `SOME DATA ABOUT EVENT${index + 1}:`}</h1>
        <h2>{ info.subtitle }</h2>
        <hr />
        <p>{ info.content}</p>
        <hr />
      </div>
    )
  });
});

const ContainerInfoSystemContent = ({ classes }) => (
  <React.Fragment>
    {/* <Typography variant="display1" gutterBottom>
      Orders
    </Typography>
    <Typography component="div" className={classes.chartContainer}>
      <SimpleLineChart />
    </Typography>
    <Typography variant="display1" gutterBottom>
      Products
    </Typography>
    <div className={classes.tableContainer}>
      <SimpleTable />
    </div> */}
    {/* <HorizontalTimeline content={dummyTimelineInfoMapped}/> */}
    <BlockchainStepper />
    <div style={{marginTop: 100}}/>
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <EventsTable/>
      </Grid>
      <Grid item xs={6}>
        <FileUploadCard />
      </Grid>
    </Grid>
    {/* <GridList cellHeight={300} spacing={1} style={{marginTop: 100}}>
      <GridListTile key="some table1" cols="1" rows="1">
            <EventsTable/>
          </GridListTile>
          <GridListTile key="some table" cols="1" rows="1">
            <FileUploadCard />
          </GridListTile>
          <GridListTile key="some table" cols="2" rows="2" style={{marginTop: 50}}>
            1
            <GridListTileBar
              title="1"
              titlePosition="top"
              actionPosition="left"
            />
          </GridListTile>
      </GridList> */}
  </React.Fragment>
)

// const transportContent = () => ();

export default withStyles(styles)(Dashboard);
