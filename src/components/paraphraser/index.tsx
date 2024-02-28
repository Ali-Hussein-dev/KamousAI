import {
  ParaphraserProvider,
  useParaphraserContext,
} from "@/hooks/use-paraphraser";
import { ActionIcon, Button, Divider, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { MdEdit } from "react-icons/md";
import { useMutationParaphraser } from "@/actions/paraphraser/hooks";
import { Temperature } from "./Temperature";
import { TonesForms } from "./tones-form";
import {
  ParaphraserFormProv,
  useForm,
} from "@/context/form-paraphraser-context";

const ConfigsDrawer = () => {
  const [opened, { open, close }] = useDisclosure(true);
  const tones = useParaphraserContext((s) => s.tones);
  const temperature = useParaphraserContext((s) => s.temperature);

  const { mutate, isPending, isSuccess } = useMutationParaphraser();
  const form = useForm({
    initialValues: { configs: { temperature, tones } },
  });
  const onSubmit = (configs: Pick<Paraphraser, "configs">) => {
    mutate(
      { configs },
      {
        onError: (error) => {
          console.warn(error);
        },
        onSuccess: () => {
          form.resetDirty();
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
            <div>
              <ParaphraserFormProv form={form}>
                <form
                  onSubmit={form.onSubmit(() => {
                    onSubmit(form.values.configs);
                  })}
                  className="space-y-4"
                >
                  <TonesForms />
                  <Divider color="dark" />
                  <Temperature />
                  {form.isDirty() && (
                    <Button
                      type="submit"
                      w="100%"
                      radius="xl"
                      loading={isPending}
                    >
                      Save Changes
                    </Button>
                  )}
                  {isSuccess && !form.isDirty() && (
                    <div className="text-center font-medium text-teal-400">
                      Saved successfully
                    </div>
                  )}
                </form>
              </ParaphraserFormProv>
            </div>
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
