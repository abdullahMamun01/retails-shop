const { z } = require("zod");



export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty('Password is required')
  });