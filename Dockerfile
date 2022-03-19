FROM ubuntu:20.04
# Устанавливаем локальное время (были проблемы при установке пакетов)
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# Устанавливае wget
RUN apt-get update && apt-get install -y wget
# Получаем нужную Ноду из бинарников
RUN wget https://nodejs.org/dist/latest-v16.x/node-v16.14.2-linux-x64.tar.gz
RUN tar -C /usr/local --strip-components 1 -xf ./node-v16.14.2-linux-x64.tar.gz
RUN node -v
# Устанавливаем npm (на всякий случай, дальше поставим yarn)
RUN apt install -y npm
# Устанавливаем CURL
RUN apt install -y curl
# Устанавливаем yarn
RUN apt remove yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install yarn
# Создаем рабочий каталог
WORKDIR /var/www
COPY package.json ./
RUN yarn
COPY . .
# Порт и запуск сервера
EXPOSE 8080
CMD node index.ts --bind 0.0.0.0:$PORT
