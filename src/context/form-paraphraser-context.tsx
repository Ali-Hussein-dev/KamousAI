import { createFormContext } from "@mantine/form";

export const [ParaphraserFormProv, useParaphraserFormCtx, useForm] =
  createFormContext<Pick<Paraphraser, "configs">>();
