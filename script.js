// ============================================================
// RECOMMENDATION DATA
// Each category has an array of video objects with title,
// description, and a "why you'll like it" message.
// ============================================================

var recommendations = {
    gaming: [
        {
            title: "Top 10 Open-World Adventures You Missed",
            description: "A countdown of hidden gem open-world games that deserve way more attention from the gaming community.",
            whyYoullLikeIt: "If you love exploring massive worlds without a guide, this list will keep you busy for months."
        },
        {
            title: "Building a Castle in 60 Minutes – Speed Build Challenge",
            description: "Watch a player construct an epic medieval castle from scratch in a creative sandbox game under a strict time limit.",
            whyYoullLikeIt: "It's satisfying, creative, and might inspire your next build session."
        },
        {
            title: "Beginner to Pro: FPS Aim Training Guide",
            description: "A step-by-step guide to improving your aim in first-person shooter games using free training tools.",
            whyYoullLikeIt: "You'll notice real improvement after just a few practice sessions with these tips."
        }
    ],
    music: [
        {
            title: "Making a Beat from Scratch in 10 Minutes",
            description: "A producer shows how to create a chill lo-fi beat using only free software and a laptop.",
            whyYoullLikeIt: "Even if you've never made music, you'll want to try after watching this."
        },
        {
            title: "Street Musicians Who Stopped Entire Crowds",
            description: "A compilation of incredible street performances captured by passersby around the world.",
            whyYoullLikeIt: "Pure, unfiltered talent that reminds you why live music hits different."
        },
        {
            title: "The Science of Why Some Songs Get Stuck in Your Head",
            description: "An entertaining breakdown of what makes certain melodies so catchy, featuring fun musical examples.",
            whyYoullLikeIt: "You'll finally understand why you can't stop humming that one tune."
        }
    ],
    education: [
        {
            title: "How Bridges Stay Up – Engineering Explained Simply",
            description: "A visual explanation of the physics behind different bridge designs, using everyday examples.",
            whyYoullLikeIt: "Complex engineering made so simple you'll feel like an expert by the end."
        },
        {
            title: "Learn Basic Spanish in 20 Minutes",
            description: "A quick crash course covering greetings, common phrases, and pronunciation tips for absolute beginners.",
            whyYoullLikeIt: "You'll be able to hold a short conversation on your next trip."
        },
        {
            title: "Why Do We Dream? – The Psychology Behind Sleep",
            description: "An animated explainer covering the leading scientific theories about why humans dream.",
            whyYoullLikeIt: "Perfect for the curious mind who thinks about weird questions before falling asleep."
        }
    ],
    vlog: [
        {
            title: "A Day in the Life of a University Student in London",
            description: "Follow a student through lectures, study sessions, and exploring the city on a budget.",
            whyYoullLikeIt: "It's relatable, calming, and full of practical student life tips."
        },
        {
            title: "I Tried Waking Up at 5 AM for 30 Days – Here's What Happened",
            description: "A personal experiment documenting the effects of an early morning routine on productivity and mood.",
            whyYoullLikeIt: "Honest results without the hustle-culture hype – refreshingly real."
        },
        {
            title: "Moving to a New City Alone – My First Week",
            description: "A vlogger documents the highs and lows of relocating to a city where they know nobody.",
            whyYoullLikeIt: "Anyone who has started fresh somewhere will feel seen watching this."
        }
    ],
    "tech-review": [
        {
            title: "Best Budget Laptops for Students (2024 Edition)",
            description: "A comparison of five affordable laptops tested for schoolwork, browsing, and light creative tasks.",
            whyYoullLikeIt: "Saves you hours of research – the top pick is genuinely surprising."
        },
        {
            title: "Is This the Best Smartphone Camera Ever?",
            description: "A deep-dive photo and video test of the latest flagship phone camera in real-world conditions.",
            whyYoullLikeIt: "The side-by-side comparisons make it super easy to see the difference."
        },
        {
            title: "Wireless Earbuds Under $50 – Which Ones Are Actually Good?",
            description: "Six popular budget earbuds rated on sound quality, comfort, battery life, and mic performance.",
            whyYoullLikeIt: "Great audio doesn't have to cost a fortune, and this proves it."
        }
    ]
};

// ============================================================
// DOM REFERENCES
// ============================================================

var categoryButtons = document.querySelectorAll(".category-btn");
var recommendBtn = document.getElementById("recommendBtn");
var errorMessage = document.getElementById("errorMessage");
var resultSection = document.getElementById("resultSection");
var resultCategory = document.getElementById("resultCategory");
var videoTitle = document.getElementById("videoTitle");
var videoDescription = document.getElementById("videoDescription");
var whyText = document.getElementById("whyText");
var userNameInput = document.getElementById("userName");

// Tracks which category the user selected
var selectedCategory = null;

// ============================================================
// CATEGORY BUTTON HANDLING
// Clicking a category button marks it as active and stores
// the selected category value.
// ============================================================

function handleCategoryClick(event) {
    // Remove active class from all buttons
    for (var i = 0; i < categoryButtons.length; i++) {
        categoryButtons[i].classList.remove("active");
    }
    // Activate the clicked button
    event.currentTarget.classList.add("active");
    selectedCategory = event.currentTarget.getAttribute("data-category");

    // Clear any existing error message once a category is picked
    errorMessage.textContent = "";
}

// Attach click listeners to every category button
for (var i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener("click", handleCategoryClick);
}

// ============================================================
// GET RECOMMENDATION
// Uses if/else to validate input and switch to pick the
// correct category array, then randomly selects one item.
// ============================================================

function getRecommendation() {
    // --- Input Validation ---
    if (selectedCategory === null) {
        errorMessage.textContent = "Please pick a category first.";
        resultSection.classList.add("hidden");
        return; // Stop here, nothing more to do
    }

    // --- Determine category using switch ---
    var categoryList;

    switch (selectedCategory) {
        case "gaming":
            categoryList = recommendations.gaming;
            break;
        case "music":
            categoryList = recommendations.music;
            break;
        case "education":
            categoryList = recommendations.education;
            break;
        case "vlog":
            categoryList = recommendations.vlog;
            break;
        case "tech-review":
            categoryList = recommendations["tech-review"];
            break;
        default:
            // Handle unexpected category values
            errorMessage.textContent = "Oops! That category isn't available. Please pick another one.";
            resultSection.classList.add("hidden");
            return;
    }

    // --- Random Selection ---
    var randomIndex = Math.floor(Math.random() * categoryList.length);
    var pick = categoryList[randomIndex];

    // --- Personalization ---
    var name = userNameInput.value.trim();

    if (name !== "") {
        videoTitle.textContent = "Hey " + name + ", check this out!";
    } else {
        videoTitle.textContent = "";
    }

    // --- Display Result ---
    errorMessage.textContent = "";
    resultCategory.textContent = selectedCategory.replace("-", " ");
    // Title shown after personal greeting (or as the first line)
    if (name !== "") {
        videoTitle.textContent = "Hey " + name + ", check this out!";
        videoDescription.textContent = pick.title + " — " + pick.description;
    } else {
        videoTitle.textContent = pick.title;
        videoDescription.textContent = pick.description;
    }
    whyText.textContent = pick.whyYoullLikeIt;

    // Show the result card with a fade-in animation
    resultSection.classList.remove("hidden");

    // Re-trigger the animation by removing and re-adding the class
    var card = resultSection.querySelector(".result-card");
    card.classList.remove("fade-in");
    // Force a browser reflow so the animation restarts
    void card.offsetWidth;
    card.classList.add("fade-in");
}

// Attach click listener to the Recommend button
recommendBtn.addEventListener("click", getRecommendation);