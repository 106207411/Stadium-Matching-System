# Stage 1: Build stage
FROM node:20.9-bullseye AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the contents of the ../stadium-app/ into the container
# https://www.jamestharpe.com/docker-include-files-outside-build-context/
COPY . .

# Build the application and generate node_modules/.vite/
RUN npm run dev

# Stage 2: Run stage
FROM node:20.9-bullseye

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Remove the node_modules/.vite/ folder
# https://stackoverflow.com/questions/75883720/504-outdated-optimize-dep-while-using-react-vite
RUN rm -rf /app/node_modules/.vite/ && \
    npm cache clean --force && \
    npm i

# Expose the port (if needed)
EXPOSE 5173

# Run the application
ENTRYPOINT ["npm", "run", "dev"]