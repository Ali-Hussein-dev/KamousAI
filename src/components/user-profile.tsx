"use client";
import { ActionIcon, Button } from "@mantine/core";
import * as React from "react";
import { CustomSelect } from "./Mantine/custom-select";
import { MdDelete } from "react-icons/md";
import { CustomInput } from "./shared/custom-input";
import { Fieldset } from "./Mantine/CustomFieldset";
import { useForm } from "@mantine/form";
import { updateUserProfile } from "@/actions/update-user-profile";
import languages from "@/content/languages.json";
import { useFormStatus } from "react-dom";

type UserProfileForm = Omit<UserProfile, "email" | "id">;
const levels = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];
const Pairs = ({
  i,
  form,
}: {
  i: number;
  form: ReturnType<typeof useForm<UserProfileForm>>;
}) => {
  return (
    <div
      className="w-full flex-wrap gap-3 flex-row-between sm:flex-nowrap"
      key={i}
    >
      <CustomSelect
        name={"lang-" + i}
        {...form.getInputProps(`languages.${i}.lang`, {})}
        className="w-full"
        placeholder="Pick a language"
        data={languages}
      />
      <CustomSelect
        name={"level-" + i}
        {...form.getInputProps(`languages.${i}.level`)}
        className="w-full"
        placeholder="Select your proficiency level"
        data={levels}
      />
      <ActionIcon
        size="lg"
        radius="md"
        variant="light"
        c="yellow"
        onClick={() => {
          form.removeListItem("languages", i);
        }}
      >
        <MdDelete />
      </ActionIcon>
    </div>
  );
};
type Props = {
  profile: UserProfile;
};
const SubmitBtn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} type="submit" {...props}>
      Save
    </Button>
  );
};
//======================================
export const UserProfile = ({ profile }: Props) => {
  const form = useForm<UserProfileForm>({
    initialValues: {
      name: profile.name,
      languages: profile.languages,
    },
  });
  return (
    <form
      action={updateUserProfile}
      className="mx-auto h-full max-w-3xl space-y-6 rounded-lg bg-slate-800 p-4 pt-10 shadow-lg md:pt-8"
    >
      <Fieldset legend="Personal Info" className="space-y-3">
        <div className="flex-wrap gap-2 flex-row-between sm:flex-nowrap">
          <CustomInput
            placeholder="name"
            defaultValue={profile.name}
            className="w-full"
            classNames={{ input: "bg-slate-700" }}
            name="name"
            {...form.getInputProps("name")}
          />
        </div>
      </Fieldset>
      <Fieldset legend="What languages do you speak?" className="space-y-3">
        <div className="space-y-2">
          {form.values.languages.map((v, i) => (
            <Pairs key={i} i={i} form={form} />
          ))}
        </div>
        <Button
          variant="light"
          onClick={() => {
            form.insertListItem("languages", form.values.languages);
          }}
        >
          Add Language
        </Button>
      </Fieldset>
      <div className="pt-3 flex-row-end">
        <SubmitBtn disabled={!form.isDirty()} />
      </div>
    </form>
  );
};
export default UserProfile;