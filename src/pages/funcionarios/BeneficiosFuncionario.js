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



export const BeneficiosFuncionario = (props) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  const [beneficios, setBeneficios] = useState([]);
  const [beneficiosFuncionario, setBeneficiosFuncionario] = useState([]);

  const [beneficio, setBeneficio] = useState('')
  const handleChange = (event) => {
    setBeneficio(event.target.value);
  };

  const { id } = useParams();
  const [funcionario, setFuncionario] = useState({
    'idEmpresa': '',
    'nome': '',
    'cpf': '',
    'email': '',
  });

  const [status, setStatus] = useState({
    tipo: '',
    mensagem: ''
  });

  const [dadosForm, setDadosForm] = useState({
    dataAdmissao: '',
    endereco: '',
    peso: '',
    altura: '',
    horas: ''
  });

  const valorInput = e => setDadosForm({ ...dadosForm, [e.target.name]: e.target.value });

  useEffect(() => {

    const get = async () => {
      await api.get('/listarBeneficiosFuncionario/' + id).then((res) => {
        setBeneficiosFuncionario(res.data);
      })
      await api.get('/listarFuncionario/' + id).then((res) => {
        setBeneficios(res.data.beneficios)
        setFuncionario(res.data.funcionario);
      }).catch((erro) => {
        console.log(erro);
      });
    }
    get();
  }, [id]);

  console.log(funcionario)
  console.log(dadosForm.dataAdmissao)


  const novoBeneficioFuncionario = async e => {
    e.preventDefault();
    var dados = {
      idFuncionario: id,
      idBeneficio: beneficio,
      dataAdmissao: dadosForm.dataAdmissao,
      endereco: dadosForm.endereco,
      peso: dadosForm.peso,
      altura: dadosForm.altura,
      horas: dadosForm.horas
    }
    await api.post('/novoBeneficioFuncionario', dados).then((res) => {
      setStatus({
        tipo: 'sucess',
        mensagem: 'Benef??cio adicionado com sucesso.'
      })
      setTimeout(function () {
        return window.location.reload();
      }, 1000);
    }).catch(() => {
      setStatus({
        tipo: 'error',
        mensagem: 'Benef??cio j?? adicionado.'
      })
    });
  }

  const deleteBeneficioFuncionario = async (id) => {
    await api.delete('/deletarBeneficioFuncionario/' + id).then(() => {
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
              Benef??cios - {funcionario.nome}
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
                    height: 130,
                  }}
                >
                  Adicionar benef??cio
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={10}>
                      <TextField
                        id="outlined-select-currency"
                        fullWidth
                        select
                        label="Selecione o benef??cio"
                        value={beneficio}
                        onChange={handleChange}
                      >
                        {beneficios.map((option) => (
                          <MenuItem key={option._id} value={option.idBeneficio}>
                            {option.idBeneficio}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {beneficio === 'Plano de Sa??de Norte Europa' ?
            <div>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                      }}
                    >
                      <h4>Plano de Sa??de Norte Europa</h4>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome completo</TableCell>
                              <TableCell align="center">CPF</TableCell>
                              <TableCell align="center">Data de Admiss??o</TableCell>
                              <TableCell align="center">Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{funcionario.nome}</TableCell>
                              <TableCell align="center">{funcionario.cpf}</TableCell>
                              <TableCell align="center">
                                <TextField
                                  type="date"
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="dataAdmissao"
                                  name="dataAdmissao"
                                  onChange={valorInput}
                                />
                              </TableCell>
                              <TableCell align="center">{funcionario.email}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Grid sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={novoBeneficioFuncionario}>Adicionar Plano</Button>
                      </Grid>
                    </Paper>

                  </Grid>
                </Grid>
              </Container>
            </div>
            : ''}

          {beneficio === 'Plano de Sa??de Pampulha Interm??dica' ?
            <div>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                      }}
                    >
                      <h4>Plano de Sa??de Pampulha Interm??dica</h4>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome completo</TableCell>
                              <TableCell align="center">CPF</TableCell>
                              <TableCell align="center">Data de Admiss??o</TableCell>
                              <TableCell align="center">Endere??o</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{funcionario.nome}</TableCell>
                              <TableCell align="center">{funcionario.cpf}</TableCell>
                              <TableCell align="center">
                                <TextField
                                  type="date"
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="dataAdmissao"
                                  name="dataAdmissao"
                                  onChange={valorInput}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="endereco"
                                  name="endereco"
                                  onChange={valorInput}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Grid sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={novoBeneficioFuncionario}>Adicionar Plano</Button>
                      </Grid>
                    </Paper>

                  </Grid>
                </Grid>
              </Container>
            </div>
            : ''}

          {beneficio === 'Plano Dental Sorriso' ?
            <div>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                      }}
                    >
                      <h4>Plano Dental Sorriso</h4>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome completo</TableCell>
                              <TableCell align="center">CPF</TableCell>
                              <TableCell align="center">Peso (Kg)</TableCell>
                              <TableCell align="center">Altura (cm)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{funcionario.nome}</TableCell>
                              <TableCell align="center">{funcionario.cpf}</TableCell>
                              <TableCell align="center">
                                <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="peso"
                                  name="peso"
                                  onChange={valorInput}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="altura"
                                  name="altura"
                                  onChange={valorInput}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Grid sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={novoBeneficioFuncionario}>Adicionar Plano</Button>
                      </Grid>
                    </Paper>

                  </Grid>
                </Grid>
              </Container>
            </div>
            : ''}

          {beneficio === 'Plano de Sa??de Mental Mente S??, Corpo S??o' ?
            <div>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                      }}
                    >
                      <h4>Plano de Sa??de Mental Mente S??, Corpo S??o</h4>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">CPF</TableCell>
                              <TableCell align="center">Horas meditadas nos ??ltimos 7 dias</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="center">{funcionario.cpf}</TableCell>
                              <TableCell align="center">
                                <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="horas"
                                  name="horas"
                                  onChange={valorInput}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Grid sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={novoBeneficioFuncionario}>Adicionar Plano</Button>
                      </Grid>
                    </Paper>

                  </Grid>
                </Grid>
              </Container>
            </div>
            : ''}

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  Benef??cios:
                  <TableContainer>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Benef??cio</StyledTableCell>
                          <StyledTableCell align="center">Op????es</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {beneficiosFuncionario.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                              {row.idBeneficio}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button variant="contained" color="error" onClick={() => deleteBeneficioFuncionario(row._id)}>Remover</Button>{' '}
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