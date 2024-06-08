const { z } = require("zod");



export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty('Password is required')
  });



  export const registerSchema = z.object({
    fullName: z.string().nonempty('Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm password is required')
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // The path of the error
  });