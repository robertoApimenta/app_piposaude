import * as React from 'react';
import { Link } from "react-router-dom";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const mainListItems = (
  <div>
    <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link style={{ color: 'black', textDecoration: 'none' }} to="/beneficios">
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Benefícios" />
      </ListItem>
    </Link>
    <Link style={{ color: 'black', textDecoration: 'none' }} to="/clientes">
      <ListItem button>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </Link>
  </div>
);