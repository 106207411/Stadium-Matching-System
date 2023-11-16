# Use the official Node.js image as the base image
FROM node:20.9-bullseye

# Set the working directory
WORKDIR /app

# Copy the contents of the FE repository into the container
COPY ../stadium-app/* .

# Install the dependencies
RUN npm install

# Expose the port (if needed)
EXPOSE 5173

# Run the application
ENTRYPOINT ["npm", "run", "dev"]

# # Start a bash shell when the container is run
# CMD ["/bin/bash"]
