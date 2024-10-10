# Running the Application

To run the application, follow these steps:

**Step 1: Fill up the root .env file**

Create a new file named `.env` in the root directory of your project. Fill in the necessary environment variables as follows:

```
# PostgreSQL
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
POSTGRES_PORT=5432

# NestJS
DATABASE_URL=postgresql://your_db_user:your_db_password@db:5432/your_db_name?schema=public
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY="c534af123a4763286c53d01fb3e90663"

# Next.js
API_URL="http://backend:3001"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Replace `your_db_user`, `your_db_password`, `your_db_name`, and `your_jwt_secret` with your actual database credentials and JWT secret.

**Step 2: Use docker-compose**

Make sure you have Docker and Docker Compose installed on your system. Then, navigate to the root directory of your project and run the following command:

```
docker-compose up
```

This will start the application containers. You can access the Next.js frontend at `http://localhost:3000` and the NestJS backend at `http://localhost:3001`.

**Troubleshooting**

If you encounter any issues during the setup process, refer to the Docker and Docker Compose documentation for troubleshooting tips. Additionally, ensure that your environment variables are correctly set in the `.env` file.
