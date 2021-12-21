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

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const planos = [
  {
    value: '1',
    label: 'Plano de Saúde',
  },
  {
    value: '2',
    label: 'Plano Dentário',
  },
];

export default function DashboardBeneficios(prop) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [status, setStatus] = useState({
    tipo: '',
    mensagem: ''
  })

  const [beneficios, setBeneficios] = useState([]);

  const [nome, setNome] = useState('')

  const [categoria, setCategoria] = useState('1');

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  const valorInput = e => setNome({ ...nome, [e.target.name]: e.target.value })

  useEffect(() => {
    const getBeneficios = async () => {
      await api.get('/listarBeneficios').then((res) => {
        //console.log(res.data)
        setBeneficios(res.data);
      }).catch((erro) => {
        console.log(erro);
      });
    }

    getBeneficios();
  }, []);

  const novoBeneficio = async e => {
    e.preventDefault();
    var dados = {
      nome: nome.nome,
      categoria
    }
    await api.post('/novoBeneficio', dados).then((res) => {
      setStatus({
        tipo: 'sucess',
        mensagem: 'Benefício cadastrado com sucesso.'
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

  const deleteBeneficio = async (id) => {
    //console.log(id)
    await api.delete('/deletarBeneficio/' + id).then(() => {
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
              Pipo Saúde - Benefícios
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
                    <Grid item xs={4}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nome"
                        label="Nome do plano/benefício"
                        name="nome"
                        onChange={valorInput}
                      />
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: '15px' }}>
                      <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Tipo de plano"
                        fullWidth
                        value={categoria}
                        onChange={handleChange}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {planos.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} style={{ marginLeft: '15px' }}>
                      <Fab color="primary" aria-label="add" onClick={novoBeneficio}>
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
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Benefício</StyledTableCell>
                          <StyledTableCell align="center">Categoria</StyledTableCell>
                          <StyledTableCell align="center">Opções</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {beneficios.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                              {row.nome}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.categoria === '1' ? "Plano de Saúde" : "Plano Dentário"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Link to={"/editarBeneficio/" + row._id} style={{ color: 'black', textDecoration: 'none' }}>
                                <Button variant="contained" style={{backgroundColor: '#FFA500'}}>Editar</Button>{' '}
                              </Link>
                              <Button variant="contained" color="error" onClick={() => deleteBeneficio(row._id)}>Deletar</Button>{' '}
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