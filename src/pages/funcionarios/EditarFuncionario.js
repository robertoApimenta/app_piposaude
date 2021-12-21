import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { useParams } from "react-router-dom";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../listItems';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Fab from '@mui/material/Fab';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';


import Alert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export const EditarFuncionario = (props) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [beneficio, setBeneficio] = useState('')
  const [beneficios, setBeneficios] = useState([])
  const [beneficiosClientes, setBeneficiosClientes] = useState([])

  const handleChange = (event) => {
    setBeneficio(event.target.value);
  };

  const { id } = useParams();

  const [funcionario, setFuncionario] = useState({
    idEmpresa: '',
    nome: '',
    cpf: '',
    email: ''
  });

  const [status, setStatus] = useState({
    tipo: '',
    mensagem: ''
  });

  useEffect(() => {
    const get = async () => {
      await api.get('/listarFuncionario/' + id).then((res) => {
        setFuncionario(res.data.funcionario);
        setBeneficios(res.data.beneficios);
      })
    }

    get();

  }, [id]);
  console.log(beneficios)

  const updateCliente = async e => {
    e.preventDefault();

  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Editar Funcionário
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                {status.tipo === 'sucess' ?
                  <div>
                    <Alert variant="filled" severity="success">{status.mensagem}</Alert>
                  </div>
                  : ""}
                {status.tipo === 'error' ?
                  <div>
                    <Alert variant="filled" severity="warning">{status.mensagem}</Alert>
                  </div>
                  : ""}
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 90,
                  }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <TextField
                        required
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name="nome"
                        value={funcionario.nome}
                        onChange={e => setFuncionario(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ ml: 1 }}>
                      <TextField
                        required
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name="cpf"
                        value={funcionario.cpf}
                        onChange={e => setFuncionario(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} sx={{ ml: 1 }}>
                      <TextField
                        required
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name="email"
                        value={funcionario.email}
                        onChange={e => setFuncionario(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1} style={{ marginLeft: '30px' }}>
                      <Fab onClick={updateCliente} color="primary" aria-label="add">
                        <SaveAsIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}