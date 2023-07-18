# Progress tracker

Completion progress tracker for various things like, tv shows, movies and anime

## Developing

Once you've cloned the repository, install dependencies:

```bash
pnpm install
```

Setup the database:

```bash
pnpx prisma migrate dev
```

Seed the database

```bash
pnpx prisma db seed
```

start a development server:

```bash
pnpm dev
```

Navigate to [localhost:5173](http://localhost:5173). You should see your app running.

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
