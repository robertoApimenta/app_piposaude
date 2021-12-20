import * as React from 'react';
import { Link } from "react-router-dom";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LayersIcon from '@mui/icons-material/Layers';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
        <LocalHospitalIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/beneficios">
        <ListItemText primary="Benefícios" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ApartmentIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/clientes">
        <ListItemText primary="Clientes" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Ficha de cadastro" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
        <ListItemText primary="Relatórios" />
      </Link>
    </ListItem>
  </div>
);