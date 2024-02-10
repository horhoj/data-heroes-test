# Тестовое по созданию фан сайта оп рикки и морти

Выполнил для вашей компании, срок выполнения около 11 часов

# Демо

https://data-heroes-test.vercel.app/

# Используется: 

vite, vue, typescript, docker(docker-compose), nginx (для раздачи статики билда), eslint + prettier

# запуск

npm i

npm run dev

# запуск в докере (протестировано только на линукс, нужны make, docker, docker-compose)

запуск в режиме разработки (порт 3000)

make ddev

запуск в режиме раздачи билда через nginx (порт 80)

make init


разумеется порты можно поменять в настройках