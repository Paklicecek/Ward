# WARD.GG

WARD.GG is a League of Legends statistics web application inspired by u.gg. It aims to provide real-time stats breakdowns, win rate trends, champion mastery, and detailed match history for players across all major regions.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** PHP 8.2+
- **Database:** MySQL 8.0
- **Infrastructure:** Docker & Docker Compose
- **Dependency Management:** Composer

## 📦 Project Structure

- `public/`: Frontend assets (HTML, CSS, JS).
- `src/`: Backend logic, including database configuration (`db.php`) and Riot API integrations (`riot.php`).
- `docker/`: Docker configuration files (`Dockerfile`) and SQL initialization scripts (`init.sql`).

## 🛠️ Getting Started

### Prerequisites
- Docker & Docker Compose

### Installation

1. Clone the repository.
2. Create your `.env` file by copying the example file:
   ```bash
   cp .env.example .env
   ```
3. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```
4. Access the application in your browser at `http://localhost:8000`.

## 📝 To-Do List

### Frontend / UI
- [ ] Add navigation links for **Builds** and **Tier Lists**.
- [ ] Replace the notification SVG icon with a PNG image (as noted in HTML comments).
- [ ] Implement the UI panel for opening notifications.
- [ ] Connect the live stats ticker to a dynamic data source (currently using placeholder data).
- [ ] Place a shadow/div over the background-image for hero-bg.
- [ ] Redo hero-glow.
- [ ] Change the AI slop classes.
- [ ] Recreate UI in figma for teacher.

### Backend / API
- [ ] Implement Riot Games API integration in `src/api/riot.php`.
- [ ] Set up the database connection logic in `src/includes/db.php`.
- [ ] Design and populate the initial database schema in `docker/sql/init.sql`.
- [ ] Create backend endpoints to handle summoner searches and serve match data to the frontend.

### Infrastructure & Miscellaneous
- [ ] Finalize the CI/CD pipeline setup in `.github/workflows/deploy.yml`.
- [ ] Add caching for Riot API calls to improve latency and respect rate limits.
