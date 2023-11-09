# Stadium App
## Folder Structure
1. `/src/components`: 主要放一些會重複使用的元件，例如 `<Headerbar>, <FooterBar>` 等，獨立出來寫的好處是不用在各個頁面都寫一次，可以重複使用。
2. `/src/pages`: 各個頁面的檔案，基本上一個頁面一個檔案，可以由 `components` 組合成。
3. `/src/api`: 放跟後端 API 串接的一些 function handler。
4. `/src/config`: 放一些 config 變數的檔案，暫時用的，之後考慮 12-factor 會用雲服務來取代。
5. `/src/context`: 處理權限驗證，要實作 session/token, 登入/註冊/登出等功能會在這處理。
6. `/src/assets`: 放靜態檔案，例如圖片。
7. `App.jsx`: 程式進入點，要新增畫面記得要在這裡 `import` 對應的 `/page` 並塞到一個 `<Route>` 中。

## How to start
### Local (Recommend)
1. Make sure you have `Node.js` environment, prefered version `20.9.0`.
2. Clone the repo.
```
git clone https://github.com/106207411/Stadium-Matching-System.git
```
3. `cd stadium-app && npm install`
4. `npm run dev`
5. Web page can be seen in `localhost:5173`.

### Docker
1. Make sure you have Docker Desktop in local and execute it in daemon.
2. Clone the repo.
```
git clone https://github.com/106207411/Stadium-Matching-System.git
```
3. Get the FE repo path.
```
cd stadium-app && pwd
```
4. Use `docker run` to mount the FE repository into container.
```
docker run -v <FE_repo_path>:/etc/stadium-app -p 5173:5173 -it node:20.9-bullseye /bin/bash
```
5. In docker:
```
cd /etc/stadium-app && npm install
npm run dev
```
6. Web page can be seen in `localhost:5173`.
