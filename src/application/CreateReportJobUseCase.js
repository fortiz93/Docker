// Single Responsibility Principle (SRP): Este caso de uso solo coordina la creación de la tarea.
class CreateReportJobUseCase {
  constructor(queueService) {
    this.queueService = queueService;
  }

  async execute(reportData) {
    if (!reportData || !reportData.type) {
      throw new Error("El tipo de reporte es obligatorio");
    }

    const jobId = await this.queueService.addJob('generate-report', reportData);
    return jobId;
  }
}

module.exports = CreateReportJobUseCase;