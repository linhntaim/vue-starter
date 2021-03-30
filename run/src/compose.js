import {PugComposer} from './classes/pug-composer'
import {VueComposer} from './classes/vue-composer'

const composeArg = process.argv.length >= 3 ? process.argv[2] : '--pug'
console.log('COMPOSING...')
switch (composeArg) {
    case '--pug':
        new PugComposer(...process.argv.slice(3)).compose()
        break
    case '--vue':
        new VueComposer(...process.argv.slice(3)).compose()
}
console.log('COMPOSED!!!')