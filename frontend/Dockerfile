FROM node:18-alpine

WORKDIR /Data-sharing-contract-compliance-UI

# COPY next.config.js ./next.config.js

# COPY pages ./pages

# COPY public ./public

# COPY styles ./styles
COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
