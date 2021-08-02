import { Worker, Queue } from "bullmq";
import config from "./config";

const webhooksQueue = new Queue('webhooksQueue', { 
    connection: { 
      host: 'usw1-polite-lark-31298.upstash.io', 
      password: '615f5e1534ba4882a798a270e112bd14',
      port: 31298
    }
  }
);


export const taskWorker = new Worker<{ userId: string; task: any }>(
  config.taskQueueName,
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    const result = `Result data from task performed for ${job.name} with ID ${job.id}`;

    return webhooksQueue.add(
      job.name,
      { userId: job.data.userId, result },
      {
        attempts: config.maxAttempts,
        backoff: { 
          type: "exponential", 
          delay: config.backoffDelay 
        },
      }
    );
  },
  { connection: config.connection }
);


