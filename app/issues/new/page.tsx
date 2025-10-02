"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";

import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Title } from "@radix-ui/themes/components/alert-dialog";
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const user = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            user.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}

        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment… " {...field} />
          )}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}

        <Button> Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
