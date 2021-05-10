<template lang="pug">
    #imageModal.modal.fade(tabindex="-1" role="dialog" data-backdrop="static")
        .modal-dialog.modal-md.modal-lg.modal-xl(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body
                    .row
                        .col-md-6
                            label
                                strong {{ $t('components.image.original_image') }} 
                            .img-container.img-container-item
                                img(:class="{hide: !imageUrl}" :src="imageUrl", alt="Picture")
                            .img-upload-container.img-container-item
                                label.btn.btn-info.btn-upload.btn-block
                                    input#inputImageFile.sr-only(type="file" name="file" :accept="acceptedExtensions" @change="onImageFileChanged")
                                    span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.upload_image')")
                                        span.fa.fa-upload
                            upload-description.mb-3(:extensions="extensions" :sizeHidden="true")
                            .img-actions.img-container-item.text-center
                                .btn-group
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="zoom" data-option="0.1" title="Zoom In")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.zoom_in')")
                                            span.fa.fa-search-plus
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="zoom" data-option="-0.1" title="Zoom Out")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.zoom_out')")
                                            span.fa.fa-search-minus
                                .btn-group
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="move" data-option="-10" data-second-option="0" title="Move Left")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.move_left')")
                                            span.fa.fa-arrow-left
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="move" data-option="10" data-second-option="0" title="Move Right")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.move_right')")
                                            span.fa.fa-arrow-right
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="move" data-option="0" data-second-option="-10" title="Move Up")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.move_up')")
                                            span.fa.fa-arrow-up
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="move" data-option="0" data-second-option="10" title="Move Down")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.move_down')")
                                            span.fa.fa-arrow-down
                                .btn-group(v-if="rotateEnabled")
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="rotate" data-option="-45" title="Rotate Left")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.rotate_left')")
                                            span.fa.fa-undo-alt
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="rotate" data-option="45" title="Rotate Right")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.rotate_right')")
                                            span.fa.fa-redo-alt
                                .btn-group
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="flipH" title="Flip Horizontal")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.flip_horizontal')")
                                            span.fa.fa-arrows-alt-h
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="flipV" title="Flip Vertical")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.flip_vertical')")
                                            span.fa.fa-arrows-alt-v
                                .btn-group(v-if="scaleEnabled")
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="scaleX+" title="Scale X (+)")
                                        span.img-tooltip(data-toggle="tooltip" title="Scale X (+)")
                                            span.fa.fa-angle-double-right
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="scaleX-" title="Scale X (-)")
                                        span.img-tooltip(data-toggle="tooltip" title="Scale X (-)")
                                            span.fa.fa-angle-double-left
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="scaleY+" title="Scale Y (+)")
                                        span.img-tooltip(data-toggle="tooltip" title="Scale Y (+)")
                                            span.fa.fa-angle-double-up
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="scaleY-" title="Scale Y (-)")
                                        span.img-tooltip(data-toggle="tooltip" title="Scale Y (-)")
                                            span.fa.fa-angle-double-down
                                .btn-group(v-if="setEnabled")
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="disable" title="Disable")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.lock')")
                                            span.fa.fa-lock
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="enable" title="Enable")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.unlock')")
                                            span.fa.fa-unlock
                                .btn-group(v-if="setEnabled")
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="clear" title="Clear")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.clear')")
                                            span.fa.fa-times
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="crop" title="Crop")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.crop')")
                                            span.fa.fa-check
                                .btn-group
                                    button.btn.btn-primary(@click="onActionClicked" type="button" data-method="reset" title="Reset")
                                        span.img-tooltip(data-toggle="tooltip" :title="$t('components.image.reset')")
                                            span.fa.fa-sync-alt
                        .col-md-6
                            label
                                strong {{ $t('components.image.cropped_image') }}
                            .img-preview-container.img-container-item(:class="{hide: !imageUrl}")
                                .img-preview
                    .image-data.row(v-if="informationEnabled")
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataX") X
                            input#dataX.form-control(type="text" placeholder="x" readonly)
                            span.input-group-append
                                span.input-group-text px
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataY") Y
                            input#dataY.form-control(type="text" placeholder="y" readonly)
                            span.input-group-append
                                span.input-group-text px
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataWidth") Width
                            input#dataWidth.form-control(type="text" placeholder="width" readonly)
                            span.input-group-append
                                span.input-group-text px
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataHeight") Height
                            input#dataHeight.form-control(type="text" placeholder="height" readonly)
                            span.input-group-append
                                span.input-group-text px
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataScaleX") ScaleX
                            input#dataScaleX.form-control(type="text" placeholder="scaleX" readonly)
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataScaleY") ScaleY
                            input#dataScaleY.form-control(type="text" placeholder="scaleY" readonly)
                        .input-group.input-group-sm.col-sm-6
                            span.input-group-prepend
                                label.input-group-text(for="dataRotate") Rotate
                            input#dataRotate.form-control(type="text" placeholder="rotate" readonly)
                            span.input-group-append
                                span.input-group-text deg
                .modal-footer
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ $t('actions.cancel') }}
                    button.btn.btn-primary(type="button" @click="onUploadClicked()") {{ $t('actions.save') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {timeoutCaller, ui} from '../../app/utils'
import {TypeObject} from '@linhntaim/vue-utils'
import Cropper from 'cropperjs'
import UploadDescription from './UploadDescription'

export default {
    name: 'ImageModal',
    components: {UploadDescription},
    props: {
        informationEnabled: Boolean,
        scaleEnabled: Boolean,
        rotateEnabled: Boolean,
        setEnabled: Boolean,
    },
    data() {
        return {
            uis: {},

            title: this.$t('actions.upload'),
            uploadCallback: null,
            cancelCallback: null,
            imageUrl: null,

            extensions: ['jpg', 'jpeg', 'png'],
        }
    },
    computed: {
        acceptedExtensions() {
            return this.extensions.map(extension => extension.startsWith('.') ? extension : '.' + extension).join(', ')
        },
    },
    destroyed() {
        this.$bus.off('image')
    },
    mounted() {
        this.$bus.on('image', ({imageUrl, options, title, uploadCallback, cancelCallback}) => {
            this.show(imageUrl, options, title, uploadCallback, cancelCallback)
        })

        this.initUi()
    },
    methods: {
        initUi() {
            this.uis.$ = ui.query('#imageModal').get()
            this.uis.$.on('hide.bs.modal', () => {
                this.reset()
            })

            this.uis.URL = window.URL || window.webkitURL
            this.uis.inputImageFile = document.getElementById('inputImageFile')
            this.uis.image = document.querySelector('.img-container').childNodes.item(0)
            this.uis.actions = document.querySelector('.img-actions')
            this.uis.dataX = document.getElementById('dataX')
            this.uis.dataY = document.getElementById('dataY')
            this.uis.dataHeight = document.getElementById('dataHeight')
            this.uis.dataWidth = document.getElementById('dataWidth')
            this.uis.dataRotate = document.getElementById('dataRotate')
            this.uis.dataScaleX = document.getElementById('dataScaleX')
            this.uis.dataScaleY = document.getElementById('dataScaleY')
            this.uis.originalImageURL = null
            this.uis.uploadedImageType = 'image/jpeg'
            this.uis.uploadedImageName = 'cropped.jpg'
            this.uis.uploadedImageURL = null
            this.uis.options = {
                aspectRatio: 16 / 9,
                preview: '.img-preview',
                viewMode: 3,
                dragMode: 'none',
                crop: e => {
                    const data = e.detail

                    if (this.informationEnabled) {
                        this.uis.dataX.value = Math.round(data.x)
                        this.uis.dataY.value = Math.round(data.y)
                        this.uis.dataHeight.value = Math.round(data.height)
                        this.uis.dataWidth.value = Math.round(data.width)
                        this.uis.dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : ''
                        this.uis.dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : ''
                        this.uis.dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : ''
                    }
                },
            }

            if (typeof document.createElement('cropper').style.transition === 'undefined') {
                this.uis.$.find('button[data-method="rotate"]').prop('disabled', true)
                this.uis.$.find('button[data-method="scale"]').prop('disabled', true)
            }

            if (!this.uis.URL) {
                this.uis.inputImageFile.disabled = true
                this.uis.inputImageFile.parentNode.className += ' disabled'
            }
        },
        onImageFileChanged($event) {
            const files = $event.target.files

            if (files && files.length) {
                const file = files[0]
                if (/^image\/\w+/.test(file.type)) {
                    this.uis.uploadedImageType = file.type
                    this.uis.uploadedImageName = file.name

                    if (this.uis.uploadedImageURL) {
                        this.uis.URL.revokeObjectURL(this.uis.uploadedImageURL)
                    }

                    this.imageUrl = this.uis.image.src = this.uis.uploadedImageURL = this.uis.URL.createObjectURL(file)
                    if (this.uis.cropper) {
                        this.uis.cropper.destroy()
                    }
                    this.uis.cropper = new Cropper(this.uis.image, this.uis.options)
                    this.uis.inputImageFile.value = null
                }
            }
        },
        onActionClicked($event) {
            const e = $event

            if (!this.uis.cropper) {
                return
            }

            let target = e.target
            while (target !== this) {
                if (target.getAttribute('data-method')) {
                    break
                }

                target = target.parentNode
            }

            if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
                return
            }

            let data = {
                method: target.getAttribute('data-method'),
                target: target.getAttribute('data-target'),
                option: target.getAttribute('data-option') || undefined,
                secondOption: target.getAttribute('data-second-option') || undefined,
            }

            if (data.method) {
                let input
                if (typeof data.target !== 'undefined') {
                    input = document.querySelector(data.target)

                    if (!target.hasAttribute('data-option') && data.target && input) {
                        try {
                            data.option = JSON.parse(input.value)
                        }
                        catch (e) {
                            // eslint-disable-next-line no-console
                            console.log(e.message)
                        }
                    }
                }

                const cropped = this.uis.cropper.cropped
                switch (data.method) {
                    case 'rotate':
                        if (cropped && this.uis.options.viewMode > 0) {
                            this.uis.cropper.clear()
                        }
                        break
                    case 'scaleX+':
                        data.option = this.uis.cropper.getData().scaleX + 0.1
                        data.method = 'scaleX'
                        break
                    case 'scaleX-':
                        data.option = this.uis.cropper.getData().scaleX - 0.1
                        data.method = 'scaleX'
                        break
                    case 'scaleY+':
                        data.option = this.uis.cropper.getData().scaleY + 0.1
                        data.method = 'scaleY'
                        break
                    case 'scaleY-':
                        data.option = this.uis.cropper.getData().scaleY - 0.1
                        data.method = 'scaleY'
                        break
                    case 'flipH':
                        data.option = -this.uis.cropper.getData().scaleX
                        data.method = 'scaleX'
                        break
                    case 'flipV':
                        data.option = -this.uis.cropper.getData().scaleY
                        data.method = 'scaleY'
                        break
                }

                const result = this.uis.cropper[data.method](data.option, data.secondOption)

                switch (data.method) {
                    case 'rotate':
                        if (cropped && this.uis.options.viewMode > 0) {
                            this.uis.cropper.crop()
                        }
                        break
                    case 'destroy':
                        this.uis.cropper = null
                        if (this.uis.uploadedImageURL) {
                            this.uis.URL.revokeObjectURL(this.uis.uploadedImageURL)
                            this.uis.uploadedImageURL = ''
                            this.uis.image.src = this.uis.originalImageURL
                        }
                        break
                }

                if (typeof result === 'object' && result !== this.uis.cropper && input) {
                    try {
                        input.value = JSON.stringify(result)
                    }
                    catch (e) {
                        // eslint-disable-next-line no-console
                        console.log(e.message)
                    }
                }
            }
        },
        reset() {
            if (this.uis.cropper) {
                this.uis.cropper.destroy()
            }
            this.uis.originalImageURL = null
            this.imageUrl = null
        },
        show(imageUrl, options = {}, title = null, uploadCallback = null, cancelCallback = null) {
            this.imageUrl = imageUrl
            this.title = title ? title : this.$t('actions.upload')
            this.uploadCallback = uploadCallback ? uploadCallback : null
            this.cancelCallback = cancelCallback ? cancelCallback : null

            this.uis.$.modal('show')

            if (options) {
                this.uis.options = TypeObject.merge(this.uis.options, options)
            }

            if (this.imageUrl) {
                timeoutCaller.register(() => {
                    this.uis.cropper = new Cropper(this.uis.image, this.uis.options)
                    this.uis.originalImageURL = this.uis.image.src
                })
            }
        },
        onCancelClicked() {
            this.uis.$.modal('hide')
            if (this.cancelCallback) {
                this.cancelCallback()
            }
        },
        onUploadClicked() {
            if (this.uploadCallback && this.uis.cropper) {
                this.uis.cropper.getCroppedCanvas().toBlob(blob => {
                    this.uploadCallback(blob, this.uis.uploadedImageName)
                })
            }

            this.uis.$.modal('hide')
        },
    },
}
</script>

<style src="../../../node_modules/cropperjs/dist/cropper.min.css"></style>

<style scoped>
.btn {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

label.btn {
    margin-bottom: 0;
}

.d-flex > .btn {
    flex: 1;
}

.img-container-item {
    margin-bottom: 1rem;
}

.img-container,
.img-preview {
    background-color: #f7f7f7;
    text-align: center;
    width: 100%;
}

.img-container {
    max-height: 1000px;
}

.img-container > img {
    max-width: 100%;
}

.img-preview {
    height: 1000px;
    max-width: 100%;
    overflow: hidden;
}

.img-preview > img {
    max-width: 100%;
}

.img-actions.img-container-item {
    margin-bottom: 0.5rem;
}

.img-actions > .btn-group {
    margin: 0 0.25rem 0.5rem 0.25rem;
}

.image-data > .input-group {
    margin-bottom: 0.5rem;
}

.image-data .input-group-prepend .input-group-text {
    min-width: 4rem;
}

.image-data .input-group-append .input-group-text {
    min-width: 3rem;
}

.img-tooltip {
    display: block;
    margin: -0.5rem -0.75rem;
    padding: 0.5rem 0.75rem;
}
</style>
