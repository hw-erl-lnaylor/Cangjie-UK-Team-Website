// ============================================================================
// LESSON FILE CONFIGURATION
// ============================================================================

/**
 * List of lesson file names (without extensions)
 * Each lesson should have two files:
 * 1. [name].txt - Contains the lesson description (line-by-line correspondence)
 * 2. [name].cj - Contains the Cangjie code example
 * 
 * TO ADD NEW LESSONS:
 * 1. Create a new .txt file with lesson description
 * 2. Create a matching .cj file with code example
 * 3. Add the filename (without extension) to this array
 * 4. The files will be automatically loaded and displayed
 * 
 * IMPORTANT: Line numbers in .txt file correspond to line numbers in .cj file
 */
 import { getHighlighter } from 'https://esm.sh/shiki@1.0.0';


 const response = await fetch('CangjietmLanguage.json');
 const cangjie = await response.json();
 
 
 
 const highlighter = await getHighlighter({
   langs: [cangjie],
   themes: ['github-dark']
 })

let lessonFiles; 
//load lessons files from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    lessonFiles = data;
    loadAllLessons();
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });




// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let lessons = [];           // Array to store loaded lesson data
let currentLessonIndex = 0; // Current lesson being displayed
let isLoading = true;       // Loading state flag
let currentView = 'home';   // Current view: 'home' or 'lesson'

// DOM element references
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const homePage = document.getElementById('homePage');
const lessonView = document.getElementById('lessonView');
const lessonsGrid = document.getElementById('lessonsGrid');
const startFromBeginning = document.getElementById('startFromBeginning');
const randomLesson = document.getElementById('randomLesson');
const backToHome = document.getElementById('backToHome');
const topicNumber = document.getElementById('topicNumber');
const topicTitle = document.getElementById('topicTitle');
const descriptionContent = document.getElementById('descriptionContent');
const codeBlock = document.getElementById('codeBlock');
const codeFileName = document.getElementById('codeFileName');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentTopic = document.getElementById('currentTopic');
const totalTopics = document.getElementById('totalTopics');
const progressFill = document.getElementById('progressFill');

// ============================================================================
// FILE LOADING FUNCTIONS
// ============================================================================

/**
 * Loads all lesson files asynchronously
 * This function iterates through the lessonFiles array and fetches
 * both the .txt and .cj files for each lesson
 */
 
 
 // ============================================================================
 // FILE LOADING FUNCTIONS
 // ============================================================================
 
 /**
  * Loads all lesson files asynchronously
  * This function iterates through the lessonFiles array and fetches
  * both the .txt and .cj files for each lesson
  */
 async function loadAllLessons() {
     console.log('🚀 Starting to load lessons...');
     
     try {
         // Create an array of promises for loading each lesson
         const lessonPromises = lessonFiles.map(async (fileName, index) => {
             console.log(`📖 Loading lesson ${index + 1}: ${fileName}`);
             
             try {
                 // Load both text and code files simultaneously
                 const [textResponse, codeResponse] = await Promise.all([
                     fetch(`lessons/${fileName}.txt`),  // Fetch description file
                     fetch(`lessons/${fileName}.cj`)    // Fetch code file
                 ]);
 
                 // Check if both files loaded successfully
                 if (!textResponse.ok) {
                     throw new Error(`Failed to load ${fileName}.txt (${textResponse.status})`);
                 }
                 if (!codeResponse.ok) {
                     throw new Error(`Failed to load ${fileName}.cj (${codeResponse.status})`);
                 }
 
                 // Extract text content from both files
                 const [textContent, codeContent] = await Promise.all([
                     textResponse.text(),
                     codeResponse.text()
                 ]);
                 // Highlight the Cangjie code using Shiki
                 const highlightedCode = highlighter.codeToHtml(codeContent, { lang: 'Cangjie' , theme: 'github-dark'});
                
                 // Extract title from first line of text file
                 const lines = textContent.split('\n');
                 const title = lines[0] || `Lesson ${index + 1}`;
                 
                 // Create preview from first few lines
                 const preview = lines.slice(1, 4).join(' ').substring(0, 120) + '...';
                 
                 console.log(`✅ Successfully loaded lesson: ${title}`);
                 
                 // Return lesson object with all data
                 return {
                     fileName: fileName,
                     title: title,
                     description: textContent,
                     code: highlightedCode,  // Store highlighted code
                     preview: preview,
                     difficulty: getDifficulty(index)
                 };
                 
             } catch (error) {
                 console.error(`❌ Error loading lesson ${fileName}:`, error);
                 throw error;
             }
         });
 
         // Wait for all lessons to load
         lessons = await Promise.all(lessonPromises);
         
         console.log(`🎉 Successfully loaded ${lessons.length} lessons!`);
         
         // Initialize the UI with loaded lessons
         initializeUI();
         
     } catch (error) {
         console.error('💥 Failed to load lessons:', error);
         showError();
     }
 }

/**
 * Determines difficulty level based on lesson index
 */
function getDifficulty(index) {
    if (index < 9) return 'beginner';
    if (index < 31) return 'intermediate';
    return 'advanced';
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

/**
 * Re-apply scrollbar reservation so layout doesn't shift after DOM/CSS changes (e.g. Prism, fonts)
 */
function reapplyScrollbarLock() {
    const d = document.documentElement;
    d.style.setProperty('overflow-y', 'scroll', 'important');
    d.style.setProperty('overflow-x', 'hidden', 'important');
    d.style.setProperty('scrollbar-gutter', 'stable', 'important');
}

/**
 * Initializes the user interface after lessons are loaded
 */
function initializeUI() {
    isLoading = false;
    reapplyScrollbarLock();
    
    // Hide loading indicator
    loadingIndicator.style.display = 'none';
    
    // Show home page
    showHomePage();
    
    // Create floating particles animation
    createParticles();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('🎨 UI initialized successfully!');
}

/**
 * Shows the home page with lesson list
 */
function showHomePage() {
    currentView = 'home';
    homePage.style.display = 'block';
    lessonView.style.display = 'none';
    
    // Populate lessons grid
    populateLessonsGrid();
}

/**
 * Shows the lesson view
 */
function showLessonView(lessonIndex = 0) {
    currentView = 'lesson';
    currentLessonIndex = lessonIndex;
    homePage.style.display = 'none';
    lessonView.style.display = 'block';
    
    // Update lesson content
    updateCurrentLesson();
}

/**
 * Populates the lessons grid on the home page
 */
function populateLessonsGrid() {
    lessonsGrid.innerHTML = '';
    
    lessons.forEach((lesson, index) => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.addEventListener('click', () => showLessonView(index));
        
        card.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-title">${lesson.title}</div>
            <div class="lesson-preview">${lesson.preview}</div>
            <div class="lesson-meta">
                <span class="lesson-difficulty difficulty-${lesson.difficulty}">
                    ${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                </span>
                <span class="lesson-arrow">→</span>
            </div>
        `;
        
        lessonsGrid.appendChild(card);
    });
}

/**
 * Shows error message when lessons fail to load
 */
function showError() {
    isLoading = false;
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'block';
}

/**
 * Updates the display to show the current lesson
 */
function updateCurrentLesson() {
    if (lessons.length === 0) return;
    
    const lesson = lessons[currentLessonIndex];
    
    // Update lesson information
    topicNumber.textContent = currentLessonIndex + 1;
    topicTitle.textContent = lesson.title;
    descriptionContent.textContent = lesson.description;
    currentTopic.textContent = currentLessonIndex + 1;
    totalTopics.textContent = lessons.length;
    codeFileName.textContent = `${lesson.fileName}.cj`;
    
    // Update progress bar
    const progress = ((currentLessonIndex + 1) / lessons.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Update code display
    updateCodeDisplay(lesson.code);

    setupCopyButton();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Animate content change
    animateContentChange();
    
    console.log(`📄 Displaying lesson ${currentLessonIndex + 1}: ${lesson.title}`);
}

/**
 * Updates the code display with syntax highlighting
 */
function updateCodeDisplay(code) {
      
    //document.getElementById('codeBlock').innerHTML = html;
    codeBlock.innerHTML = code;
   // console.log("hello why no work???")

}

/**
 * Updates navigation button states
 */
function updateNavigationButtons() {
    prevButton.disabled = currentLessonIndex === 0;
    nextButton.disabled = currentLessonIndex === lessons.length - 1;
}

/**
 * Animates content change
 */
function animateContentChange() {
    const container = document.querySelector('.lesson-container');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'fadeInUp 0.5s ease-out';
    }, 10);
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Sets up all event listeners
 */
function setupEventListeners() {
    // Home page buttons
    startFromBeginning.addEventListener('click', () => {
        showLessonView(0);
    });
    
    randomLesson.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * lessons.length);
        showLessonView(randomIndex);
    });
    
    // Back to home button
    backToHome.addEventListener('click', () => {
        showHomePage();
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            updateCurrentLesson();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            updateCurrentLesson();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isLoading || currentView !== 'lesson') return;
        
        if (e.key === 'ArrowLeft' && currentLessonIndex > 0) {
            currentLessonIndex--;
            updateCurrentLesson();
        } else if (e.key === 'ArrowRight' && currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            updateCurrentLesson();
        } else if (e.key === 'Escape') {
            showHomePage();
        }
    });
}


// New function to encapsulate copy button logic
function setupCopyButton() {
    const copyButton = document.getElementById('copyCodeButton');
    const codeBlock = document.getElementById('codeBlock');

    // Remove any existing event listener to prevent multiple bindings
    // This is crucial if setupCopyButton is called multiple times.
    const oldCopyButton = copyButton.cloneNode(true);
    copyButton.parentNode.replaceChild(oldCopyButton, copyButton);

    const newCopyButton = document.getElementById('copyCodeButton'); // Get the new button reference

    if (newCopyButton && codeBlock) {
        newCopyButton.addEventListener('click', async () => {
            try {
                // Use the modern navigator.clipboard API
                // We access the textContent directly from the codeBlock
                await navigator.clipboard.writeText(codeBlock.textContent);

                // Provide some feedback to the user
                newCopyButton.textContent = 'Copied!';
                setTimeout(() => {
                    newCopyButton.textContent = 'Copy';
                }, 2000); // Reset button text after 2 seconds

            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers or if clipboard API is not available/permitted
                fallbackCopyTextToClipboard(codeBlock.textContent);
                newCopyButton.textContent = 'Error!';
                setTimeout(() => {
                    newCopyButton.textContent = 'Copy';
                }, 2000);
            }
        });
    }

    // Fallback function for older browsers or insecure contexts
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0"; // Make it invisible

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }
}


// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

/**
 * Creates floating particles animation
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application when the page loads
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Cangjie Learning Platform starting...');
    loadAllLessons();
});
