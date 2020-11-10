import fs from 'fs'
import {PugComposer} from './pug-composer'

export class VueComposer {
    constructor(
        htmlDir = './src/assets/compose/html',
        pugDir = './src/assets/compose/pug',
        vueDir = './src/assets/compose/vue',
        templateFilePath = './src/views/templates/.vue.template',
    ) {
        this.htmlDir = htmlDir
        this.pugDir = pugDir
        this.vueDir = vueDir
        this.templateFilePath = templateFilePath
    }

    createToDir() {
        if (!fs.existsSync(this.vueDir)) {
            fs.mkdirSync(this.vueDir, {
                recursive: true,
            })
        }
    }

    composePug() {
        new PugComposer(this.htmlDir, this.pugDir, 1).compose()
    }

    compose() {
        this.composePug()

        this.createToDir()

        if (fs.existsSync(this.pugDir)) {
            const dirNames = fs.readdirSync(this.pugDir)
            dirNames.forEach(dirName => {
                if (/\.pug$/.test(dirName)) {
                    this.composeFromOriginalFileName(dirName)
                }
            })
        }
    }

    composeFromOriginalFileName(pugFileName) {
        fs.writeFileSync(
            this.toFilePathFromOriginalFileName(pugFileName),
            this.composeContentFromOriginalFileName(pugFileName),
        )
    }

    toFilePathFromOriginalFileName(pugFileName) {
        return this.vueDir + '/' + pugFileName.replace(/\.pug$/, '.vue')
    }

    composeContentFromOriginalFileName(pugFileName) {
        if (fs.existsSync(this.templateFilePath)) {
            return ((template, templateValues) => {
                Object.keys(templateValues).forEach(k => {
                    const replaced = '%' + k + '%'
                    const replacing = templateValues[k]
                    template = template.replace(new RegExp(replaced, 'mg'), replacing)
                })
                return template
            })(
                fs.readFileSync(this.templateFilePath).toString(),
                this.composeTemplateValuesFromOriginalFileName(pugFileName),
            )
        }
        return ''
    }

    composeTemplateValuesFromOriginalFileName(pugFileName) {
        const pugFilePath = this.pugDir + '/' + pugFileName
        const pug = fs.readFileSync(pugFilePath).toString()
        return {pug: pug}
    }
}