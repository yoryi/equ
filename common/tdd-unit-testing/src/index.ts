import yargs from "yargs"

import { builder, handler } from "./cmds/default/index"
// import {
//   builder as validateDbBuilder,
//   handler as validateDbHandler,
// } from "./cmds/validate-db/index"

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on(`unhandledRejection`, (err) => {
  throw err
})

console.log(`TDD`)
// Initiate yargs scripts
;(yargs as any)
  // List commands
  .command({
    command: `$0`,
    describe: `Run TDD bundler...`,
    builder,
    handler,
  })
  // .command({
  //   command: `validate-db`,
  //   describe: `Validate DynamoDB configuration`,
  //   builder: validateDbBuilder,
  //   handler: validateDbHandler,
  // })

  .command(`help`, `Show help`, (yargs) => {
    yargs.showHelp()
  })
  .recommendCommands() // If cmd is close enough => recommend the closest command

  // Help
  .alias(`h`, `help`)
  .help(`help`)

  // Simple usage
  .usage(
    `Usage: tdd-unit-testing <command> [options]\nUsage: tdd-unit-testing <command> --help`,
  )
  .epilog(`Have questions?`)
  .showHelpOnFail(false, `Specify --help for available options`)
  .fail((msg, err, yargs) => {
    if (err) throw err // preserve stack
    console.error(msg)
    process.exit(1)
  })

if (!yargs.argv._.length) yargs.showHelp() // If you dont send any commands show help
