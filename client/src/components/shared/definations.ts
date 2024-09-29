import { InferType } from "yup";
import { userSchema } from "./schema";

export type User = InferType<typeof userSchema>;
