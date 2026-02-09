# amara-website

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Add your Mailchimp URL to the `.env` file:
   ```
   VITE_MAILCHIMP_URL=your_mailchimp_url_here
   ```

## Development

To run local server

```bash
npm run dev
```

To build the web page

```bash
npm run build
```

## Environment Variables

- `VITE_MAILCHIMP_URL`: Your Mailchimp subscription form URL (required for newsletter functionality)