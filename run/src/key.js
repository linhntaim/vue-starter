import {parseEnv} from 'dotenv-packed'
import KeyGenerator from './classes/key-generator'

parseEnv()

new KeyGenerator().generate()
