/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    hello: 'Hello',
    def: {
        datetime: {
            short_date_0: '{yyyy}-{mm}-{dd}',
            short_date_1: '{mm}/{dd}/{yyyy}',
            short_date_2: '{dd}/{mm}/{yyyy}',
            short_date_3: '{dd}-{sm}-{yy}',
            short_month_0: '{yyyy}-{mm}',
            short_month_1: '{mm}/{yyyy}',
            short_month_2: '{mm}/{yyyy}',
            short_month_3: '{sm}-{yy}',
            long_date_0: '{lm} {dd}, {yyyy}',
            long_date_1: '{dd} {lm}, {yyyy}',
            long_date_2: '{ld}, {lm} {dd}, {yyyy}',
            long_date_3: '{ld}, {dd} {lm}, {yyyy}',
            short_time_0: '{hh2}:{ii}',
            short_time_1: '{h}:{ii} {ut}',
            short_time_2: '{h}:{ii} {lt}',
            short_time_3: '{hh}:{ii} {ut}',
            short_time_4: '{hh}:{ii} {lt}',
            long_time_0: '{hh2}:{ii}:{ss}',
            long_time_1: '{h}:{ii}:{ss} {ut}',
            long_time_2: '{h}:{ii}:{ss} {lt',
            long_time_3: '{hh}:{ii}:{ss} {ut}',
            long_time_4: '{hh}:{ii}:{ss} {lt}',
        },
        error_level: {
            error: 'Error',
            info: 'Information',
            warning: 'Warning',
        },
        error_message_level: {
            application_failed: 'Application failed',
            database_failed: 'Database failed',
            unhandled_error: 'Unhandled error',
            user_failed: 'User failed',
        },
        export_state: {
            exported: 'Exported',
            exporting: 'Exporting',
            failed: 'Failed',
        },
        role: {
            admin: 'Admin',
            operator: 'Operator',
            viewer: 'Viewer',
        },
        // TODO:

        // TODO
    },
    actions: {
        actions: 'Actions',
        add: 'Add',
        add_what: 'Add {what}',
        apply: 'Apply',
        back: 'Back',
        back_where: 'Back to {where}',
        browse: 'Browse',
        bulk_actions: 'Bulk actions',
        cancel: 'Cancel',
        change: 'Change',
        change_what: 'Change {what}',
        choose_file: 'Choose a file...',
        clear_cache: 'Clear cache',
        clear_search: 'Clear search',
        close: 'Close',
        complete: 'Complete',
        confirm: 'Confirm',
        create: 'Create',
        delete: 'Delete',
        download: 'Download',
        edit: 'Edit',
        edit_what: 'Edit {what}',
        export: 'Export',
        generate: 'Generate',
        go: 'Go to {where}',
        live_preview: 'Live preview',
        loading: 'Loading',
        login: 'Login',
        logout: 'Logout',
        next: 'Next',
        no: 'No',
        preview: 'Preview',
        previous: 'Previous',
        prompt: 'Prompt',
        refresh: 'Refresh',
        regenerate: 'Regenerate',
        resend: 'Resend',
        save: 'Save',
        search: 'Search',
        select: 'Select',
        select_what: 'Select {what}',
        submit: 'Submit',
        sync: 'Sync',
        upload: 'Upload',
        verify: 'Verify',
        view: 'View',
        yes: 'Yes',
        // TODO:

        // TODO
    },
    components: {
        upload_description: {
            extensions: 'File extensions allowed: {extensions}. ',
            size: 'Max upload file size: {size}.',
        },
        // TODO:

        // TODO
    },
    error: {
        bad_request: {
            _: 'Bad Request',
            desc: 'It looks like your request is not successfully handled...',
        },
        internal_server_error: {
            _: 'Internal Server Error',
            desc: 'Something went wrong ...',
        },
        maintenance: {
            _: 'Maintenance Mode',
            desc: 'We are currently carrying out system maintenance.<br>' +
                'We apologize for the inconvenience, but please wait for the maintenance to finish.<br>' +
                'Our system will resume as soon as it is ready to serve.',
        },
        not_found: {
            _: 'Page Not Found',
            desc: 'It looks like you found a glitch in the matrix...',
        },
        service_unavailable: {
            _: 'Service Unavailable',
            desc: 'It looks like our service cannot be connected...',
        },
        unauthenticated: {
            _: 'Unauthenticated',
            desc: 'It looks like you are not logging in...',
        },
        unauthorized: {
            _: 'Unauthorized',
            desc: 'It looks like you are not authorized to perform this request...',
        },
        back_to_root: '← Back to Root',
    },
    master: {
        // TODO:

        // TODO
    },
    pages: {
        email_address: 'Email address',
        impersonator: 'Impersonator',
        password: 'Password',
        // TODO:

        // TODO
        _auth: {
            _login: {
                _: 'Login',
                welcome_back: 'Welcome Back!',
            },
            _logout: {
                _: 'Logout',
            },
            // TODO:

            // TODO
        },
        // TODO:

        // TODO
    },
}
