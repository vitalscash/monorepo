get indexer in order - events and objects should be inserted and mutated according to their utility
  - add an order id to the mix in order to sort the events appropriately
create frontend to interact with contracts
  - create readonly tables to query data
    - on a single deposit level
    - on all deposits level (active+usd by default)
    - on an aggregate events level whole system + user oriented
  - modify existing deposits
    - change exchange rate
    - create new deposits
    - withdraw deposit
    - manual release intents

update chakra to use v3
move api key usage to backend

  - signal an intent
  - cancel an intent
  - fulfill an intent
add pulsechain as a final destination through relay.link
  - completes bank account -> base -> ethereum -> pulsechain pathway
fork system to pulsechain
  fork peer auth extension (use api key)
  fork trusted execution env
sacrifice

