import { Box, Container } from '@mui/material';

export default function Section({ 
  children, 
  backgroundColor = 'background.default',
  py = 8,
  fullWidth = false,
  maxWidth = 'xl'
}) {
  const content = fullWidth ? children : (
    <Container maxWidth={maxWidth}>
      {children}
    </Container>
  );

  return (
    <Box sx={{ py, backgroundColor }}>
      {content}
    </Box>
  );
}