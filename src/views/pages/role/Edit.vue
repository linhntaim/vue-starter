<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.font-weight-bold.text-primary {{ $t('pages._role._edit._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label.required(for="inputName") {{ $t('pages.name') }}
                    input#inputName.form-control(v-model="name" type="text" required)
                .form-group
                    label.required(for="inputDisplayName") {{ $t('pages.display_name') }}
                    input#inputDisplayName.form-control(v-model="displayName" type="text" required)
                .form-group
                    label.required(for="inputPermissions") {{ $tc('pages.permission', 2) }}
                    select#inputPermissions.form-control(v-model="permissions" multiple required)
                        option(disabled value="") {{ $tc('actions.select_what', {what: $tc('pages.permission', 2)}) }}
                        option(v-for="metaPermission in metadata.permissions" :value="metaPermission.id" :selected="permissions.indexOf(metaPermission.id)!==-1") {{ metaPermission.display_name }}
                .form-group
                    label(for="inputDescription") {{ $t('pages.description') }}
                    textarea#inputDescription.form-control(v-model="description" cols="10" rows="2")
            .card-footer.clearfix
                button.btn.btn-primary.float-right(:disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.edit') }}
</template>

<script>
    import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
    import {ui, timeoutCaller} from '../../../app/utils'
    import {Collection} from '@dsquare-gbu/vue-utils'
    import {TOAST_DEF} from '../../../app/config'

    export default {
        name: 'Edit',
        data() {
            return {
                loading: false,

                id: parseInt(this.$route.params.id),
                name: '',
                displayName: '',
                permissions: [],
                description: '',
            }
        },
        computed: {
            ...mapGetters({
                metadata: 'prerequisite/metadata',
                role: 'role/role',
                accountRole: 'account/role',
            }),
        },
        mounted() {
            this.init()
        },
        methods: {
            ...mapActions({
                require: 'prerequisite/require',
                getById: 'role/getById',
                roleEdit: 'role/edit',
            }),
            init() {
                this.loading = true
                this.require({
                    names: ['permissions'],
                    doneCallback: () => {
                        this.initById()
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
            initById() {
                this.loading = true
                this.getById({
                    id: this.id,
                    doneCallback: () => {
                        this.name = this.role.name
                        this.displayName = this.role.display_name
                        this.description = this.role.description
                        this.permissions = (new Collection(this.role.permissions)).pluck('id')

                        this.$forceUpdate() // render dynamic options

                        this.initUi()

                        this.loading = false
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
            initUi() {
                timeoutCaller.register(() => {
                    ui.select2(ui.query('#inputPermissions').get(), selected => {
                        this.permissions = selected
                    })
                })
            },
            onSubmitted() {
                this.loading = true
                this.roleEdit({
                    id: this.role.id,
                    params: {
                        name: this.name,
                        display_name: this.displayName,
                        permissions: this.permissions,
                        description: this.description,
                    },
                    doneCallback: () => {
                        if (this.accountRole === this.name) {
                            ui.reloadPage()
                        }

                        this.loading = false

                        this.$bus.emit('toast', {
                            title: this.$t('pages._role._edit._'),
                            content: this.$t('pages._role._edit.succeed'),
                            type: TOAST_DEF.success,
                        })
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
        },
    }
</script>
