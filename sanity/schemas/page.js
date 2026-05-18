export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'pageType' },
      validation: (R) => R.required(),
    },
    {
      name: 'pageType',
      title: 'Page type',
      type: 'string',
      options: { list: ['insights', 'none'] },
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: 'blogBlock' },
        { type: 'caseStudiesBlock' },
        { type: 'whitePapersBlock' },
        { type: 'webinarBlock' },
        { type: 'buttonBlock' },
        { type: 'rightVideoBlock' },
        { type: 'leftVideoBlock' },
        { type: 'policyBlock' },
        { type: 'cookieBlock' },
        { type: 'pageBannerBlock' },
      ],
    },
  ],
  preview: {
    select: { title: 'pageType', subtitle: 'slug.current' },
  },
}
