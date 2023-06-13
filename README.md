# repro-external-sass

This repo demos an issue with importing sass files across package boundaries.

## Working variants

These variants of bundling `packages/app` succeed (note the input options logged):

- `yarn bundle-ori`: using `oribuild`'s API
- `yarn bundle-cloudpack-ori`: using `@ms-cloudpack/bundler-plugin-ori`'s API

## Non-working variant

`yarn bundle-cloudpack-full`: Calls `cloudpack bundle` and fails:

```
• /Users/me/repro-external-sass/packages/app/packages/app/src/index.module.scss:0:0: Error > /Users/me/repro-external-sass/packages/app/src/index.module.scss:2
File to import not found or unreadable: ~@repro/common-sass/dist/common.scss.
• /Users/me/repro-external-sass/packages/app/packages/app/src/index.module.scss:0:0: failed getting relative path into virtual fs: Rel: can't make @repro/common-sass/dist/common.scss relative to /Users/me/repro-external-sass
• /Users/me/repro-external-sass/packages/app/packages/app/src/index.ts:1:19: sass require /Users/me/repro-external-sass/packages/app/src/index.module.scss" -> "@repro/common-sass/dist/common.scss" resolved as an External import, but sass does not support @import at runtime
```

If you look at the input options logged in the console, this is the notable difference from the working variants, because Cloudpack is automatically marking all deps as external:

```
  "external": [
    "@repro/common-sass"
  ],
```
