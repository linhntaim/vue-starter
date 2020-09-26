<template lang="pug">
    .toasts
        .toast.show(v-for="(toast, index) in toasts" :id="'toast-' + toast.id" :class="toast.htmlClass" :data-index="index")
            .toast-header
                strong.mr-auto {{ toast.title }}
                small.text-muted {{ toast.time }}
                button.ml-2.mb-1.close(@click="onCloseClicked(toast)" type="button" data-dismiss="toast" aria-label="Close")
                    span(aria-hidden="true") ×
            .toast-body(v-html="toast.content")
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'Toasts',
        data() {
            return {
                increment: 0,
                toasts: [],
            }
        },
        destroyed() {
            this.$bus.off('toast')
        },
        mounted() {
            this.$bus.on('toast', ({content, title, time, type}) => {
                this.add(content, title, time, type)
            })
        },
        methods: {
            add(content, title, time, type) {
                let id = ++this.increment
                this.toasts.unshift({
                    id: id,
                    title: title,
                    content: content,
                    time: time ? time : '',
                    htmlClass: type ? 'toast-' + type : 'default',
                })

                // auto remove, not use timeoutCaller !important
                setTimeout(() => {
                    this.remove(id)
                }, 5000)
            },
            remove(id) {
                this.toasts.splice(ui.query('#toast-' + id).get().data('index'), 1)
            },
            onCloseClicked(toast) {
                this.remove(toast.id)
            },
        },
    }
</script>
