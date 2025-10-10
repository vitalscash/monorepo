# VitalsCash Monorepo

This monorepo contains the VitalsCash ecosystem including indexers, UIs, and utilities.

## Prerequisites

### Required Key File
To access secret files such as UI and landing packages, you need a key file from the maintainers. Place it at `./key` in the root of the repository:

## Quick Start with Docker Compose

The easiest way to run the entire stack is using Docker Compose:

### Start all services
```bash
# Build and start all services
docker compose up -d

# Or build first, then start
docker compose build
docker compose up -d
```

### Access the applications
- **Main UI**: http://localhost:21819
- **Vitals Indexer**: http://localhost:21820
- **PostgreSQL**: localhost:21821
- **Landing Page**: http://localhost:21822

### Stop all services
```bash
docker compose down
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f ui
docker compose logs -f indexer
docker compose logs -f postgres
docker compose logs -f landing
```

## Services Overview

### UI Services
- **ui**: Main VitalsCash application UI with backend/preview functionality (port 21819)
- **landing**: Landing page application (port 21822)

### Indexer Services
- **indexer**: Main blockchain indexer (port 21820)

### Database Services
- **postgres**: PostgreSQL database (port 21821)

## Development

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Yarn
- Key file at `./key` (see Prerequisites section above)

### Local Development
```bash
# Install dependencies
yarn install

# Start specific services
yarn ui:dev              # Run main UI locally
yarn landing:dev         # Run landing page locally
yarn ui:preview          # Run UI preview mode
yarn landing:preview     # Run landing page preview
yarn indexer:dev         # Run main indexer locally
```

### Building
```bash
# Build all packages
yarn build

# Build specific packages
yarn workspace ui run build
yarn workspace landing run build
yarn workspace indexer run build
```

## Architecture

The monorepo is organized into packages:

- **packages/ui**: Main VitalsCash frontend application
- **packages/landing**: Landing page application
- **packages/indexer**: Main blockchain indexer
- **packages/extension-react**: React extension utilities
- **packages/utils**: Shared utilities and types
- **packages/scripts**: Build and utility scripts

## Environment Variables

Key environment variables for the services:

- `VITE_FORWARDER_URL`: URL for the forwarder API
- `VITE_INDEXER_URL`: URL for the indexer API
- `PONDER_RPC_URL_8453`: Base network RPC URL
- `PONDER_RPC_URL_369`: PulseChain RPC URL
- `ZKP2P_API_KEY`: API key for ZKP2P service
- `INTENT_GATING_PRIVATE_KEY`: Private key for intent gating
- `DATABASE_URL`: PostgreSQL connection string

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
