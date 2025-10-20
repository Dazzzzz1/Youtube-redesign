import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    root: 'src',  // Корень проекта — src
    server: {
        open: '/index.html'  // Открывать index.html при запуске dev-сервера
    },
    build: {
        outDir: '../dist',  // Вывод сборки в ../dist (корневая dist)
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/index.html'),  // Основная страница
                channel: path.resolve(__dirname, 'src/channelPage.html')  // Дополнительная страница
                // Добавьте здесь другие HTML, если появятся, например:
                // another: path.resolve(__dirname, 'src/anotherPage.html')
            }
        }
    },
    // publicDir: '../public'  // Закомментируйте или удалите, если public не используется
    // Или установите publicDir: false, если нет статических ассетов вне src
})