export const statAction = {
  deposit: 'deposit',
  withdrawal: 'withdrawal',
  exchange: 'exchange',
} as const
export type StatAction = (typeof statAction)[keyof typeof statAction]

export const isStatAction = (action: string): action is StatAction => {
  return action in statAction
}
