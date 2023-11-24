# Use the official Node.js image as the base image
FROM node:20.9-bullseye

# Set the working directory
WORKDIR /app

# Copy the contents of the ../stadium-app/ into the container
# https://www.jamestharpe.com/docker-include-files-outside-build-context/
COPY . .

# Make the script executable
RUN chmod +x /app/devops/entrypoint.sh

# Install dependencies
RUN npm install

# Expose the port (if needed)
EXPOSE 5173

# Run the entrypoint script as the main command
CMD ["/app/devops/entrypoint.sh"]