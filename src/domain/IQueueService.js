// Principio de Inversión de Dependencias (DIP): La aplicación depende de esta interfaz, no de BullMQ directamente.
class IQueueService {
  async addJob(jobName, data) {
    throw new Error("Método addJob no implementado");
  }
}

module.exports = IQueueService;