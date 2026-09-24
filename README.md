# YT Picks — YouTube Recommendation Assistant

## What It Does

YT Picks is a simple interactive web application that recommends videos based on the category you choose. It is inspired by YouTube's recommendation system.

You select a category (Gaming, Music, Education, Vlog, or Tech Review), and the app randomly suggests a video with a title, description, and a reason you might enjoy it. Optionally, enter your name and the result will be personalized.

## Technologies Used

- **HTML** — page structure
- **CSS** — styling and layout
- **JavaScript** (vanilla) — logic, validation, and interactivity

No frameworks, libraries, or external services are used.

## How the Program Works

1. The user optionally enters their name.
2. The user selects a video category by clicking a category button.
3. The user clicks "Get Recommendation".
4. JavaScript validates that a category was selected.
5. A `switch` statement determines which category array to use.
6. A random video is picked from that array using `Math.random()`.
7. The result is displayed in a styled card on the page.
8. If a name was entered, the recommendation is personalized.

## How to Run

Open `index.html` in a web browser. No installation or setup is needed.