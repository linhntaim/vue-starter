import {getEnv} from 'dotenv-packed'
import {Crypto} from '@linhntaim/vue-utils'
import rbjs from 'random-bytes-js'
import fs from 'fs'

export class KeyGenerator {
    constructor() {
        this.envPath = '.env'
    }

    generateCipherKey() {
        return rbjs.rand(getEnv('APP_CIPHER', 'AES-128-CBC') === 'AES-128-CBC' ? 16 : 32)
    }

    generateKey() {
        const cipherKey = this.generateCipherKey()
        console.log('Cipher key: ' + cipherKey)
        return 'base64:' + (new Crypto).encodeBase64(cipherKey)
    }

    generate(forced = false) {
        const contents = fs.readFileSync(this.envPath).toString('utf8')
        if (/^VUE_APP_KEY=[^\r\n]+/m.test(contents)) {
            if (!forced) {
                console.error('Key has existed!')
                return
            }
        }
        fs.writeFileSync(this.envPath, contents.replace(/^VUE_APP_KEY=[^\r\n]*/mg, 'VUE_APP_KEY=' + this.generateKey()))
    }
}