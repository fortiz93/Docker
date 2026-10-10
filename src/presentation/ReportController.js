const BullMQAdapter = require('../infrastructure/queue/BullMQAdapter');
const CreateReportJobUseCase = require('../application/CreateReportJobUseCase');

const queueAdapter = new BullMQAdapter('reports');
const createReportJobUseCase = new CreateReportJobUseCase(queueAdapter);

async function createReportHandler(req, res) {
  try {
    const { type, userEmail } = req.body;
    
    // Delegar al caso de uso
    const jobId = await createReportJobUseCase.execute({ type, userEmail, createdAt: new Date() });

    // Respuesta inmediata HTTP 202 Accepted
    return res.status(202).json({
      status: 'Accepted',
      message: 'La solicitud de reporte fue recibida y se está procesando en segundo plano.',
      jobId: jobId,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { createReportHandler };