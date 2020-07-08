import path from 'path'
import fs from 'fs-extra'
import sass from 'node-sass'
import {getEnv} from 'dotenv-packed'

export default class CssCompiler {
    constructor(compiledName) {
        this.inFile = './src/assets/css/public/__' + compiledName + '.scss'
        this.inDirectory = path.dirname(this.inFile)
        this.outFile = './public/css/' + compiledName + '.min.css'
        this.outDirectory = path.dirname(this.outFile)
    }

    compile(doneCallback = null, errorCallback = null) {
        if (!fs.existsSync(this.outDirectory)) {
            fs.mkdirSync(this.outDirectory, {
                recursive: true,
            })
        }

        sass.render({
            file: this.inFile,
            importer: (url, prev) => {
                const urls = url.split('/')
                url = urls.pop()
                if (!url.endsWith('.scss')) {
                    url += '.scss'
                }
                const dir = path.dirname(prev) + (urls.length ? '/' + urls.join('/') : '') + '/'
                const tryFile1 = dir + '/' + url
                const tryFile2 = dir + '/_' + url
                const file = fs.existsSync(tryFile1) ? tryFile1 : (fs.existsSync(tryFile2) ? tryFile2 : '')
                if (file) {
                    const contents = fs.readFileSync(file)
                    const variables = [
                        '$publicStorageUrl: "' + getEnv('VUE_APP_PUBLIC_STORAGE_URL', '') + '"',
                        '$adminUrl: "' + getEnv('VUE_APP_ADMIN_URL', '') + '"',
                    ]
                    return {
                        contents: variables.join(';\n') + ';\n' + contents,
                    }
                }
                return false
            },
            includePaths: [this.inDirectory],
            outFile: this.outFile,
            outputStyle: 'compressed',
        }, (err, result) => {
            if (err) {
                console.log(err)
                errorCallback && errorCallback(err)
                return
            }

            fs.writeFile(this.outFile, result.css, err => {
                if (err) {
                    console.log(err)
                    errorCallback && errorCallback(err)
                    return
                }
                doneCallback && doneCallback(this.outFile)
            })
        })
    }
}
