"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TypeOf, z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { creatingIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title at least one character" })
    .max(225, { message: "Title can not be more than 255 chars" }),
  description: z.string().min(10, {
    message: "Description required and must be 10 characters long.",
  }),
});

type FormData = z.infer<typeof creatingIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [createError, setCreateError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(creatingIssueSchema) });

  //   On Form submit
  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setCreateError(true);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Create new Issue</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {createError && (
          <p className="text-red-400 mb-3">Something went wrong!</p>
        )}
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-zinc-400 mb-2 text-sm">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            name="title"
            id="title"
            className="focus:outline-none rounded h-11 w-96 text-black px-3"
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="mt-5">
              <label
                htmlFor="description"
                className="block text-zinc-400 text-sm mb-2"
              >
                Description
              </label>
              <SimpleMDE
                id="description"
                style={{ paddingBottom: "1px" }}
                {...field}
              ></SimpleMDE>
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>
          )}
        />

        <button className="bg-blue-500 rounded h-12 px-2 w-80 shadow shadow-white active:shadow-none mt-5">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewIssuePage;
