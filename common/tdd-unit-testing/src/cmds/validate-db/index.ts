// import { setEnv } from "@/packages/backend/tdd/cmds/_helpers/set-env"

export const builder = {}

// eslint-disable-next-line @typescript-eslint/require-await
export async function handler(yargs) {
  try {
    // await setEnv({
    //   dynamodb: true,
    //   clearPorts: [],
    // })

    process.exit()
  } catch (err) {
    if (err && err.message) console.log(err.message)
    process.exit(1)
  }
}
