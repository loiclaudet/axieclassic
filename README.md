# Axie Classic Leaderboard & Stats

A modern, mobile-friendly, web application for tracking Axie Infinity Classic arena leaderboards, player statistics, guild rankings, and battle histories.


<img width="1329" alt="image" src="https://github.com/user-attachments/assets/70d9392d-cd1b-4ef8-b766-1518cc6f3021" />

<img width="1015" alt="image" src="https://github.com/user-attachments/assets/97e18814-ffaa-4116-a829-abd7a96ed2cd" />

<img width="1236" alt="image" src="https://github.com/user-attachments/assets/16a21e63-8d09-4142-a907-9ffb8356fc31" />


## Features

- **Arena Leaderboard**: Real-time ranking of top players with detailed stats
- **Player Profiles**: Individual player statistics, battle histories, and performance metrics
- **Guild Rankings**: Track guild performance and member statistics
- **Battle History**: Detailed battle records with opponent information
- **Find Similar Axies**: Search and compare axie builds and stats
- **Season Championship**: Track qualification status for top 16 players
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Data refreshes every 3 minutes

## Tech Stack

This project is built with the [T3 Stack](https://create.t3.gg/):

- [Next.js 14](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Lucide React](https://lucide.dev/) - Icons
- [PostHog](https://posthog.com/) - Analytics
- [Ronin Name Service](https://roninbuilders.com/) - ENS for Ronin addresses

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (version 9 or higher)

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:loiclaudet/axieclassic.git
cd axieclassic
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# API Keys for Axie Classic API
X_API_KEY_1=your_api_key_1
X_API_KEY_2=your_api_key_2
X_API_KEY_3=your_api_key_3
X_API_KEY_4=your_api_key_4

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Note**:
In order to deal with the rate limits, you'll need to obtain several API keys from the Axie Classic API, by creating an account on the [Ronin Chain Developer Console](https://developers.roninchain.com/console/applications/).
The trick is to create 4 applications, and then you can use the API keys from each application.

You'll also need to create a PostHog account, and get the API key from the PostHog dashboard.

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── guilds/            # Guild-related pages
│   ├── profile/           # Player profile pages
│   └── find-similar/      # Axie comparison pages
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── data/                 # Data fetching functions
├── lib/                  # Utilities and configurations
├── hook/                 # Custom React hooks
└── styles/               # Global styles
```

## Key Features Implementation

### Arena Leaderboard

- Fetches top 50 players from the Axie Classic API
- Displays rank, player info, stats, and current season data
- Highlights season championship qualifiers (top 16)

### Player Profiles

- Individual player statistics and battle history
- Recent battles with opponent details
- Performance metrics and rankings

### Guild System

- Guild rankings and member statistics
- Guild rewards and season information
- Member battle histories

### API Integration

- Rate-limited API queue system
- Multiple API key rotation
- Error handling and retry logic
- Real-time data updates

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement proper error handling

### API Usage

- Respect rate limits (5 requests per second)
- Use the API queue system for requests
- Implement proper error handling and retries
- Cache data appropriately

### Adding New Features

1. Create components in the appropriate directory
2. Add data fetching functions in `src/data/`
3. Update navigation if needed
4. Add proper TypeScript types
5. Test on both desktop and mobile

## Deployment

The application can be deployed to various platforms:

- **Vercel** (recommended): Connect your GitHub repository
- **Netlify**: Build command: `pnpm build`, Publish directory: `.next`
- **Docker**: Use the provided Dockerfile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or support:

Join the Axie Infinity Discord, and ask for help in the #tools-api-etc channel.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
