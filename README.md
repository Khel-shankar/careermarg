# CareerMarg — Complete Career Guidance Platform
## 🚀 Production Launch Pack & Setup Guide

> **CareerMarg** is an enterprise-grade, psychometrically backed Career Counseling and Guidance Platform tailored for Indian students (Class 8 to Post-Graduation and Working Professionals).  
> It integrates standard **Holland RIASEC** interest profiling, **NCERT Tamanna 7-Domain Aptitude Battery**, **Big Five (OCEAN)** personality traits, and a curated library of **928+ verified Indian career pathways** with live roadmaps, salary projections, entrance exam trackers, and industry mentorship modules.

---

## 📁 1. Launch Pack Directory Structure

This folder contains **only the clean production files** needed to run and host the application anywhere without extra clutter or build steps:

```
CareerMarg_Launch_Pack/
│
├── README.md                  # This complete setup and architecture guide
├── index.html                 # Main Single Page Application (SPA) entry point
│
├── css/
│   └── styles.css             # Unified responsive design system (Mobile-First + Desktop)
│
├── js/
│   ├── app.js                 # Core SPA Controller, State Manager, Router, & UI Views
│   ├── data.js                # Core archetypes, streams, and role models metadata
│   ├── assessmentData.js      # 5-Tier comprehensive psychometric question banks
│   ├── careerDatabase.js      # 928+ Indian career catalog (Salaries, Exams, Roadmaps)
│   ├── scoring.js             # Holland RIASEC & Tamanna aptitude scoring engines
│   └── art.js                 # Custom SVG illustrations and UI graphics
│
├── api/                       # Lightweight, secure PHP REST API layer (Zero framework bloat)
│   ├── db.php                 # MySQL PDO singleton database connection handler
│   ├── auth.php               # User registration, bcrypt authentication, & sessions
│   ├── sync.php               # Real-time synchronization for tests, traits, & saved careers
│   ├── careers.php            # Master career library search & sector filter API
│   └── assessments.php        # Assessment question bank endpoint
│
├── img/                       # Brand and UI SVG textures
│   ├── grain.svg
│   └── topo.svg
│
└── database/
    └── career_guidance_db.sql # Complete MySQL database schema + pre-seeded catalog
```

---

## ⚡ 2. Quick Setup & Deployment Guide (3 Simple Steps)

### Prerequisites:
- Any Web Server with PHP 7.4+ or 8.x (e.g., **XAMPP**, **WAMP**, **cPanel**, **Hostinger**, **AWS**, or **Docker**).
- MySQL 5.7+ or MariaDB 10.3+.

---

### Step 1: Deploy Files to Web Root
* **For Local XAMPP/WAMP**:
  Copy the `CareerMarg_Launch_Pack` folder into your server's web directory:
  - Windows XAMPP: `C:\xampp\htdocs\CareerMarg_Launch_Pack\`
  - Mac/Linux: `/opt/lampp/htdocs/CareerMarg_Launch_Pack/`
* **For Live Web Hosting (cPanel / Hostinger / Cloud)**:
  Upload all contents of `CareerMarg_Launch_Pack` directly into `public_html/` (or a subdirectory like `public_html/guidance/`).

---

### Step 2: Import the Database
1. Open **phpMyAdmin** in your browser (`http://localhost/phpmyadmin/` or via your cPanel).
2. Click **Databases** tab and create a new database:
   - Database Name: `career_guidance_db`
   - Collation: `utf8mb4_unicode_ci`
3. Click on the newly created `career_guidance_db` database on the left sidebar.
4. Go to the **Import** tab at the top.
5. Click **Choose File** and select:
   `CareerMarg_Launch_Pack/database/career_guidance_db.sql`
6. Click **Import** (or **Go**) at the bottom.
   > ✅ All required tables (`users`, `careers`, `assessment_questions`, `student_assessment_sessions`, `student_trait_scores`, `student_career_matches`, `student_reports`) will be created and populated automatically.

---

### Step 3: Configure Database Connection
Open `api/db.php` in any code or text editor and verify the database connection constants:

```php
// api/db.php
define('DB_HOST', '127.0.0.1');              // Usually 'localhost' or '127.0.0.1'
define('DB_PORT', '3306');                   // Default MySQL port
define('DB_NAME', 'career_guidance_db');     // Database name created in Step 2
define('DB_USER', 'root');                   // Your MySQL username (e.g., 'root' or cPanel db user)
define('DB_PASS', '');                       // Your MySQL password (empty by default in XAMPP)
```

---

### Step 4: Open and Launch!
Open your browser and navigate to:
```
http://localhost/CareerMarg_Launch_Pack/
```
*(Or your live domain URL, e.g., `https://yourdomain.com/`)*

You can now:
1. Click **"Get Started Free"** or **"Sign In / Create Account"**.
2. Create a new student account (or sign into an existing one).
3. Set your education level (e.g., Class 10, Class 12, UG, or After PG).
4. Take the psychometric assessments.
5. Explore the 928+ career library, compare career options side-by-side, finalize your dream goal (e.g., *Senior Developer (Java)*), view the step-by-step roadmap, and request mentorship!

---

## 🗄️ 3. Database Schema & Data Integration (How It Works)

The database `career_guidance_db` automatically captures every user activity:

| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| **`users`** | Student accounts, authentication credentials, profile info, saved career vault, and finalized goal. | `id`, `email`, `password_hash` (bcrypt), `full_name`, `grade_level`, `education_status`, `school_name`, `stream`, `role_model_archetype`, `saved_careers` (JSON), `finalized_career` |
| **`student_assessment_sessions`** | Tracks test progress and records raw answers question by question. | `id`, `user_id`, `tier_code` (`tier1_riasec`, `tier2_tamanna` etc.), `status`, `responses_json`, `time_spent_seconds` |
| **`student_trait_scores`** | Psychometric Holland interest scores (RIASEC), Tamanna aptitude scores, and Big Five personality traits. | `id`, `user_id`, `holland_r`, `holland_i`, `holland_a`, `holland_s`, `holland_e`, `holland_c`, `tamanna_la` to `tamanna_ar`, `ocean_o` to `ocean_n`, `all_scores_json` |
| **`student_career_matches`** | Personalized recommendations generated by the matching algorithm. | `id`, `user_id`, `matches_json` (array of top careers with match %, rank, and why-reasons) |
| **`student_reports`** | Complete multi-dimensional diagnostic report cards. | `id`, `user_id`, `report_summary`, `strengths_json`, `growth_areas_json`, `top_career_recommendations` |
| **`careers`** | Master library of 928+ verified careers. | `id`, `title`, `title_hi`, `sector_id`, `min_salary_lpa`, `max_salary_lpa`, `educational_requirements`, `entrance_exams` |
| **`assessment_questions`** | Complete 5-tier question bank in English and Hindi. | `id`, `tier_code`, `trait_code`, `question_text_en`, `question_text_hi`, `options_json` |

---

## 🔄 4. Live Data Sync Flow (Frontend ⟷ Backend)

1. **User Interaction**: Student clicks or fills a form in `index.html`.
2. **Client State**: `js/app.js` updates `App.state` instantly so the UI responds with zero lag.
3. **API Call**: JavaScript issues an asynchronous `fetch()` POST request to `api/sync.php` or `api/auth.php` carrying clean JSON payloads.
4. **Backend Processing**: The PHP endpoints validate and sanitize inputs, using **PDO Prepared Statements** to safely execute `INSERT` or `UPDATE` queries on MySQL.
5. **Session Persistence**: Data is saved both in MySQL and in client `localStorage`, enabling continuous work even if the network fluctuates.

---

## 📱 5. Responsive Multi-Device Design

CareerMarg is engineered with a **Mobile-First Responsive Architecture**:
* **Mobile Phones (360px – 480px)**:
  - Native-app style **Sticky Bottom Navigation** (`Home`, `Tests`, `Report`, `Explore`, `Profile`) designed for thumb reach.
  - Large touch-target cards for assessment questions (no small radio buttons).
  - Modal windows fluidly scale to `calc(100% - 24px)` to avoid overflow.
  - Multi-career comparison automatically switches into a responsive card matrix.
* **Tablets (768px – 1024px)**:
  - 2-column adaptive layout with flexible grid breakpoints.
* **Laptops & Desktops (1200px+)**:
  - Comprehensive sidebar navigation, multi-stage journey compass, and side-by-side career analytics cards.

---

## 🔒 6. Security & Performance Highlights

* **Password Security**: Passwords are encrypted using PHP's native `password_hash($pass, PASSWORD_BCRYPT)` with salt. Plaintext passwords are never stored.
* **SQL Injection Protection**: 100% of database interactions use **PDO Prepared Statements** with bound parameters (`$stmt->execute([':user_id' => ...])`).
* **Zero Heavy Framework Bloat**: No Node.js build processes, webpack bundles, or bulky external dependencies. Loads in sub-second times on any shared hosting or basic server.
* **Bilingual Support**: Assessment questions and career details are pre-configured with Hindi (`_hi`) and English translations.

---

## 🛠️ 7. Common Troubleshooting

* **Issue**: *"Database connection failed / PDOException"*
  - **Solution**: Open `api/db.php`. Ensure MySQL is running and verify that `DB_NAME`, `DB_USER`, and `DB_PASS` match your MySQL setup.
* **Issue**: *"CORS or 404 error when clicking buttons"*
  - **Solution**: Ensure you are running the project through a web server (`http://localhost/...`), not by double-clicking `file:///index.html`. PHP scripts require an active web server to execute.
* **Issue**: *"Changes in CSS or JS not showing"*
  - **Solution**: Clear browser cache or press `Ctrl + F5` (Windows) / `Cmd + Shift + R` (Mac).

---

## 📄 License & Credits
- Built with Vanilla JavaScript, Modern CSS3, and PHP PDO.
- Standard Psychometric Models: Holland RIASEC & NCERT Tamanna.
- Designed for Career Counseling, Schools, Colleges, and Educational Portals.
