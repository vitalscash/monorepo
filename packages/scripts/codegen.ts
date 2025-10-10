import { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
  schema: process.env.VITE_INDEXER_URL,
  // documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: true,
        useTypeImports: true,
        fragmentMasking: false
      },
    },
  },
}

export default config
