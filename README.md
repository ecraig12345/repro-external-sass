# repro-external-sass

This repro demos some issues we hit with oribuild. Primarily, importing sass files across package boundaries.

To repro:

```
yarn
cd packages/apps
yarn bundle
```

### Resulted

```
Errors:
=============================================
Error 1: Error > D:/git/repro-external-sass/packages/app/src/index.module.scss:2
File to import not found or unreadable: ~@repro/common-sass/dist/common.scss. at src/index.module.scss:0:0

Error 2: failed reading file: stat ../common-sass/dist/common.scss: invalid argument at src/index.module.scss:0:0
```

### Expected

1 output file, no errors

### Notes

The `scripts\tasks\bundle.js` file controls the oribuild bundling options. Notice the `absWorkingDir` is in the context of the app. However, the `@repro/foo` import resolves correctly even though it's outside this root dir. So, why does `@repro/foo` resolve, but not `@repro/common-sass`?

