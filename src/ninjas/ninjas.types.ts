import { z } from 'zod';

export const ninjaSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});
export const createNinjaDtoSchema = ninjaSchema.merge(
  ninjaSchema.omit({ id: true }),
);

export type TNinja = z.infer<typeof ninjaSchema>;
export type TCreateNinjaDto = z.infer<typeof createNinjaDtoSchema>;
