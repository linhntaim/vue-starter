import {hideBin} from 'yargs/helpers'
import {parseEnv} from 'dotenv-packed'
import yargs from 'yargs'
import KeyGenerator from './classes/key-generator'

parseEnv()

const argv = yargs(hideBin(process.argv))
    .option('force', {
        alias: 'f',
        type: 'boolean',
    })
    .argv

new KeyGenerator().generate(argv.f)
