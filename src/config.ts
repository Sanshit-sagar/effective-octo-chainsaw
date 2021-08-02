export default {
  taskQueueName: process.env.TASK_QUEUE_NAME || "tasks",
  webhooksQueueName: process.env.WEBHOOK_QUEUE_NAME || "webhooks",
  mailQueueName: process.env.QUEUE_NAME || "mailbot",

  maxAttempts: 10,
  maxAttemptsForEmail: 5,

  backoffDelay: 2000,

  concurrency: parseInt(process.env.QUEUE_CONCURRENCY || "1"),
  connection: { 
    host: 'usw1-polite-lark-31298.upstash.io', 
    password: '615f5e1534ba4882a798a270e112bd14',
    port: 31298
  },

  port: 9000,
  userPort: 8080,
};
