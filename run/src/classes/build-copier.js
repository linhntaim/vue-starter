import cpx from 'cpx'
import fs from 'fs'
import fsExtra from 'fs-extra'
import {getEnv} from 'dotenv-packed'

export class BuildCopier {
    constructor() {
        this.distFolder = 'dist'
        this.distDirectory = './' + this.distFolder
        this.toDirectory = getEnv('VUE_APP_BUILD_PATH', '')
        this.shouldCopy = this.toDirectory !== this.distFolder
        this.standalone = getEnv('VUE_APP_BUILD_COMPOSE', '') === 'standalone'
    }

    copy() {
        if (!this.shouldCopy) {
            console.info('No need to copy!')
            return
        }

        if (fs.existsSync(this.distDirectory)) {
            console.warn('START COPYING...')
            if (!fs.existsSync(this.toDirectory)) {
                fs.mkdirSync(this.toDirectory, {recursive: true})
                console.info('To directory [' + this.toDirectory + '] created@')
            }
            const dirNames = fs.readdirSync(this.distDirectory)
            dirNames.forEach(dirName => {
                if (!this.standalone) {
                    if (dirName === 'bin' || /\.example$/.test(dirName)) {
                        return
                    }
                }
                const from = this.distDirectory + '/' + dirName
                const to = this.toDirectory + '/' + dirName
                const lstat = fs.lstatSync(from)
                console.warn('Copying from [' + from + '] to [' + to + ']')
                if (lstat.isDirectory()) {
                    if (fs.existsSync(to)) {
                        fsExtra.removeSync(to)
                    }
                    fs.mkdirSync(to, {recursive: true})
                    cpx.copySync(from + '/**/*.*', to)
                }
                else if (lstat.isFile()) {
                    fs.copyFileSync(from, to)
                }
                console.info('Copied!')
            })
            fsExtra.removeSync(this.distDirectory)
            console.info('DONE!!!')
        }
        else {
            console.error('Dist directory [' + this.distDirectory + '] does not exist!')
        }
    }
}
