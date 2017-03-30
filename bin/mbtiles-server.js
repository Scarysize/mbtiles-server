#!/usr/bin/env node
const meow = require('meow')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')
const server = require('../index')
const config = require('../config')

// Update if required
updateNotifier({pkg}).notify()

const cli = meow(`
  Usage:
    $ mbtiles-server

  Options:
    --cache           [~/mbtiles] Cache
    --protocol        [http] Protocol
    --port            [5000] Port
    --domain          [localhost] Domain
    --verbose         [false] Verbose output

  Examples:
    $ mbtiles-server --cache /Users/mac/mbtiles --port 5000 --verbose
`, {
  alias: {v: 'verbose'},
  boolean: ['verbose']
})

// Define default options
const cache = cli.flags.cache || config.CACHE
const domain = cli.flags.domain || config.DOMAIN
const port = cli.flags.port || config.PORT
const protocol = cli.flags.protocol || config.PROTOCOL
const verbose = cli.flags.verbose || config.VERBOSE

// Verbose output
const status = `
MBTiles Server

  cache:         ${cache}
  protocol:      ${protocol}
  port:          ${port}
  domain:        ${domain}
  verbose:       ${verbose}
`
if (verbose) { console.log(status) }

// Start
server.start({cache, domain, port, protocol, verbose})