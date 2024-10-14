import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events";
const KafkaConfig = new Kafka({
  clientId: "outbox-processer",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = KafkaConfig.producer();

  await producer.connect();

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((item) => ({ value: item.zapRunId })),
    });

    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((item) => item.id),
        },
      },
    });
  }
}

main();
