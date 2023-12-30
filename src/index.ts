import { KVNamespace, EventContext } from "@cloudflare/workers-types";

type Context = EventContext<any, any, any>;

const LOCAL: { context?: Context | null } = {};

export const load = (
  fn: (...args: any[]) => Promise<any>,
  context: EventContext<unknown, string, unknown>
) => {
  LOCAL.context = context;
  let result: Promise<any>;
  try {
    result = fn();
  } finally {
    LOCAL.context = null;
  }
  return result;
};

export const useKv = <Key extends string>(
  NAMESPACE: string
): KVNamespace<Key> => LOCAL.context?.env[NAMESPACE];

export const useWaitUntil = () => {
  const { context } = LOCAL;
  return (promise: Promise<any>) => context?.waitUntil(promise);
};

export const useRequest = () => LOCAL.context?.request;
