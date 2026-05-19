export const cookieBlock = {
  name: 'cookieBlock',
  title: 'Cookie Policy Content',
  type: 'object',
  fields: [
    { name: 'mainheading', title: 'Heading', type: 'string' },
    { name: 'lastupdated', title: 'Last updated', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
}
