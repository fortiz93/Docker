const { Queue } = require('bullmq');
const IQueueService = require('../../domain/IQueueService');
const redisConnection = require('../config/redisConfig');

class BullMQAdapter extends IQueueService {
  constructor(queueName = 'reports') {
    super();
    // SRP: Esta clase solo se encarga de enviar trabajos a BullMQ
    this.queue = new Queue(queueName, { connection: redisConnection });
  }

  async addJob(jobName, data) {
    const job = await this.queue.add(jobName, data, {
      attempts: 3, // Reintentos automáticos
      backoff: {
        type: 'exponential',
        delay: 2000, // Espera 2s, luego 4s, etc.
      },
    });
    return job.id;
  }
}

module.exports = BullMQAdapter;