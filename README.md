<h1 align="center">Vite Fullstack Starter</h1>

<h4 align="center">All in one Express backend and Vue frontend, using TypeScript, Vite, and Vue 3.</h4>

<h4 align="center">An incredibly easy way to get up and running with APIs.</h4>

- 🔪 Cutting Edge: All ESM, all the time
- 🛟 Safety: TypeScript used for everything, which gives code completion everywhere
- 🔥 Blazingly Fast: Vite used as build tool at every step of the process
- ⏰ Ready to Go: Preconfigured global SCSS, dotenv, Prettier, ESLint, and Git
- 🛠 Developer Friendly: HMR at the frontend and backend
- 🧑‍💻 Unified Codebase: `lib/` for things (like type defintions) that the frontend and backend need to
  use
- 😊 Multi-Page Support: Prconfigured Vue Router

### Use Cases

- Communicating with APIs that require authentication
- Making anything else in Vue. Even if you never touch the backend, you'll have all the other features listed above.

## Clone

```sh
git clone https://github.com/cjcarrick/vite-fullstack-starter
```

## Develop

```sh
npm run dev
```

## Deploy

```sh
npm run build
```

```sh
npm run start
```

## More information

If you're using VSCode, consider using [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). If you're using Vim, try [`CoC`](https://github.com/neoclide/coc.nvim) with [`yaegassy/coc-volar`](https://github.com/yaegassy/coc-volar) or [configuring the native LSP yourself](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md). If you're using IntelliJ, consider using vscode like a normal person.

### Folder structure

```
project root
|- backend/   # Our backend server that communicates with APIs
|- src/       # Our frontend Vue app, which communicates with that server
|- lib/       # Shared libraries for backend and frontend
|- build/     # Generated frontend code
|- server/    # Generated backend code
```

### [`vite-plugin-mix`](https://github.com/egoist/vite-plugin-mix) does most of the heavy lifting.

This allows for building a backend API at the same time as building the
frontend, having HMR on both of them, and building it all very fast.

### Disclaimer

This repo is mostly just for me, because I found myself writing a lot of the same boilerplate a lot of the time. It includes things that I personally find good. It's probably not perfect, and if you find a problem, let me know in the issues tab.

Additionaly, feel free to fork this and modify it however you want.
