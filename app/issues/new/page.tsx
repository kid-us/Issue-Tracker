"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title at least one character" })
    .max(225, { message: "Title can not be more than 255 chars" }),
  //   description: z.string().min(10, {
  //     message: "Description required and must be 10 characters long.",
  //   }),
});

type FormData = z.infer<typeof schema>;

const NewIssuePage = () => {
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //   On Form submit
  const onSubmit = (data: FieldValues) => {
    if (!description || description.length < 10) {
      setDescriptionError(true);
      return;
    }

    setDescriptionError(false);

    console.log(data);
  };

  return (
    <div>
      <h1 className="text-2xl">Create new Issue</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
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
          {errors.title && (
            <p className="text-red-400 text-xs mt-2">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
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
          ></SimpleMDE>
          {descriptionError && (
            <p className="text-red-400 text-xs mt-1">
              Description required and must be 10 characters long.
            </p>
          )}
        </div>

        <button className="bg-blue-500 rounded h-12 px-2 w-80 shadow shadow-white active:shadow-none">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewIssuePage;
