### Data fetched from here
https://app.supabase.com/project/ugfrwweooyvcxovfxmmy/editor/17584

### Using different image providers
When using images from a third party host, remember to update the <code>tailwind.config.js</code> to include the selected urls.

#### Example
<code>
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
}
</code>
