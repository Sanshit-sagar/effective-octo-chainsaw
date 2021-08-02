import { webhooksWorker } from "./webhook-worker";
import { taskWorker } from "./task-worker";
import { QueueScheduler } from "bullmq";
import config from "./config";

const taskQueueScheduler = new QueueScheduler(config.taskQueueName, {
    connection: { 
      host: 'usw1-polite-lark-31298.upstash.io', 
      password: '615f5e1534ba4882a798a270e112bd14',
      port: 31298
    }
  }
);

const webhookQueueScheduler = new QueueScheduler(config.webhooksQueueName, {
    connection: { 
      host: 'usw1-polite-lark-31298.upstash.io', 
      password: '615f5e1534ba4882a798a270e112bd14',
      port: 31298
    }
  }
);

console.log(`Started workers: ${webhooksWorker.name} and ${taskQueueScheduler.name}`);

taskWorker.on("failed", (err) =>
  console.log("Failed processing task job", err)
);

webhookQueueScheduler.on("failed", (err) =>
  console.log("Failed processing webhook job", err)
);
