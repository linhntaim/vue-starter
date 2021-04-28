/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    hello: 'Hello',
    def: {
        activity_action: {
            login: 'Login',
            logout: 'Logout',
            model_create: 'Create',
            model_delete: 'Delete',
            model_edit: 'Edit',
            model_export: 'Export',
            model_import: 'Import',
            model_list: 'List',
            // TODO:

            // TODO
        },
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
        screen: {
            login: 'Login',
            logout: 'Logout',
            activity_log_index: 'Activity log - List',
            role_index: 'Role - List',
            role_check_index: 'Role - Check list',
            role_create: 'Role - Create',
            role___edit: 'Role - Edit',
            // TODO:

            // TODO
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
        import: 'Import',
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
        reset: 'Reset',
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
        export: {
            _: 'Export',
        },
        image: {
            cropped_image: 'Cropped image',
            flip_horizontal: 'Flip horizontal',
            flip_vertical: 'Flip vertical',
            move_left: 'Move left',
            move_right: 'Move right',
            move_up: 'Move up',
            move_down: 'Move down',
            original_image: 'Original image',
            reset: 'Reset',
            upload_image: 'Upload image',
            zoom_in: 'Zoom in',
            zoom_out: 'Zoom out',
        },
        logout: {
            _: 'Logout',
            desc: 'Select "Logout" below if you are ready to end your current session.',
            title: 'Ready to Leave?',
        },
        pagination: {
            display_result: 'Display result',
        },
        // TODO
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
        base: {
            top: 'Go to top',
            back: 'Back to previous page',
        },
        base_footer: {
            copyright: 'Copyright &copy; {app_name} {year}',
        },
        base_sidebar: {
            _: 'Menu',
            dashboard: 'Dashboard',
            create_a_role: 'Create role',
            list_of_activity_logs: 'List of activity logs',
            list_of_roles: 'List of roles',
            role_management: 'Role management',
            sample: 'Sample',
            calendar_sample: 'Calendar',
            select2_sample: 'Select2',
            // TODO:

            // TODO
        },
        // TODO
        // TODO:

        // TODO
    },
    pages: {
        email_address: 'Email address',
        impersonator: 'Impersonator',
        password: 'Password',
        // TODO:
        confirm_new_password: 'Confirm new password',
        confirm_password: 'Confirm password',
        created_at: 'Created at',
        created_date_from: 'Created date from',
        created_date_to: 'Created date to',
        created_time_from: 'Created time from',
        created_time_to: 'Created time to',
        creator: 'Creator',
        current_password: 'Current password',
        description: 'Description',
        display_name: 'Display name',
        name: 'Name',
        new_password: 'New password',
        no_items: 'There is no items',
        permission: 'Permission | Permissions',
        status: 'Status',
        // TODO
        // TODO:

        // TODO
        _auth: {
            _login: {
                _: 'Login',
                forgot_password: 'Forgot password?',
                welcome_back: 'Welcome Back!',
            },
            _logout: {
                _: 'Logout',
            },
            // TODO:
            _forgot_password: {
                _: 'Forgot password?',
                back_login: 'Back to Login',
                desc: 'We get it, stuff happens. Just enter your email address below and we\'ll send you a link to reset your password!',
                submit: 'Reset password',
                succeed: 'We sent an e-mail to you. You can reset your password by clicking on the link in the email.<br>' +
                    'If you do not see the e-mail, please check it in your spam folder.',
            },
            _reset_password: {
                _: 'Reset password',
                back_login: 'Back to Login',
                submit: 'Reset password',
                succeed: 'Your password has been reset successfully',
            },
            // TODO
            // TODO:

            // TODO
        },
        // TODO:
        _dashboard: {
            _: 'Dashboard',
            _boxes: {
                _impersonate: {
                    _: 'Impersonate',
                },
                _ip_limitation: {
                    _: 'IP limitation',
                    allowed_ips: 'Allowed IPs',
                    allowed_ips_help: 'Each IP should be typed on one line',
                    denied_ips: 'Denied IPs',
                    denied_ips_help: 'Each IP should be typed on one line',
                    only_admin: 'Only admin',
                },
                _maintenance_mode: {
                    _: 'Maintenance mode',
                    allowed_ips: 'Allowed IPs',
                    allowed_ips_help: 'Each IP should be typed on one line',
                },
                _system_log: {
                    _: 'System logs',
                },
            },
        },
        _me: {
            _: 'My account',
            change_email_address: 'Change email address',
            change_email_address_succeed: 'Email address was changed successfully!',
            change_password: 'Change password',
            change_password_succeed: 'Password was changed successfully!',
            _edit_information: {
                _: 'Information',
                change_picture: 'Change picture',
                change_picture_succeed: 'Picture was changed successfully!',
                edit_information: 'Edit account information',
                edit_information_succeed: 'Account information was edited successfully!',
            },
            _notification: {
                title: 'Title',
                content: 'Content',
                mark_as_read: 'Mark as read',
                notified_at: 'Notified at',
                read_at: 'Read at',
                _index: {
                    _: 'My notifications',
                },
            },
        },
        _activity_log: {
            _: 'Activity logs',
            acted_by: 'Acted by',
            action: 'Action',
            client_ip: 'Client IP',
            client_agent: 'Client agent',
            device: 'Device',
            log: 'Log',
            screen: 'Screen',
            _index: {
                _: 'Activity logs',
            },
        },
        _role: {
            _: 'Roles',
            _create: {
                _: 'Create role',
                succeed: 'Role has been created successfully!',
            },
            _edit: {
                _: 'Edit role',
                succeed: 'Role has been edited successfully!',
            },
            _index: {
                _: 'List of roles',
                want_delete: 'Are you sure to delete this role?',
                want_delete_many: 'Are you sure to delete these roles?',
            },
        },
        _sample: {
            _: 'Sample',
            _calendar_index: {
                _: 'Calendar',
            },
            _select2_index: {
                _: 'Select2',
            },
            // TODO:

            // TODO
        },
        // TODO
        // TODO:

        // TODO
    },
}
