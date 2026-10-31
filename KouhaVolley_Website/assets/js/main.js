
/* ========================================
   MOBILE MENU / スマートフォン用メニュー
======================================== */

// メニューボタンとナビゲーションを取得
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {

    // メニューボタンをクリックしたとき
    toggle.addEventListener('click', () => {

        // 現在のメニューの開閉状態を取得
        const open = toggle.getAttribute('aria-expanded') === 'true';

        // 開閉状態を切り替える
        toggle.setAttribute('aria-expanded', String(!open));

        // ボタンの説明を変更
        toggle.setAttribute(
            'aria-label',
            open ? 'メニューを開く' : 'メニューを閉じる'
        );

        // ナビゲーションの表示・非表示を切り替える
        nav.classList.toggle('is-open', !open);

    });


    // ナビゲーション内のリンクをクリックしたとき
    nav.querySelectorAll('a').forEach(a => {

        a.addEventListener('click', () => {

            // メニューを閉じた状態に戻す
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'メニューを開く');

            // ナビゲーションを非表示にする
            nav.classList.remove('is-open');

        });

    });

}


/* ========================================
   COPY EMAIL / メールアドレスのコピー
======================================== */

// メールアドレスのコピーボタンを取得
const copyEmail = document.getElementById('copy-email');

if (copyEmail) {

    copyEmail.addEventListener('click', async () => {

        // コピー結果を表示する要素
        const feedback = document.getElementById('copy-feedback');

        try {

            // メールアドレスをクリップボードにコピー
            await navigator.clipboard.writeText('kouhavolley@gmail.com');

            // コピー成功時のメッセージ
            feedback.textContent = 'コピーしました。';

        } catch (e) {

            // コピー失敗時のメッセージ
            feedback.textContent =
                'コピーできませんでした。メールアドレスを選択してコピーしてください。';

        }

    });

}


/* ========================================
   CONTACT FORM / お問い合わせフォーム
======================================== */

// お問い合わせフォームを取得
const mailForm = document.getElementById('contact-mail-form');

if (mailForm) {

    mailForm.addEventListener('submit', e => {

        // フォームの通常送信を停止
        e.preventDefault();


        // 入力内容の妥当性を確認
        if (!mailForm.reportValidity()) return;


        // 入力された内容を取得
        const purpose = document.getElementById('contact-purpose').value;

        const name = document.getElementById('contact-name').value.trim();

        const message = document.getElementById('contact-message').value.trim();


        // 名前・お問い合わせ内容が空の場合は処理を終了
        if (!name || !message) return;


        /* ----------------------------------------
           EMAIL CONTENT / メール本文の作成
        ---------------------------------------- */

        // メールの件名
        const subject = '【煌覇 お問い合わせ】' + purpose;

        // メールの本文
        const body =
            'お問い合わせ種別：' + purpose +
            '\nお名前：' + name +
            '\n\nお問い合わせ内容：\n' + message +
            '\n\n---\n煌覇公式サイトから作成';


        /* ----------------------------------------
           OPEN EMAIL APP / メールアプリの起動
        ---------------------------------------- */

        // メールアプリが開かない場合の案内
        document.getElementById('mail-feedback').textContent =
            'メールアプリが開かない場合は、メールアドレスをコピーして直接送信してください。';


        // 件名・本文をURLエンコードしてメールアプリを起動
        window.location.href =
            'mailto:kouhavolley@gmail.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body);

    });

}
