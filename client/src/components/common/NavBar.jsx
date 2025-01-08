// components/common/NavBar.jsx
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          FREEBET APP
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/bets">Apuestas</Button>
        <Button color="inherit" component={Link} to="/transactions">Transacciones</Button>
        <Button color="inherit" component={Link} to="/bookmakers">Casas de apuestas</Button>
        <Button color="inherit" component={Link} to="/casinos">Casino</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;