import {
  ParaphraserProvider,
  useParaphraserContext,
} from "@/hooks/use-paraphraser";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { MdEdit } from "react-icons/md";
import { Temperature } from "./Temperature";
import { useMutationParaphraser } from "@/actions/paraphraser/hooks";
import { Tones } from "./Tones";

const ConfigsDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const tones = useParaphraserContext((s) => s.tones);
  const temperature = useParaphraserContext((s) => s.temperature);
  const { mutate } = useMutationParaphraser();
  const onSubmit = () => {
    mutate(
      { configs: { temperature, tones } },
      {
        onError: (error) => {
          console.warn(error);
        },
      }
    );
  };

  return (
    <>
      <Drawer.Root position="right" size="sm" opened={opened} onClose={close}>
        <Drawer.Overlay
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        />
        <Drawer.Content
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Drawer.Header>
            Paraphraser Configurations
            <Drawer.CloseButton onClick={close} />
          </Drawer.Header>
          <Drawer.Body py="md">
            <div className="pb-6">
              <Temperature />
              <Tones />
              {/* <Tones /> */}
            </div>
            <Button type="submit" w="100%" onClick={onSubmit}>
              Save
            </Button>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <ActionIcon
        onClick={(e) => {
          open();
          e.stopPropagation();
        }}
        radius="lg"
        size="lg"
      >
        <MdEdit />
      </ActionIcon>
    </>
  );
};

export const ParaphraserConfigs = () => {
  return (
    <ParaphraserProvider>
      <ConfigsDrawer />
    </ParaphraserProvider>
  );
};

export const DynamicParaphraserConfigs = dynamic(
  () => import("@/components/paraphraser").then((c) => c.ParaphraserConfigs),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-8 animate-pulse rounded-full bg-slate-600/50"></div>
    ),
  }
);
