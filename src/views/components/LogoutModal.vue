<template lang="pug">
    #logoutModal.modal.fade(tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5#exampleModalLabel.modal-title {{ $t('components.logout.title') }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body {{ $t('components.logout.desc') }}
                .modal-footer
                    button.btn.btn-secondary(type="button" data-dismiss="modal") {{ $t('actions.cancel') }}
                    button.btn.btn-primary(@click="onLogoutClicked()" type="button" data-dismiss="modal") {{ $t('actions.logout') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {APP_ROUTE} from '../../app/config'

export default {
    name: 'LogoutModal',
    methods: {
        onLogoutClicked() {
            this.$router.push(APP_ROUTE.unauthenticate)
        },
    },
}
</script>
