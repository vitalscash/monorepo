# VitalsCash Monorepo

This monorepo contains the VitalsCash ecosystem including indexers, UIs, and utilities.

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
- **Main Frontend**: http://localhost:3000
- **Sacrifice UI**: http://localhost:3001
- **Vitals Indexer**: http://localhost:13072
- **Sacrifice Indexer**: http://localhost:13073

### Stop all services
```bash
docker compose down
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f sacrifice-ui
docker compose logs -f frontend
```

## Services Overview

### UI Services
- **frontend**: Main VitalsCash application UI
- **sacrifice-ui**: Standalone sacrifice address generation UI

### Indexer Services
- **vitals-indexer**: Main blockchain indexer
- **sacrifice-indexer**: Sacrifice-specific blockchain indexer

### Database Services
- **vitals-indexer-postgres**: Database for main indexer
- **sacrifice-indexer-postgres**: Database for sacrifice indexer

## Development

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Yarn

### Local Development
```bash
# Install dependencies
yarn install

# Start specific services
yarn sacrifice-ui:dev      # Run sacrifice UI locally
yarn frontend:dev          # Run main frontend locally
yarn sacrifice-indexer:dev # Run sacrifice indexer locally
yarn indexer:dev           # Run main indexer locally
```

### Building
```bash
# Build all packages
yarn build

# Build specific packages
yarn workspace sacrifice-ui run build
yarn workspace @vitals/ui run build
```

## Architecture

The monorepo is organized into packages:

- **packages/ui**: Main VitalsCash frontend application
- **packages/sacrifice-ui**: Standalone sacrifice UI with wallet integration
- **packages/indexer**: Main blockchain indexer
- **packages/sacrifice-indexer**: Sacrifice-specific blockchain indexer
- **packages/eip712-utils**: EIP-712 signature utilities
- **packages/utils**: Shared utilities and types

## Environment Variables

Key environment variables for the UIs:

- `VITE_SACRIFICE_INDEXER_URL`: URL for the sacrifice indexer API
- `PONDER_RPC_URL_8453`: Base network RPC URL
- `PONDER_RPC_URL_369`: PulseChain RPC URL

### CORS Configuration

The sacrifice-indexer service includes CORS middleware to allow cross-origin requests from the sacrifice-ui frontend. The `ALLOWED_ORIGIN` environment variable controls which domains can access the API (defaults to `http://localhost:5173` for local development).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
