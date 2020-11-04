import cpx from 'cpx'
import fs from 'fs'
import fsExtra from 'fs-extra'
import {getEnv} from 'dotenv-packed'

export default class BuildCopier {
    constructor() {
        this.distFolder = 'dist'
        this.distDirectory = './' + this.distFolder
        this.toDirectory = getEnv('VUE_APP_BUILD_PATH', '')
        this.shouldCopy = this.toDirectory !== this.distFolder
    }

    copy() {
        if (!this.shouldCopy) {
            console.info('No need to copy!')
            return
        }

        if (fs.existsSync(this.distDirectory)) {
            console.warn('START COPYING...')
            if (!fs.existsSync(this.toDirectory)) {
                fs.mkdirSync(this.toDirectory)
                console.info('To directory [' + this.toDirectory + '] created@')
            }
            const dirNames = fs.readdirSync('./dist')
            dirNames.forEach(dirName => {
                const from = this.distDirectory + '/' + dirName
                const to = this.toDirectory + '/' + dirName
                const lstat = fs.lstatSync(from)
                console.warn('Copying from [' + from + '] to [' + to + ']')
                if (lstat.isDirectory()) {
                    if (fs.existsSync(to)) {
                        fsExtra.removeSync(to)
                    }
                    fs.mkdirSync(to)
                    cpx.copySync(from + '/**/*.*', to)
                } else if (lstat.isFile()) {
                    fs.copyFileSync(from, to)
                }
                console.info('Copied!')
            })
            console.info('DONE!!!')
        } else {
            console.error('Dist directory [' + this.distDirectory + '] does not exist!')
        }
    }
}
