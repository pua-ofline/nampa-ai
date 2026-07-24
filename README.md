# nampa-ai (こなんぱん相談室)

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

## デプロイ手順(Render / 無料)

Renderは無料でNode.jsサーバーを常時稼働できるプラットフォーム。レート制限はメモリ上で状態を持つ実装なので、常時起動できるRenderが相性が良い(サーバーレスだと状態が消えて機能しない)。

1. **GitHubにコードを置く**
   - [github.com](https://github.com) でアカウント作成 → 右上「+」→「New repository」で `nampa-ai` という名前のリポジトリを作成(Public/Privateどちらでも可)
   - ローカルで以下を実行してpush(`<GitHubのURL>` は作成したリポジトリのURLに置き換える)

   ```bash
   git remote add origin <GitHubのURL>
   git branch -M main
   git push -u origin main
   ```

2. **Renderでアカウント作成**
   - [render.com](https://render.com) でアカウント作成(GitHubアカウントでログインすると連携が楽)

3. **Web Serviceを作成**
   - ダッシュボードで「New +」→「Web Service」
   - さきほどpushした `nampa-ai` リポジトリを選択
   - 設定:
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free
   - 「Environment」タブで環境変数を設定(`.env` の中身と同じもの):
     - `GEMINI_API_KEY` = 自分のAPIキー
     - `GEMINI_MODEL` = `gemini-flash-latest`
   - 「Create Web Service」で完了。数分でURLが発行される

4. **注意点**
   - 無料プランは15分アクセスがないとスリープし、次のアクセス時に起動まで30秒前後かかる
   - `persona.js` を更新したら、GitHubにpushし直せば自動で再デプロイされる

## 今後の展開(未着手)

- 会話履歴の永続化(現状はブラウザを閉じると消える)
