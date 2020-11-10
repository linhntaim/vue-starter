import fs from 'fs'
import html2pug from 'html2pug'

export class PugComposer {
    constructor(htmlDir = './src/assets/compose/html', pugDir = './src/assets/compose/pug', padding = 0) {
        this.fromHtmlDir = htmlDir
        this.toPugDir = pugDir
        this.padding = parseInt(padding.toString()) | 0
    }

    createToDir() {
        if (!fs.existsSync(this.toPugDir)) {
            fs.mkdirSync(this.toPugDir, {
                recursive: true,
            })
        }
    }

    compose() {
        this.createToDir()

        if (fs.existsSync(this.fromHtmlDir)) {
            const dirNames = fs.readdirSync(this.fromHtmlDir)
            dirNames.forEach(dirName => {
                if (/\.html$/.test(dirName)) {
                    this.composeFromOriginalFileName(dirName)
                }
            })
        }
    }

    composeFromOriginalFileName(htmlFileName) {
        fs.writeFileSync(
            this.toFilePathFromOriginalFileName(htmlFileName),
            this.composeContentFromOriginalFileName(htmlFileName),
        )
    }

    toFilePathFromOriginalFileName(htmlFileName) {
        return this.toPugDir + '/' + htmlFileName.replace(/\.html$/, '.pug')
    }

    composeContentFromOriginalFileName(htmlFileName) {
        return this.afterComposeContent(
            this.composeContent(
                this.beforeComposeContent(
                    fs.readFileSync(this.fromHtmlDir + '/' + htmlFileName).toString(),
                ),
            ),
        )
    }

    composeContent(content) {
        return content ? (lines => { // break into lines
            return lines
                .map((line, index) => {
                    if (index > 0 && line.charAt(0) !== ' ') {
                        return ''
                    }
                    if (line.trim() === '|') {
                        line += (line.charAt(line.length - 1) !== ' ' ? ' ' : '') + lines[index + 1]
                    }
                    return '    '.repeat(this.padding) + line.replace(/^(\s+)/, '$1$1')
                })
                .filter(line => {
                    return !!line.trim()
                })
                .join('\n')
        })(html2pug(content, {
            commas: false,
            doubleQuotes: true,
            fragment: true,
        }).split(/\r*\n/)) : ''
    }

    beforeComposeContent(content) {
        return content
    }

    afterComposeContent(content) {
        return content
    }
}