import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Carousel Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'reservationButtonText',
      title: 'Reservation Button Text',
      type: 'string',
      initialValue: 'Réserver une table',
    }),
    defineField({
      name: 'menuButtonText',
      title: 'Menu Button Text',
      type: 'string',
      initialValue: 'Menu',
    }),
  ],
})