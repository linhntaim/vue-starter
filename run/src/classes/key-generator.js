import {getEnv} from 'dotenv-packed'
import {Crypto} from '@dsquare-gbu/vue-utils'
import rbjs from 'random-bytes-js'
import fs from 'fs'

export default class KeyGenerator {
    constructor() {
        this.envPath = '.env'
    }

    generateCipherKey() {
        return rbjs.rand(getEnv('APP_CIPHER', 'AES-128-CBC') === 'AES-128-CBC' ? 16 : 32)
    }

    generateKey() {
        const cipherKey = this.generateCipherKey()
        console.log('Cipher key: ' + cipherKey)
        return 'base64:' + (new Crypto).encryptBase64(cipherKey)
    }

    generate() {
        const key = this.generateKey()
        const contents = fs.readFileSync(this.envPath).toString('utf8')
            .replace(/^VUE_APP_KEY=[^\r\n]*/mg, 'VUE_APP_KEY=' + key)
        fs.writeFileSync(this.envPath, contents)
    }
}