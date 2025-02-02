import { z } from "zod";

export const creatingIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be between 1 - 255 character(s)" })
    .max(255, { message: "Title must be between 1 - 255 character(s)" }),
  description: z.string().min(10),
});
