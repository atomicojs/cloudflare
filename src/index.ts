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

export const useContext = () => LOCAL.context;

export const useKv = <Key extends string>(
  NAMESPACE: string
): KVNamespace<Key> => useContext()?.env[NAMESPACE];

export const useWaitUntil = () => {
  const context = useContext();
  return (promise: Promise<any>) => context?.waitUntil(promise);
};

export const useRequest = () => useContext().request;

export const useEnv = () => useContext().env;

export const useMiddleware = () => useContext().next;
