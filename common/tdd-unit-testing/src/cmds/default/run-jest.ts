import * as paths from "@10stars/tdd-unit-testing/src/helpers/paths"
import { runCLI } from "@jest/core"

import type { yargsArguments } from "./index"

const { DISABLE_WATCH, COVERAGE } = process.env

type runCLIOptions = Parameters<typeof runCLI>[0]

export const runJest = async (yargs: yargsArguments) => {
  const options: runCLIOptions = {
    projects: [`${paths.projectRoot}/src/`],
    // silent: true,
    // json: true,
    // config: join(__dirname, `config.js`),
    // showConfig: true,
    verbose: true,
    testEnvironment: `node`,
    bail: false,
    watch: !DISABLE_WATCH,
    testMatch: [`**/?(*.)+(test).(ts|js)`],
    modulePaths: [`<rootDir>/src/`],

    coverage: Boolean(COVERAGE),
    // onlyChanged: DISABLE_WATCH && !COVERAGE,

    runInBand: false,
    // runInBand: true,
    detectOpenHandles: true,
    noCache: true,

    // @ts-expect-error
    ...(false && { $0: ``, _: [``] }), // to silence TS issues
  }

  try {
    await runCLI(
      options,
      options.projects as NonNullable<runCLIOptions["projects"]>,
    )

    if (process.env.DISABLE_WATCH) process.exit()
  } catch (error) {
    console.log(`==============`)
    console.log(`error`, error)
  }
}
