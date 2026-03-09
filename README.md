# WARD.GG

Ward.GG is a League of Legends statistics web application inspired by U.GG. It aims to provide real-time stats breakdowns, win rate trends, champion mastery, and detailed match history for players across all major regions.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** PHP 8.2+
- **Database:** MySQL 8.0
- **Infrastructure:** Docker & Docker Compose
- **Dependency Management:** Composer

### 🛠️ Installation

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

### Now
- [ ] Update `ApiClient` constructor to accept `$location` and build the correct base URL from it dynamically.
- [ ] Build out `getEndpoint()` in `src/Config/endpoints.php` with all needed cases — account, summoner, match list, match, rank, live game.
- [ ] Fix `getEndpoint()` to use default null parameters so you only pass what each case actually needs.
- [ ] Chain the full API flow in `test.php`: Riot ID → puuid → match IDs → single match data.

### Backend / API
- [ ] Move working API logic from `test.php` into `StatsController.php`.
- [ ] Set up `src/includes/db.php` with MySQL connection using credentials from `.env`.
- [ ] Design database schema in `docker/sql/init.sql` — summoners, matches, cached responses.
- [ ] Build out `public/api.php` as the endpoint the frontend JS will call.
- [ ] Add caching — store API responses in the database and only re-fetch after a few minutes to respect rate limits.

### Frontend / UI
- [ ] Write `public/js/main.js` — hook up the search button to call `api.php` and redirect to `stats.html`.
- [ ] Build out `stats.html` and `stats.css` with real data from the API.
- [ ] Connect the live stats ticker to a dynamic data source.
- [ ] Add navigation links for Builds and Tier Lists.
- [ ] Replace the notification SVG icon with a PNG.
- [ ] Implement the notifications UI panel.
- [ ] Place a shadow/overlay div over the hero background image.
- [ ] Redo hero-glow.
- [ ] Recreate UI in Figma for teacher.

### Infrastructure & Miscellaneous
- [ ] Finalize the CI/CD pipeline in `.github/workflows/deploy.yml`.
- [ ] Update the deploy path in `deploy.yml` from `/path/to/your/Ward/project` to the real VPS path.
- [ ] Remove `version: '3.8'` from `docker-compose.yml` to fix the obsolete warning.