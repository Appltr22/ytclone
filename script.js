// ============================================================
// RECOMMENDATION DATA
// Multiple recommendation options for every category.
// Each recommendation includes title, description, creator,
// duration, why the user will like it, and category.
// ============================================================

var recommendations = {
    gaming: [
        {
            title: "Minecraft Survival But Everything Is Random",
            description: "Explore a chaotic Minecraft survival challenge where every decision changes the entire run.",
            creator: "PixelForge",
            duration: "18 min",
            whyYoullLikeIt: "Perfect if you enjoy unpredictable gameplay and funny, unscripted moments."
        },
        {
            title: "Top 10 Open-World Adventures You Missed",
            description: "A countdown of hidden gem open-world games that deserve way more attention from the gaming community.",
            creator: "GameVault",
            duration: "22 min",
            whyYoullLikeIt: "If you love exploring massive worlds without a guide, this list will keep you busy for months."
        },
        {
            title: "Building a Castle in 60 Minutes — Speed Build Challenge",
            description: "Watch a player construct an epic medieval castle from scratch in a creative sandbox game under a strict time limit.",
            creator: "CraftWorks",
            duration: "14 min",
            whyYoullLikeIt: "It's satisfying, creative, and might inspire your next build session."
        },
        {
            title: "Beginner to Pro: FPS Aim Training Guide",
            description: "A step-by-step guide to improving your aim in first-person shooter games using free training tools.",
            creator: "AimPro",
            duration: "15 min",
            whyYoullLikeIt: "You'll notice real improvement after just a few practice sessions with these tips."
        },
        {
            title: "The Most Creative Game Mods of 2024",
            description: "A showcase of the most innovative and visually stunning game modifications released this year.",
            creator: "ModCentral",
            duration: "20 min",
            whyYoullLikeIt: "If you enjoy pushing the boundaries of what games can look and feel like."
        }
    ],
    music: [
        {
            title: "Making a Beat from Scratch in 10 Minutes",
            description: "A producer shows how to create a chill lo-fi beat using only free software and a laptop.",
            creator: "SoundLab",
            duration: "10 min",
            whyYoullLikeIt: "Even if you've never made music, you'll want to try after watching this."
        },
        {
            title: "Street Musicians Who Stopped Entire Crowds",
            description: "A compilation of incredible street performances captured by passersby around the world.",
            creator: "LiveSound",
            duration: "25 min",
            whyYoullLikeIt: "Pure, unfiltered talent that reminds you why live music hits different."
        },
        {
            title: "The Science of Why Some Songs Get Stuck in Your Head",
            description: "An entertaining breakdown of what makes certain melodies so catchy, featuring fun musical examples.",
            creator: "MusicTheory",
            duration: "16 min",
            whyYoullLikeIt: "You'll finally understand why you can't stop humming that one tune."
        },
        {
            title: "Top 5 Hidden Music Scenes Around the World",
            description: "A journey through underground music communities you probably didn't know existed.",
            creator: "WorldSound",
            duration: "28 min",
            whyYoullLikeIt: "Discover sounds and cultures that open your musical perspective."
        },
        {
            title: "How to Read Music Without Years of Practice",
            description: "A practical tutorial on recognizing patterns in sheet music quickly and intuitively.",
            creator: "NoteWise",
            duration: "12 min",
            whyYoullLikeIt: "Great for anyone who wants to understand music without a full degree."
        }
    ],
    education: [
        {
            title: "How Bridges Stay Up — Engineering Explained Simply",
            description: "A visual explanation of the physics behind different bridge designs, using everyday examples.",
            creator: "EngineeringMadeSimple",
            duration: "14 min",
            whyYoullLikeIt: "Complex engineering made so simple you'll feel like an expert by the end."
        },
        {
            title: "Learn Basic Spanish in 20 Minutes",
            description: "A quick crash course covering greetings, common phrases, and pronunciation tips for absolute beginners.",
            creator: "LanguageLeap",
            duration: "20 min",
            whyYoullLikeIt: "You'll be able to hold a short conversation on your next trip."
        },
        {
            title: "Why Do We Dream? — The Psychology Behind Sleep",
            description: "An animated explainer covering the leading scientific theories about why humans dream.",
            creator: "MindWorks",
            duration: "17 min",
            whyYoullLikeIt: "Perfect for the curious mind who thinks about weird questions before falling asleep."
        },
        {
            title: "The Hidden Math of Everyday Life",
            description: "How math silently powers everything from traffic patterns to your favorite music.",
            creator: "MathVision",
            duration: "19 min",
            whyYoullLikeIt: "Transforms how you see the ordinary world in a truly fascinating way."
        },
        {
            title: "How Ancient Civilizations Built Without Modern Tools",
            description: "Exploring the engineering marvels of ancient societies and how they achieved massive structures.",
            creator: "HistoryInDepth",
            duration: "23 min",
            whyYoullLikeIt: "A fascinating look at human ingenuity that will leave you impressed."
        }
    ],
    vlog: [
        {
            title: "A Day in the Life of a University Student in London",
            description: "Follow a student through lectures, study sessions, and exploring the city on a budget.",
            creator: "StudentLife",
            duration: "15 min",
            whyYoullLikeIt: "It's relatable, calming, and full of practical student life tips."
        },
        {
            title: "I Tried Waking Up at 5 AM for 30 Days — Here's What Happened",
            description: "A personal experiment documenting the effects of an early morning routine on productivity and mood.",
            creator: "DailyTest",
            duration: "18 min",
            whyYoullLikeIt: "Honest results without the hustle-culture hype — refreshingly real."
        },
        {
            title: "Moving to a New City Alone — My First Week",
            description: "A vlogger documents the highs and lows of relocating to a city where they know nobody.",
            creator: "NewBegin",
            duration: "12 min",
            whyYoullLikeIt: "Anyone who has started fresh somewhere will feel seen watching this."
        },
        {
            title: "Living in a Tiny House for One Month",
            description: "What it's really like to live with less space, less stuff, and more intention.",
            creator: "MinimalLife",
            duration: "21 min",
            whyYoullLikeIt: "Great for anyone considering simplifying their lifestyle or space."
        },
        {
            title: "A Week Without Technology — The Real Results",
            description: "What happens when you unplug from screens and reconnect with the physical world.",
            creator: "OfflineLife",
            duration: "16 min",
            whyYoullLikeIt: "If you feel overwhelmed by digital life, this provides real perspective."
        }
    ],
    "tech-review": [
        {
            title: "Best Budget Laptops for Students (2024 Edition)",
            description: "A comparison of five affordable laptops tested for schoolwork, browsing, and light creative tasks.",
            creator: "TechCompare",
            duration: "16 min",
            whyYoullLikeIt: "Saves you hours of research — the top pick is genuinely surprising."
        },
        {
            title: "Is This the Best Smartphone Camera Ever?",
            description: "A deep-dive photo and video test of the latest flagship phone camera in real-world conditions.",
            creator: "CameraLab",
            duration: "18 min",
            whyYoullLikeIt: "The side-by-side comparisons make it super easy to see the difference."
        },
        {
            title: "Wireless Earbuds Under $50 — Which Ones Are Actually Good?",
            description: "Six popular budget earbuds rated on sound quality, comfort, battery life, and mic performance.",
            creator: "AudioTest",
            duration: "14 min",
            whyYoullLikeIt: "Great audio doesn't have to cost a fortune, and this proves it."
        },
        {
            title: "The Most Innovative Gadgets You Haven't Heard Of",
            description: "A curated list of the most interesting and practical gadgets released this year.",
            creator: "GadgetWorld",
            duration: "20 min",
            whyYoullLikeIt: "Perfect if you enjoy discovering cool tech you never knew existed."
        },
        {
            title: "Are Smart Glasses Actually Useful? A Real Test",
            description: "A practical review of whether smart glasses are worth the investment in everyday life.",
            creator: "TechReviewHub",
            duration: "22 min",
            whyYoullLikeIt: "An honest look at whether this technology is ready for real-world use."
        }
    ]
};

// ============================================================
// APPLICATION STATE
// ============================================================

var selectedCategory = null;
var pickCounter = 0;
var currentRecommendation = null;

// ============================================================
// DOM REFERENCES
// ============================================================

var userNameInput = document.getElementById("userName");
var greetingText = document.getElementById("personalGreeting");
var categoryCards = document.querySelectorAll(".category-card");
var recommendBtn = document.getElementById("recommendBtn");
var surpriseBtn = document.getElementById("surpriseBtn");
var emptyState = document.getElementById("emptyState");
var resultSection = document.getElementById("resultSection");
var errorState = document.getElementById("errorState");
var loadingState = document.getElementById("loadingState");
var contentState = document.getElementById("contentState");
var resultCategory = document.getElementById("resultCategory");
var thumbnailVisual = document.getElementById("thumbnailVisual");
var videoDuration = document.getElementById("videoDuration");
var videoTitle = document.getElementById("videoTitle");
var videoCreator = document.getElementById("videoCreator");
var videoDescription = document.getElementById("videoDescription");
var whyText = document.getElementById("whyText");
var pickAgainBtn = document.getElementById("pickAgainBtn");
var picksCounter = document.getElementById("picksCounter");
var currentCategory = document.getElementById("currentCategory");

// ============================================================
// CATEGORY SELECTION
// ============================================================

function selectCategory(category) {
    // Clear all selected states
    categoryCards.forEach(function(card) {
        card.setAttribute("aria-checked", "false");
        card.classList.remove("selected");
    });

    // Set selected state on clicked card
    var selectedCard = document.querySelector('.category-card[data-category="' + category + '"]');
    if (selectedCard) {
        selectedCard.setAttribute("aria-checked", "true");
        selectedCard.classList.add("selected");
        selectedCategory = category;

        // Update current category indicator
        currentCategory.textContent = "Currently exploring: " + formatCategoryName(category);

        // Hide error if showing
        errorState.classList.remove("visible");

        // Scroll smoothly to recommendation area
        document.querySelector(".action-buttons").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

function formatCategoryName(category) {
    return category.replace("-", " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

// Add click and keyboard event listeners to category cards
categoryCards.forEach(function(card) {
    card.addEventListener("click", function() {
        var category = card.getAttribute("data-category");
        selectCategory(category);
    });

    card.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            var category = card.getAttribute("data-category");
            selectCategory(category);
        }
    });
});

// ============================================================
// PERSONALIZATION
// ============================================================

userNameInput.addEventListener("input", function() {
    var name = userNameInput.value.trim();
    if (name !== "") {
        greetingText.textContent = name + ", what are you watching today?";
    } else {
        greetingText.textContent = "What are you watching today?";
    }
});

// ============================================================
// RECOMMENDATION GENERATION
// ============================================================

function getRandomRecommendation(category) {
    var categoryData = recommendations[category];
    if (!categoryData || categoryData.length === 0) {
        return null;
    }

    // Get previous recommendation if it exists
    var previousIndex = null;
    if (currentRecommendation && currentRecommendation.category === category) {
        previousIndex = recommendations[category].indexOf(currentRecommendation);
    }

    // Select a different index if possible, avoiding immediate duplicates
    var newIndex = Math.floor(Math.random() * categoryData.length);

    // If same as previous and more than 1 option exists, try another
    if (previousIndex !== null && newIndex === previousIndex && categoryData.length > 1) {
        newIndex = (newIndex + 1) % categoryData.length;
    }

    return categoryData[newIndex];
}

function generateRecommendation() {
    // Validation
    if (!selectedCategory) {
        errorState.classList.add("visible");
        resultSection.classList.remove("visible");
        setTimeout(function() {
            errorState.classList.remove("visible");
        }, 3000);

        // Highlight category selection area
        document.querySelector(".category-selection").scrollIntoView({ behavior: "smooth", block: "center" });
        categoryCards.forEach(function(card) {
            card.style.animation = "none";
            setTimeout(function() {
                card.style.animation = "";
            }, 10);
        });
        return;
    }

    // Hide error
    errorState.classList.remove("visible");

    // Update current category indicator
    currentCategory.textContent = "Currently exploring: " + formatCategoryName(selectedCategory);

    // Show loading state
    resultSection.classList.remove("visible");

    // After short delay, show the loading state, then reveal content
    setTimeout(function() {
        resultSection.classList.add("visible");
        loadingState.classList.remove("hidden");
        contentState.classList.add("hidden");

        // Short transition delay before revealing
        setTimeout(function() {
            // Generate the recommendation
            var pick = getRandomRecommendation(selectedCategory);

            if (!pick) {
                videoTitle.textContent = "No recommendations available";
                videoDescription.textContent = "Please try another category.";
                videoCreator.textContent = "";
                whyText.textContent = "";
                videoDuration.textContent = "0:00";
                return;
            }

            // Update recommendation
            currentRecommendation = Object.assign({ category: selectedCategory }, pick);

            // Update category badge
            resultCategory.textContent = formatCategoryName(selectedCategory);

            // Update thumbnail based on category
            setThumbnailVisual(selectedCategory);

            // Update video info
            videoTitle.textContent = pick.title;
            videoCreator.textContent = pick.creator || "";
            videoDuration.textContent = pick.duration || "";
            videoDescription.textContent = pick.description;
            whyText.textContent = pick.whyYoullLikeIt;

            // Update pick counter
            pickCounter++;
            picksCounter.textContent = "Picks generated: " + pickCounter;

            // Show content with smooth transition
            loadingState.classList.add("hidden");
            contentState.classList.remove("hidden");
            contentState.classList.add("fade-in");

            // Remove animation after it completes
            setTimeout(function() {
                contentState.classList.remove("fade-in");
            }, 500);

        }, 800);

    }, 300);
}

// ============================================================
// THUMBNAIL VISUAL GENERATION
// ============================================================

function setThumbnailVisual(category) {
    var visual = thumbnailVisual;

    // Clear any existing styles
    visual.style.backgroundImage = "";

    // Category-specific visual treatments using CSS gradients and patterns
    switch (category) {
        case "gaming":
            visual.style.backgroundImage = "linear-gradient(135deg, #3a1a5a 0%, #2a0f3a 50%, #1a0828 100%)";
            visual.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;opacity:0.3;">🎮</div>';
            break;
        case "music":
            visual.style.backgroundImage = "linear-gradient(135deg, #1a0a2e 0%, #2d1a4a 50%, #3a205a 100%)";
            visual.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;opacity:0.3;">🎵</div>';
            break;
        case "education":
            visual.style.backgroundImage = "linear-gradient(135deg, #0a2e3a 0%, #1a4a5a 50%, #2a6a8a 100%)";
            visual.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;opacity:0.3;">📚</div>';
            break;
        case "vlog":
            visual.style.backgroundImage = "linear-gradient(135deg, #2e1a0a 0%, #3a2a1a 50%, #4a3a2a 100%)";
            visual.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;opacity:0.3;">📹</div>';
            break;
        case "tech-review":
            visual.style.backgroundImage = "linear-gradient(135deg, #0a1a2e 0%, #1a2a3a 50%, #2a3a4a 100%)";
            visual.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;opacity:0.3;">💻</div>';
            break;
    }
}

// ============================================================
// SURPRISE ME
// ============================================================

function surpriseMe() {
    // Randomly select one of the five categories
    var categories = ["gaming", "music", "education", "vlog", "tech-review"];
    var randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Highlight the selected category
    selectCategory(randomCategory);

    // Generate recommendation after a short delay
    setTimeout(function() {
        generateRecommendation();
    }, 300);
}

surpriseBtn.addEventListener("click", surpriseMe);

// ============================================================
// PICK AGAIN
// ============================================================

pickAgainBtn.addEventListener("click", function() {
    if (selectedCategory) {
        generateRecommendation();
    }
});

// ============================================================
// RECOMMEND BUTTON
// ============================================================

recommendBtn.addEventListener("click", function() {
    generateRecommendation();
});

// ============================================================
// INITIALIZATION
// ============================================================

// Initialize with empty state visible, result hidden
emptyState.classList.add("visible");
resultSection.classList.remove("visible");
