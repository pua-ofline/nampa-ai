# nampa-ai (あいオギ相談室)

恋愛・コミュニケーション・メンタルの相談に乗る、あなた自身の分身AIチャットボット。
Gemini API の無料枠を使ってコストをかけずに動かすことを想定しています。

## セットアップ

```bash
npm install
cp .env.example .env
```

`.env` に Gemini APIキーを設定してください([aistudio.google.com/apikey](https://aistudio.google.com/apikey) で無料発行可能)。

```
GEMINI_API_KEY=あなたのAPIキー
```

## 起動

```bash
npm run dev
```

`http://localhost:3000` で確認できます。

## キャラクター設定のカスタマイズ

[persona.js](persona.js) の `SYSTEM_PROMPT` を、自分の口調が伝わるサンプル文章(ツイート・LINE返信例・ブログ記事など)を元に書き換えてください。具体的な発言例を数個含めるほど再現度が上がります。

## コスト対策

- `server.js` に1日あたりのIPごとの利用回数上限(`DAILY_LIMIT`)を設定済み。公開規模に応じて調整してください。
- Gemini API の無料枠には利用回数・レート制限があるため、想定アクセス数に応じて [公式の無料枠情報](https://ai.google.dev/pricing) を確認してください。

## 今後の展開(未着手)

- Vercel / Cloudflare Pages などへの無料デプロイ
- 会話履歴の永続化(現状はブラウザを閉じると消える)
