import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../config/api';

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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import Alert from '@mui/material/Alert';

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

export default function DashboardClientes(prop) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [status, setStatus] = useState({
    tipo: '',
    mensagem: ''
  })

  const [clientes, setClientes] = useState([]);

  const [novoCliente, setNovoCliente] = useState({
    razaoSocial: '',
    cnpj: ''
  })

  const valorInput = e => setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value })

  useEffect(() => {
    const getClientes = async () => {
      await api.get('/listarClientes').then((res) => {
        //console.log(res.data)
        setClientes(res.data);
      }).catch((erro) => {
        console.log(erro);
      });
    }

    getClientes();
  }, []);

  const newCliente = async e => {
    e.preventDefault();
    await api.post('/novoCliente', novoCliente).then((res) => {
      setStatus({
        tipo: 'sucess',
        mensagem: 'Cliente cadastrado com sucesso.'
      })
      setTimeout(function () {
        return window.location.reload();
      }, 1000);
    }).catch(() => {
      setStatus({
        tipo: 'error',
        mensagem: 'Erro durante tentativa de cadastro.'
      })
    });
  }

  const deleteCliente = async (id) => {
    //console.log(id)
    await api.delete('/deletarCliente/' + id).then(() => {
      setTimeout(function () {
        return window.location.reload();
      }, 300);
    }).catch(() => {

    })
  }

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
              Pipo Sa??de - Clientes
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
                    <Grid item xs={5}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="razaoSocial"
                        label="Raz??o Social da Empresa"
                        name="razaoSocial"
                        onChange={valorInput}
                      />
                    </Grid>
                    <Grid item xs={5} style={{ marginLeft: '15px' }}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cnpj"
                        label="CNPJ da empresa"
                        name="cnpj"
                        onChange={valorInput}
                      />
                    </Grid>
                    <Grid item xs={1} style={{ marginLeft: '15px' }}>
                      <Fab color="primary" aria-label="add" onClick={newCliente}>
                        <AddIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TableContainer>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Cliente/Empresa</StyledTableCell>
                          <StyledTableCell align="center">CNPJ</StyledTableCell>
                          <StyledTableCell align="center">Op????es</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {clientes.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                              {row.razaoSocial}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.cnpj}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Link to={"/novoFuncionario/" + row._id} style={{ color: 'black', textDecoration: 'none' }}>
                                <Button variant="contained" startIcon={<AccountCircleIcon />}>
                                  Funcion??rios
                                </Button>{' '}
                              </Link>
                              <Link to={"/editarCliente/" + row._id} style={{ color: 'black', textDecoration: 'none' }}>
                                <Button
                                  variant="contained"
                                  startIcon={<LocalHospitalIcon />}
                                  style={{backgroundColor: '#FFA500'}}
                                >
                                  Benef??cios
                                </Button>{' '}
                              </Link>
                              <Fab
                                size="small"
                                color="primary"
                                style={{ backgroundColor: 'red' }}
                                aria-label="add"
                                onClick={() => deleteCliente(row._id)}
                              >
                                <DeleteForeverIcon />
                              </Fab>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}