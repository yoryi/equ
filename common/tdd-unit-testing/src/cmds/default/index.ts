// import { setEnv } from "@/packages/backend/tdd/cmds/_helpers/set-env"

import { runJest } from "./run-jest"

export const builder = {
  dynamodb: {
    type: `boolean`,
    default: false,
    describe: `Set up local dynamodb instance`,
  },
  clearPorts: {
    type: `array`,
    default: [],
    describe: `Remove processes from the specified Ports Number[]`,
  },
} as const
type builder = typeof builder
type cmds = keyof builder
type getType<key extends cmds> = builder[key]["type"] extends "string"
  ? string
  : builder[key]["type"] extends "boolean"
  ? boolean
  : builder[key]["type"] extends "number"
  ? number
  : unknown
export type yargsArguments = {
  [key in cmds]: getType<key>
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function handler(yargs: yargsArguments) {
  try {
    /**
     * @todo after cleaning up DynamoDB setup, uncomment line below
     */
    // if (yargs.dynamodb) await setEnv(yargs)

    // console.log("====================================")
    // console.log("After setEnv")
    // console.log("====================================")
    void runJest(yargs)
  } catch (err) {
    if (err && err.message) console.log(err.message)
    process.exit(1)
  }
}
