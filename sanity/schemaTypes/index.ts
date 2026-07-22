import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post' // Import your post schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post], // Add it here so Sanity Studio recognizes it!
}