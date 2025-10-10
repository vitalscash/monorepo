import { ponder } from "ponder:registry";
import * as schema from "ponder:schema";
import { ids } from "@vitals/utils/ids";
import { orderId, upsertBlock, upsertTransaction } from "./utils";

ponder.on('Verifiers:ProviderHashAdded', async ({ event, context }) => {
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context, event.log.address),
    context.db.insert(schema.verifier).values({
      verifierId: ids.verifier({ chainId: context.chain.id, address: event.log.address }),
      address: event.log.address,
      chainId: BigInt(context.chain.id),
    }).onConflictDoNothing(),
    context.db.insert(schema.providerHash).values({
      providerHashId: ids.providerHash({ chainId: context.chain.id, hash: event.log.data }),
      providerHash: event.log.data,
      active: true,
    }).onConflictDoUpdate(() => ({
      active: true,
    })),
    context.db.insert(schema.providerHashAdded).values({
      orderId: orderId.block({ event, context }),
      transactionId: orderId.transaction({ event, context }),
      verifierId: ids.verifier({ chainId: context.chain.id, address: event.log.address }),
      providerHashId: ids.providerHash({ chainId: context.chain.id, hash: event.log.data }),
    }),
  ])
})

ponder.on('Verifiers:ProviderHashRemoved', async ({ event, context }) => {
  const providerHashId = ids.providerHash({
    chainId: context.chain.id,
    hash: event.log.data,
  })
  await Promise.all([
    upsertBlock(event, context),
    upsertTransaction(event, context),
    context.db.insert(schema.providerHashRemoved).values({
      orderId: orderId.block({ event, context }),
      transactionId: orderId.transaction({ event, context }),
      verifierId: ids.verifier({ chainId: context.chain.id, address: event.log.address }),
      providerHashId,
    }),
    context.db.update(schema.providerHash, {
      providerHashId,
    }).set({
      active: false,
    })
  ])
})
