import {z} from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name'),
  email: z.string().trim().email('email'),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  preferredLanguage: z.enum(['sv', 'es', 'en']),
  helpWith: z.array(z.string()).min(1, 'helpWith'),
  message: z.string().trim().min(10, 'message'),
  consent: z.literal('on', {
    errorMap: () => ({message: 'consent'})
  }),
  website: z.string().max(0).optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
