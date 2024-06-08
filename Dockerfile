FROM node:20-bookworm

ENV filePath "test"

COPY ./app.js /app/app.js
COPY ./package.json /app/package.json

WORKDIR /app
RUN npm install

ENTRYPOINT ["node", "/app/app.js"]

CMD ["file"]

