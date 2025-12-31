# Blog Posts Structure

This folder contains all blog post pages and content.

## Structure

- `BlogPost.jsx` - Main component that displays individual blog posts
- `posts/` - Folder containing individual blog post data files
  - `post1.js` through `post8.js` - Individual blog post content
  - `index.js` - Exports all posts

## Adding a New Blog Post

1. Create a new file in `posts/` folder (e.g., `post9.js`)
2. Export a post object with the following structure:

```javascript
import blogImg9 from "../../../assets/blog/9.webp";

export const post9 = {
  id: 9,
  title: "Your Blog Post Title",
  date: "Month Day, Year",
  author: "Author Name",
  image: blogImg9,
  slug: "your-blog-post-slug",
  content: [
    {
      type: "paragraph",
      text: "Your paragraph text here"
    },
    {
      type: "heading",
      text: "Your Heading"
    },
    {
      type: "list",
      items: ["Item 1", "Item 2", "Item 3"]
    }
  ]
};
```

3. Add the post to `posts/index.js`:
```javascript
import { post9 } from "./post9.js";

export const allPosts = {
  // ... existing posts
  9: post9,
};
```

4. Add the post to the blog list in `components/Blog.jsx`

## Content Types

- `paragraph` - Regular paragraph text
- `heading` - Section heading (h2)
- `list` - Bulleted list with items array

