<template lang="pug">
    #app
        .container
            connection-lost
</template>

<script>
    import ConnectionLost from './error/ConnectionLost'

    export default {
        name: 'AppFailed',
        components: {ConnectionLost},
    }
</script>