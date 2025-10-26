import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu Complet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du Menu',
      type: 'string',
      initialValue: 'Notre Menu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nom de la catégorie',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Sous-titre (optionnel)',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Nom de l\'icône',
              type: 'string',
              description: 'Nom d\'icône Lucide (ex: "salad", "fish", "beef", "Hamburger")',
            },
            {
              name: 'items',
              title: 'Plats',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Nom du plat',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'price',
                      title: 'Prix',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description (optionnel)',
                      type: 'text',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'price',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})