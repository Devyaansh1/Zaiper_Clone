import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";
const KafkaConfig = new Kafka({
  clientId: "outbox-processer",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = KafkaConfig.consumer({ groupId: "main-worker" });
  consumer.connect();

  consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      await new Promise((item) => setTimeout(item, 1000));

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
