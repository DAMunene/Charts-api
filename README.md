# Next.js Dashboard with Django API Project

This project consists of a Next.js frontend dashboard application showing different charts: Candlestick chart, Linechart, Barchart, Piechart and a Django backend API that serves data to my frontend application

## Setup and Running the Application

### Frontend (Next.js Dashboard)

1. Navigate to the project directory:
   ```
   cd Charts-api

   cd dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

### Backend (Django API)

1. Navigate to the backend directory:
   ```
   cd Charts-api
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```
5. Run tests:
   ```
   python manage.py test
   ```

6. Start the Django development server:
   ```
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000`.

## Libraries and Tools Used

### Frontend
- Next.js 14.2.8
- React 18
- React DOM 18
- Recharts 2.12.7
- TypeScript 5
- ESLint 8
- Tailwind CSS 3.4.1

### Backend
- Django (version specified in requirements.txt)
- Other dependencies as listed in requirements.txt

## Approach and Thought Process

This project combines a Next.js frontend for a dynamic and responsive dashboard with a Django backend API for data visualization. 

In the Django API, I started with registering my app(charts) and other third party apps like django restframework that I would be using to build my RESTAPI and corheaders to allow for cross-origin requests from my frontend application in the settings.py file. Next was to create API endpoints in my views.py returning Json reponses for my frontend application to consume and then finally created a urls.py file to map my api endpoints to urls.

Nextjs was used for my frontend application. I created the dashboard app using the global npm package(npx-create-app) and then added the Recharts library to create interactive and visually appealing data visualization charts in the dashboard. I also used the TypeScript language to add type safety to my code and the ESLint linter to ensure code quality. I customized the candlestick chart to display the open, close, high, and low values in a visually appealing manner since the recharts library does not provide this functionality out of the box.

The separation of frontend and backend allows for independent scaling and maintenance of each part of the application, while the use of a RESTful API lets the frontend application communicate with the backend API.

I used Tailwind CSS for rapid UI development and consistent styling across the application. 

This approach allows for a clean and organized codebase, making it easier to maintain and scale the application.