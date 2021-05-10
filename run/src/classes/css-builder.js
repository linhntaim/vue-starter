import CssSticker from './css-sticker'
import CssCompiler from './css-compiler'

export class CssBuilder {
    constructor() {
    }

    build(compiledNames = [], stickFiles = []) {
        const sticker = new CssSticker().add(...stickFiles)
        let compiled = 0
        compiledNames.forEach(compiledName => {
            new CssCompiler(compiledName).compile(outFile => {
                ++compiled
                sticker.add(outFile)
                if (compiled === compiledNames.length) {
                    sticker.stick()
                }
            })
        })
    }
}
