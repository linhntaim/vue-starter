import minify from '@node-minify/core'
import cssnano from '@node-minify/cssnano'

export class CssSticker {
    constructor() {
        this.files = []
        this.stickFile = './public/css/style.min.css'
    }

    add(...files) {
        this.files.push(...files)
        return this
    }

    stick() {
        minify({
            compressor: cssnano,
            input: this.files,
            output: this.stickFile,
        }).then(() => {
            console.info('Css was stick successfully')
        })
    }
}
