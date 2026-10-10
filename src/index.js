const express = require('express');
const { createReportHandler } = require('./presentation/ReportController');
const startReportWorker = require('./infrastructure/queue/ReportWorker');

const app = express();
app.use(express.json());

// Endpoint de la Tarea 3
app.post('/api/reports', createReportHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[API] Servidor corriendo en puerto ${PORT}`);
  // Iniciar el worker en segundo plano
  startReportWorker();
});