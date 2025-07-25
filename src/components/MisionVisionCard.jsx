import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { FaEye, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MisionVisionCard() {
  const [hover, setHover] = useState(false);

  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F8E9 100%)',
        border: '2px solid rgba(46, 125, 50, 0.1)',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
          py: 2,
          px: 3,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Filosofía Institucional
        </Typography>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ 
                color: 'primary.main', 
                mt: 0.5,
                p: 1,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderRadius: 2
              }}>
                <FaEye size={20} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                  Nuestra Misión
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Formar estudiantes con excelencia académica y valores humanos, preparados para enfrentar 
                  los desafíos del mundo contemporáneo...
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ 
                color: 'primary.main', 
                mt: 0.5,
                p: 1,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderRadius: 2
              }}>
                <FaLightbulb size={20} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                  Nuestra Visión
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Ser reconocidos como una institución educativa de referencia, que forma líderes 
                  comprometidos con el desarrollo sostenible...
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          component={Link}
          to="/mision-vision"
          variant={hover ? "contained" : "outlined"}
          endIcon={<FaArrowRight />}
          fullWidth
          sx={{ fontWeight: 600 }}
        >
          Ver filosofía completa
        </Button>
      </CardActions>
    </Card>
  );
}