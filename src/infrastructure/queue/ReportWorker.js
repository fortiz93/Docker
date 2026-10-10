const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');

function startReportWorker() {
  const worker = new Worker(
    'reports',
    async (job) => {
      console.log(`[Worker] Tarea recibida: ${job.name} (ID: ${job.id})`);
      console.log(`[Worker] Procesando datos:`, job.data);

      // Simulación de tarea pesada (bloqueante) de 4 segundos
      await new Promise((resolve) => setTimeout(resolve, 4000));

      console.log(`[Worker] Tarea completada con éxito (ID: ${job.id})`);
    },
    { connection: redisConnection }
  );

  worker.on('failed', (job, err) => {
    console.error(`[Worker ERROR] Trabajo ${job?.id} falló: ${err.message}. Reintentando...`);
  });

  console.log('[Worker] Worker de reportes iniciado y listo para procesar trabajos.');
}

module.exports = startReportWorker;