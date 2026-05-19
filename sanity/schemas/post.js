export const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    },
    {
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: { list: ['blog', 'caseStudy', 'webinar'] },
      validation: (R) => R.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'postedBy', title: 'Posted by', type: 'string' },
    { name: 'duration', title: 'Read duration', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'blogcategory', title: 'Category', type: 'string' },
    { name: 'blogindustry', title: 'Industry', type: 'string' },
    { name: 'blogdepartment', title: 'Department', type: 'string' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'postType' },
  },
}
