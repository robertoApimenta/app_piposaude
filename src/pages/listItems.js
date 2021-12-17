import * as React from 'react';
import { Link } from "react-router-dom";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/beneficios">
        <ListItemText primary="Benefícios" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Clientes" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Benefícios" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Benefícios" />
      </Link>
    </ListItem>
  </div>
);