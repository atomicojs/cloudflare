# @atomico/cloudflare

This bundle of tools allows using the context from Cloudflare Pages in functions created with @atomico/vite, in the mode `serverActions:{type:"cloudflare"}`.

## Example

```ts
import { useKv } from "@atomico/cloudflare";

export async function setConfig(config: { id: string; value: string }) {
  const kv = useKv("config");
  await kv.put(config.id, config.value);
  return config;
}
```
