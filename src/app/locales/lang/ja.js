/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    hello: 'こんにちは',
    def: {
        activity_action: {
            login: 'Login',
            logout: 'Logout',
            model_create: 'Create',
            model_delete: 'Delete',
            model_edit: 'Edit',
            model_export: 'Export',
            model_list: 'List',
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
            info: '情報',
            warning: '警告',
            error: 'エラー',
        },
        error_message_level: {
            user_failed: 'ユーザー登録失敗',
            database_failed: 'データベースアクセス失敗',
            application_failed: 'アプリケーション失敗',
            unhandled_error: '未処理エラー',
        },
        export_state: {
            exporting: '作成済',
            exported: '作成済',
            failed: '失敗',
        },
        role: {
            admin: '管理者',
            operator: '事務局ユーザー',
            viewer: '閲覧ユーザー',
        },
        screen: {
            login: 'Login',
            logout: 'Logout',
            role_index: 'Role - List',
            role_create: 'Role - Create',
            role___edit: 'Role - Edit',
        },
        // TODO:

        // TODO
    },
    actions: {
        actions: '操作',
        add: '追加',
        add_what: '{what}を追加',
        apply: 'Apply',
        back: 'Back',
        back_where: '{where}に戻る',
        browse: '参照',
        bulk_actions: 'バルクアクション',
        cancel: 'キャンセル',
        change: '変更',
        change_what: '{what}を変更',
        choose_file: 'ファイルを選択してください',
        clear_cache: 'キャッシュをクリア',
        clear_search: '検索条件をクリアする',
        close: '閉じる',
        confirm: '確認',
        create: '作成',
        delete: '削除',
        download: 'ダウンロード',
        edit: '編集',
        edit_what: '{what}を編集',
        export: 'エクスポート',
        generate: '生成',
        go: '{where}に遷移',
        live_preview: 'ライブプレビュー',
        loading: '読み込み中',
        login: 'ログイン',
        logout: 'ログアウト',
        next: '次へ',
        no: 'いいえ',
        preview: 'プレビュー',
        prompt: 'プロンプト',
        refresh: 'リフレッシュ',
        regenerate: '再生成',
        resend: '再送信',
        save: '保存',
        search: 'この条件で検索',
        select: '選択',
        select_what: '{what}を選択',
        sync: 'ページを再読み込み',
        upload: 'アップロード',
        verify: '検証',
        view: '表示',
        yes: 'はい',
        // TODO:

        // TODO
    },
    components: {
        upload_description: {
            extensions: '許可されるファイル形式: {extensions}. ',
            size: '最大アップロードファイルサイズ: {size}.',
        },
        // TODO:
        export: {
            _: 'Export',
        },
        image: {
            cropped_image: 'トリミングされた画像',
            flip_horizontal: '水平反転',
            flip_vertical: '垂直反転',
            move_left: '左に移動',
            move_right: '右に移動',
            move_up: '上に移動',
            move_down: '下に移動',
            original_image: '元の画像',
            reset: 'リセット',
            upload_image: '写真アップロード',
            zoom_in: 'ズームイン',
            zoom_out: 'ズームアウト',
        },
        logout: {
            _: 'ログアウト',
            desc: '現在のセッションを終了する場合、以下の"ログアウト"を選択します。',
            title: 'ログアウトしますか?',
        },
        pagination: {
            display_result: '表示件数',
        },
        // TODO
        // TODO:

        // TODO
    },
    error: {
        bad_request: {
            _: 'Bad Request',
            desc: 'リクエストが正常に処理されていないようです...',
        },
        internal_server_error: {
            _: '内部サーバーエラー',
            desc: '問題が発生しました...',
        },
        maintenance: {
            _: 'ただいま、メンテナンス中です',
            desc: 'ただいまシステムメンテナンスを実施しております。<br>' +
                '大変ご迷惑をおかけして申し訳ございませんが、メンテナンス終了まで今しばらくお待ちください。<br>' +
                '作業終了次第サービス再開いたします。',
        },
        not_found: {
            _: 'ページが見つかりません',
            desc: 'ページが見つからないようです...',
        },
        service_unavailable: {
            _: '接続切断',
            desc: '接続できないようです...',
        },
        unauthenticated: {
            _: '未認証',
            desc: 'ログインしていないようです...',
        },
        unauthorized: {
            _: '無許可',
            desc: 'このリクエストを実行する権限がないようです...',
        },
        back_to_root: '← ルートに戻る',
    },
    master: {
        // TODO:
        base: {
            top: 'トップへ戻る',
            back: '前のページに戻る',
        },
        base_footer: {
            copyright: 'Copyright &copy; {app_name} {year}',
        },
        base_sidebar: {
            _: 'メニュー',
            dashboard: 'Dashboard',
            create_a_role: '役割の作成',
            list_of_activity_logs: 'List of activity logs',
            list_of_roles: '役割の一覧',
            role_management: 'ユーザー管理',
            // TODO:

            // TODO
        },
        // TODO
        // TODO:

        // TODO
    },
    pages: {
        email_address: 'メールアドレス',
        impersonator: 'なりすまし',
        password: 'パスワード',
        // TODO:
        confirm_new_password: '新しいパスワードを再入力',
        confirm_password: 'パスワードを確認',
        created_at: 'Created at',
        created_date_from: 'Created date from',
        created_date_to: 'Created date to',
        created_time_from: 'Created time from',
        created_time_to: 'Created time to',
        creator: 'Creator',
        current_password: '現在のパスワード',
        description: '詳細',
        display_name: 'ユーザー名',
        name: '名',
        new_password: '新しいパスワード',
        no_items: '該当するデータが存在しません。',
        permission: '許可 | 許可',
        status: 'Status',
        // TODO
        // TODO:

        // TODO
        _auth: {
            _login: {
                _: 'ログイン',
                forgot_password: 'パスワードを忘れた方はこちら？',
                welcome_back: 'ログイン',
            },
            logout: {
                _: 'ログアウト',
            },
            // TODO:
            _forgot_password: {
                _: 'パスワード再設定',
                back_login: 'ログイン画面へ戻る',
                desc: '登録されているメールアドレスを入力してください。パスワード再設定のご案内をメールで送信します。',
                submit: 'メール送信',
                succeed: 'メールを送信しました。メールに記載されたリンクをクリックするとパスワードをリセットできます。<br>' +
                    'メールが届かない場合、迷惑メールやスパムフォルダーなどもご確認ください。',
            },
            _reset_password: {
                _: 'パスワード再設定',
                back_login: 'ログインページへ戻る',
                submit: '確定',
                succeed: 'パスワードのリセットに成功しました。',
            },
            // TODO
            // TODO:

            // TODO
        },
        // TODO:
        _dashboard: {
            _: 'ダッシュボード',
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
                    _: 'メンテナンスモード',
                    allowed_ips: 'Allowed IPs',
                    allowed_ips_help: 'Each IP should be typed on one line',
                },
                _system_log: {
                    _: 'System logs',
                },
            },
        },
        _me: {
            _: 'マイアカウント',
            change_email_address: 'メールアドレスを変更',
            change_email_address_succeed: 'メールアドレスの変更に成功しました。',
            change_password: 'パスワードを変更',
            change_password_succeed: 'パスワードの変更に成功しました。',
            _edit_information: {
                _: '情報',
                edit_information: 'プロフィールを変更',
                edit_information_succeed: 'プロフィールの変更に成功しました。',
                change_picture: 'プロフィール写真を編集',
                change_picture_succeed: 'プロフィール写真の編集に成功しました。',
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
            screen: 'Screen',
            _index: {
                _: 'Activity logs',
            },
        },
        _role: {
            _: '役割',
            _create: {
                _: '役割作成',
                succeed: '役割が正常に作成されました！',
            },
            _edit: {
                _: '役割編集',
                succeed: '役割が正常に編集されました！',
            },
            _index: {
                _: '役割一覧',
                want_delete: 'この役割を削除してもよろしいですか？?',
                want_delete_many: 'これらの役割を削除してもよろしいですか？',
            },
        },
        // TODO
        // TODO:

        // TODO
    },
}
