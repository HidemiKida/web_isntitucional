import { Box, Typography, Link, Grid } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#2E7D32", color: "#fff", py: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={700}>Unidad Educativa Fiscal "Olga Patricia Acebo Alvarez"</Typography>
          <Typography variant="body2">© {new Date().getFullYear()} Todos los derechos reservados</Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <Link href="https://facebook.com" color="inherit" mx={1}><FaFacebook /></Link>
          <Link href="https://twitter.com" color="inherit" mx={1}><FaTwitter /></Link>
          <Link href="https://instagram.com" color="inherit" mx={1}><FaInstagram /></Link>
        </Grid>
      </Grid>
    </Box>
  );
}