import { Affix, Button, Modal, Transition, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTextPlus } from "@tabler/icons-react";
import styles from "./chat.module.css";
const ChatBot = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Modal opened={opened} onClose={close}>
        <iframe
          className={styles.chat}
          title="chatbot"
          allow="microphone;"
          width="100%"
          height="450"
          src="https://console.dialogflow.com/api-client/demo/embedded/531eba35-ebc3-4dab-92c7-dcd6b7b69758"
        ></iframe>
      </Modal>
      <Affix position={{ bottom: rem(70), right: rem(20) }}>
        <Button
          radius="xl"
          leftIcon={<IconTextPlus size="1rem" />}
          onClick={open}
        >
          Спросить у бота
        </Button>
      </Affix>
    </div>
  );
};

export default ChatBot;
