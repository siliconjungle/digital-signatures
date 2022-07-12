import crypto from 'crypto'

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
})

const signMessage = (privateKey, message) => {
  const data = Buffer.from(JSON.stringify(message))
  return crypto.sign('sha256', data, privateKey)
}

const verifyMessage = (publicKey, message, signature) => {
  const data = Buffer.from(JSON.stringify(message))
  return crypto.verify('sha256', data, publicKey, signature)
}

const message = { type: 'patch', operations: [['key', 0, 'Hi!']] }
const signature = signMessage(privateKey, message)
console.log(verifyMessage(publicKey, message, signature))
