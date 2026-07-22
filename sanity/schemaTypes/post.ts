export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Market Update", value: "Market Update" },
          { title: "HOA & Condo Compliance", value: "HOA & Condo Compliance" },
          { title: "Financing", value: "Financing" },
          { title: "Insurance", value: "Insurance" },
          { title: "Hurricane Prep", value: "Hurricane Prep" },
          { title: "Neighborhood Guide", value: "Neighborhood Guide" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      title: "Article Body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
