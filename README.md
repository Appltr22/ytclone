# YT Picks — YouTube Recommendation Assistant

## What It Does

YT Picks is a polished interactive web application inspired by video platforms. It recommends videos based on the category you choose, with a modern dark-themed design, interactive cards, smooth animations, and personalized greetings.

You enter your name optionally, select a category (Gaming, Music, Education, Vlog, or Tech Review), and the app recommends a video with a rich card showing the title, creator, duration, description, and a "Why you'll like it" explanation. Use Pick Again for more options, or Surprise Me for a random discovery.

## Technologies Used

- **HTML** — semantic page structure with hero, cards, and recommendation sections
- **CSS** — dark-first design system, animations, responsive layout, category visuals
- **Vanilla JavaScript** — state management, recommendation logic, animations, validation

No frameworks, libraries, APIs, or external services.

## Key Features

- Dark modern interface with YouTube-inspired red accent (#FF0000)
- Interactive category cards with hover and selection states
- Optional name personalization with dynamic greeting
- Recommendation transition with loading state and smooth reveal
- Rich video recommendation cards with category thumbnails
- Pick Again with duplicate prevention (won't repeat immediately)
- Surprise Me for random category + recommendation discovery
- Pick counter tracking recommendations generated
- Responsive design for desktop, tablet, and mobile
- Keyboard-accessible category selection with visible focus states
- Empty state and inline error handling (no alert() used)

## How the Program Works

1. User optionally enters their name.
2. User selects a category from interactive cards.
3. User clicks **Recommend for Me**.
4. JavaScript validates that a category is selected (shows inline error if not).
5. A `switch` statement maps the category to the correct recommendation array.
6. A random recommendation is selected (with duplicate prevention for Pick Again).
7. A brief "Finding something for you..." transition plays.
8. The recommendation card reveals with title, creator, duration, description, thumbnail, and why-text.
9. **Pick Again** generates a new random pick. **Surprise Me** picks a random category and generates a recommendation.

## How to Run

Open `index.html` in a web browser. No installation or setup needed.