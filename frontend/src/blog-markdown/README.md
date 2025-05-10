# Blog Markdown Features

This document outlines special features available when writing blog posts for the Your Service X website.

## CTA Buttons

Call-to-Action (CTA) buttons can be added to blog posts to guide readers toward important actions.

### Syntax

To add a CTA button, use the following syntax in your markdown:

```
:::cta{text="Button Text" url="/destination-url" variant="primary"}
```

### Parameters

- `text` (required): The text to display on the button
- `url` (required): The URL to navigate to when clicked
  - Internal links should start with `/` (e.g., `/signup`)
  - External links should include the protocol (e.g., `https://example.com`)
- `variant` (optional): The button style, defaults to "primary"
  - Available variants: `primary`, `secondary`, `accent`

### Button Variants

- `primary` (default): Blue background with white text
- `secondary`: White background with blue border and blue text
- `accent`: Red background with white text

### Usage Examples

Primary button (default):

```
:::cta{text="Get Started Now" url="/signup" variant="primary"}
```

Secondary button:

```
:::cta{text="Learn More" url="/features" variant="secondary"}
```

Accent button:

```
:::cta{text="Limited Time Offer" url="/special-offer" variant="accent"}
```

### Best Practices

- Place CTAs after providing value to readers
- Use clear, action-oriented button text
- Limit to 1-3 CTAs per blog post
- Place strategically at natural break points or at the end of sections

## Example Blog Post

See `posts/cta-button-example.md` for a comprehensive example of how to use CTA buttons in your blog posts.
