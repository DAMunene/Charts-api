# Use the appropriate base image
FROM python:3.10

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file first to leverage Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run your application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
