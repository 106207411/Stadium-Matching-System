# Use the official Node.js image as the base image
FROM node:20.9-bullseye

# Set the working directory
WORKDIR /app

# Copy the contents of the ../stadium-app/ into the container
# https://www.jamestharpe.com/docker-include-files-outside-build-context/
COPY . .

# Install the dependencies
# https://stackoverflow.com/questions/75883720/504-outdated-optimize-dep-while-using-react-vite
RUN npm install && \
    rm -rf /app/stadium-app/node_modules/.vite/ && \
    npm cache clean --force && \
    npm i

# Expose the port (if needed)
EXPOSE 5173

# Run the application
ENTRYPOINT ["npm", "run", "dev"]