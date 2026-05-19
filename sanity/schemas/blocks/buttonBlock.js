export const buttonBlock = {
  name: 'buttonBlock',
  title: 'Button List',
  type: 'object',
  fields: [
    {
      name: 'buttonList',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        },
      ],
    },
  ],
}
