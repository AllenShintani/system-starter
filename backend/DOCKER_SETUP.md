# Docker Desktop セットアップガイド

## macOSでのインストール手順

### ステップ1: Docker Desktopをダウンロード

1. ブラウザで以下にアクセス：
   ```
   https://www.docker.com/products/docker-desktop/
   ```

2. 「Download for Mac」ボタンをクリック
   - Apple Silicon (M1/M2/M3) の場合は「Mac with Apple Silicon」を選択
   - Intel Mac の場合は「Mac with Intel Chip」を選択

### ステップ2: インストール

1. ダウンロードした `.dmg` ファイルを開く
2. Dockerアイコンをアプリケーションフォルダにドラッグ&ドロップ
3. アプリケーションフォルダからDockerを起動

### ステップ3: 初回起動

1. Docker Desktopが起動すると、利用規約が表示されます
2. 「I accept the terms」をクリックして同意
3. 必要に応じて、システム設定で権限を許可

### ステップ4: 起動確認

ターミナルで以下を実行：

```bash
docker --version
```

**期待される出力**：
```
Docker version 24.0.0, build xxxxxxx
```

```bash
docker compose version
```

**期待される出力**：
```
Docker Compose version v2.20.0
```

## Windowsでのインストール手順

### ステップ1: Docker Desktopをダウンロード

1. ブラウザで以下にアクセス：
   ```
   https://www.docker.com/products/docker-desktop/
   ```

2. 「Download for Windows」ボタンをクリック

### ステップ2: インストール

1. ダウンロードした `.exe` ファイルを実行
2. インストールウィザードに従う
3. インストール完了後、Docker Desktopを起動

### ステップ3: 初回起動

1. Docker Desktopが起動すると、利用規約が表示されます
2. 「I accept the terms」をクリックして同意
3. 必要に応じて、WSL 2（Windows Subsystem for Linux）のインストールが求められる場合があります

### ステップ4: 起動確認

コマンドプロンプトまたはPowerShellで以下を実行：

```bash
docker --version
docker compose version
```

## インストール後の確認

### Docker Desktopが起動しているか確認

**macOS**：
- メニューバー（画面上部）にDockerのアイコン（クジラのアイコン）が表示されている
- アイコンをクリックして「Docker Desktop is running」と表示される

**Windows**：
- システムトレイ（画面右下）にDockerのアイコンが表示されている
- アイコンをクリックしてDocker Desktopが起動していることを確認

### 動作確認

```bash
# Dockerが動作しているか確認
docker ps

# 期待される出力（コンテナが起動していない場合）：
# CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

エラーが出ない場合は、Dockerが正常に動作しています。

## トラブルシューティング

### エラー1: "Docker daemon is not running"

**対処法**：
1. Docker Desktopを起動
2. メニューバー/システムトレイでDockerが起動しているか確認
3. 数秒待ってから再度コマンドを実行

### エラー2: 権限エラー

**macOS**：
```bash
# Dockerグループに追加（通常は不要）
sudo usermod -aG docker $USER
```

**Windows**：
- 管理者権限でコマンドプロンプトを起動

### エラー3: インストールが完了しない

**対処法**：
1. コンピュータを再起動
2. ウイルス対策ソフトを一時的に無効化
3. 管理者権限でインストール

## 次のステップ

Docker Desktopのインストールと起動確認が完了したら：

1. **データベースを起動**
   ```bash
   cd backend
   docker compose up -d
   ```

2. **起動確認**
   ```bash
   docker compose ps
   ```

3. **Prismaマイグレーション**
   ```bash
   npx prisma migrate dev
   ```

4. **サーバーを起動**
   ```bash
   npm run dev
   ```

## 参考リンク

- Docker Desktop公式サイト: https://www.docker.com/products/docker-desktop/
- Docker公式ドキュメント: https://docs.docker.com/
- Docker Compose公式ドキュメント: https://docs.docker.com/compose/

