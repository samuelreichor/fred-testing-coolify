# Headless Project Template

## Setup

First run the base setup with:

```bash
./craft-scripts/setup.sh
```

Then you can import a database or use `ddev craft setup` to start fresh. 

## Scripts

- `ddev composer run generate-types`: generates ts files for your frontend.
- `ddev fe <command>`: cd's in the frontend folder and runs the provided command.
- `ddev npm run <command>` runs the commands in the frontend folder due to npm workspaces.

**Note:** This template uses npm workspaces, which is why there are two package.json files.
This setup allows you to run npm commands at the root level while managing multiple packages
within the workspace efficiently. (`ddev npm run dev` does the same as `ddev fe npm run dev`)

## Bruno

We use [Bruno](https://docs.usebruno.com/) to test queries.  
All common queries are stored in `./brunoCollection`.

### Setup
1. Open Bruno → **Open Collection** → select `./brunoCollection`.
2. Create an `.env` file inside `./brunoCollection` and set all variables defined in `.env.example`.

## Further Reading:

- [Craft Guidelines](https://fredmansky.atlassian.net/wiki/external/ZjQ5Y2I2M2M5Mjg4NDYxZmEzOGYyZWQ2YjM4YTNhZjA): Learn how to structure craft.
- [Craft Query API](https://samuelreichor.at/libraries/craft-query-api): The Craft CMS Plugin that powers this great stuff.
- [Nuxt SDK](https://samuelreichor.at/libraries/nuxt-craftcms): The package used to get the query builder in Nuxt.
- [JS SDK](https://samuelreichor.at/libraries/js-craftcms-api): `@query-api/nuxt` is built on the `@query-api/js`.
