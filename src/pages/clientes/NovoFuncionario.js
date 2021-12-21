import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { Link } from "react-router-dom";
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

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import Alert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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



export const NovoFuncionario = (props) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [funcionario, setFuncionario] = useState({
    nome: '',
    cpf: '',
    email: ''
  });

  const [funcionarios, setFuncionarios] = useState([]);

  const valorInput = e => setFuncionario({ ...funcionario, [e.target.name]: e.target.value })

  const { id } = useParams();

  const [status, setStatus] = useState({
    tipo: '',
    mensagem: ''
  });

  const [razaoSocial, setRazaoSocial] = useState('');

  useEffect(() => {

    const getCliente = async () => {
      await api.get('/listarCliente/' + id).then((res) => {
        setRazaoSocial(res.data.razaoSocial)
      }).catch((erro) => {
        console.log(erro);
      });
      await api.get('/listarFuncionarios/' + id).then((res) => {
        setFuncionarios(res.data.usuarios);
      })
    }
    getCliente();
  }, [id]);

  const novoFuncionario = async e => {
    e.preventDefault();
    const dados = {
      id: id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email
    }
    await api.post('/novoFuncionario', dados).then((res) => {
      setStatus({
        tipo: res.data.erro,
        mensagem: res.data.mensagem
      })
    })
    setTimeout(function () {
      return window.location.reload();
    }, 1000);
  }

  const deleteFuncionario = async (id) => {
    await api.delete('/deletarFuncionario/' + id).then(() => {
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
              {razaoSocial} - Funcionários
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
            <Grid item xs={12} md={12} lg={12}>
              {status.tipo === true ? <Alert severity="warning">{status.mensagem}</Alert> : ""}
              {status.tipo === false ? <Alert severity="success">{status.mensagem}</Alert> : ""}
              <p>Novo funcionário</p>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Grid container>
                  <Grid item xs={3} >
                    <TextField
                      required
                      id="standard-basic"
                      label="Nome completo"
                      variant="standard"
                      fullWidth
                      name="nome"
                      onChange={valorInput}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ ml: 2 }}>
                    <TextField
                      required
                      id="standard-basic"
                      label="CPF"
                      variant="standard"
                      fullWidth
                      name="cpf"
                      onChange={valorInput}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ ml: 2 }}>
                    <TextField
                      required
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      fullWidth
                      name="email"
                      onChange={valorInput}
                    />
                  </Grid>

                  <Grid item xs={1} sx={{ marginLeft: '30px' }}>
                    <Fab onClick={novoFuncionario} color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Container>

          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12} md={12} lg={12}>
              <p>Funcionários</p>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {funcionarios.length === 0 ? <Alert severity="warning">Nenhum funcionário cadastrado.</Alert> :
                  <div>
                    <TableContainer>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Funcionário</StyledTableCell>
                            <StyledTableCell align="center">CPF</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Opções</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {funcionarios.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell component="th" scope="row">
                                {row.nome}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.cpf}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.email}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Link to={"/beneficiosFuncionario/" + row._id} style={{ textDecoration: 'none' }}>
                                  <Fab size="small" color="primary" aria-label="add">
                                    <LocalHospitalIcon />
                                  </Fab>{' '}
                                </Link>
                                <Link to={"/editarFuncionario/" + row._id} style={{ textDecoration: 'none' }}>
                                  <Fab size="small" color="primary" style={{ backgroundColor: '#FFA500' }} aria-label="add">
                                    <EditIcon />
                                  </Fab>{' '}
                                </Link>
                                <Fab
                                  size="small"
                                  color="primary"
                                  style={{ backgroundColor: 'red' }}
                                  aria-label="add"
                                  onClick={() => deleteFuncionario(row._id)}
                                >
                                  <DeleteForeverIcon />
                                </Fab>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                }
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}