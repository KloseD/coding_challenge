import Calculator from "@/components/Calculator/calculator";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h1">Tilgungsrechner</Typography>
      <br />
      <Calculator></Calculator>
    </Container>
  );
}
