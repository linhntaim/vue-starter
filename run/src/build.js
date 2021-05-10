/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {parseEnv} from 'dotenv-packed'
import {BuildCopier} from './classes/build-copier'

parseEnv()

new BuildCopier().copy()
