import { KVNamespace, EventContext } from "@cloudflare/workers-types";
export declare const load: (fn: (...args: any[]) => Promise<any>, context: EventContext<unknown, string, unknown>) => Promise<any>;
export declare const useKv: <Key extends string>(NAMESPACE: string) => KVNamespace<Key>;
export declare const useWaitUntil: () => (promise: Promise<any>) => void;
export declare const useRequest: () => import("@cloudflare/workers-types").Request<unknown, import("@cloudflare/workers-types").CfProperties<unknown>>;
