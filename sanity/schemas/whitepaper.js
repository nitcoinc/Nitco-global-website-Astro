export const whitepaper = {
  name: 'whitepaper',
  title: 'Whitepaper',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'pdfFileUrl', title: 'PDF URL', type: 'url' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: {
    select: { title: 'title' },
  },
}
