# notes

This is a Vue 3 demo application meant to learn secure coding. Make sure to NOT
use this anytime in production, as this site contains deliberate security
vulnerabilities.

## How to use

Clone the repository to a directory. In that directory, run

```bash
npm install
```

### API endpoint

The repository contains a (very insecure) 'mock' API endpoint. To run the API
server, ensure that the variables in `.env.development.local` are suitable for
your environment (`API_HOST` and `API_PORT` on which IP address and port the API
server will listen). Then, run

```bash
./start-api-server.sh &
```

This will start the API server in the background. When encountering login
errors, please ensure that the (development or production) web server can access
the API endpoint.

To check that, go to the path `/db` of the (development / production) web
server: This should output a JSON file containing the data store. If not, then
double-check whether the API server is running and listening on the specified
host and port.

## Start local development web server

The port number for the local development server is configured in
`.env.development.local` as `WEB_PORT`.

```bash
npm run dev
```

### Docker image

To build a Docker image which will host nginx and the application, run

```sh
npm run image
```

This executes the build script, which reads the `.env.production.local`
variables and uses them to configure the API "proxy" in nginx.

### Run Docker container

The container will listen on the ports specified in `package.json`.

```sh
npm run test
```

## About

This project is scaffolded using:

```bash
npm create vue@latest notes
cd notes
npm install
npm run dev
```
