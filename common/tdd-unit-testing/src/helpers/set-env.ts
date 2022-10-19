// import { checkLocalPorts } from "@/packages/backend/_helpers/check-local-ports"
// import { setLocalDynamodb } from "@/packages/backend/_helpers/dynamodb/index"

// const defaultDynamoDbPort = 8000

// export const setEnv = async (yargs) => {
//   const { dynamodb, clearPorts } = yargs

//   let ports = []

//   if (dynamodb) ports.push(defaultDynamoDbPort)

//   if (clearPorts.length) ports = [...ports, ...clearPorts]

//   if (dynamodb || clearPorts.length) {
//     console.log(`====================================`)
//     console.log(`Clearing ports: `, ports)
//     console.log(`====================================`)
//     await checkLocalPorts(ports)
//   }
//   // console.log("====================================")
//   // console.log("dynamodb before")
//   // console.log("====================================")

//   if (dynamodb) await setLocalDynamodb()
// }
