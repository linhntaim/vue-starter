/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    hello: 'こんにちは',
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
        complete: 'Complete',
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
        previous: 'Previous',
        prompt: 'プロンプト',
        refresh: 'リフレッシュ',
        regenerate: '再生成',
        resend: '再送信',
        save: '保存',
        search: 'この条件で検索',
        select: '選択',
        select_what: '{what}を選択',
        submit: 'Submit',
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

        // TODO
    },
    pages: {
        email_address: 'メールアドレス',
        impersonator: 'なりすまし',
        password: 'パスワード',
        // TODO:

        // TODO
        _auth: {
            _login: {
                _: 'ログイン',
                welcome_back: 'ログイン',
            },
            _logout: {
                _: 'ログアウト',
            },
            // TODO:

            // TODO
        },
        // TODO:

        // TODO
    },
}
