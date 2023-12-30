const LOCAL = {};
export const load = (fn, context) => {
    LOCAL.context = context;
    let result;
    try {
        result = fn();
    }
    finally {
        LOCAL.context = null;
    }
    return result;
};
export const useKv = (NAMESPACE) => LOCAL.context?.env[NAMESPACE];
export const useWaitUntil = () => {
    const { context } = LOCAL;
    return (promise) => context?.waitUntil(promise);
};
export const useRequest = () => LOCAL.context?.request;
