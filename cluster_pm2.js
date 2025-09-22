const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`Hello from process ${process.pid}`);
});

app.get('/compute', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) sum += i;
  res.send(`Sum: ${sum} from process ${process.pid}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with PID ${process.pid}`);
});
