# Make Your Game ( Space Invaders Game )

A browser-based Space Invaders game built with vanilla JavaScript, HTML, and CSS. This project implements a classic arcade shooter with smooth 60 FPS performance using the DOM and RequestAnimationFrame API.

## Description

This is a single-player implementation of the classic Space Invaders arcade game. The player controls a spaceship at the bottom of the screen, defending against waves of descending alien invaders while taking cover behind destructible bunkers. The game features a scoring system, lives counter, and a time limit of 90 seconds.

## Technologies and Tools

- **HTML5** - Page structure and game elements
- **CSS3** - Styling and visual effects
- **Vanilla JavaScript (ES6 Modules)** - Game logic and mechanics
- **DOM API** - Element manipulation and rendering
- **RequestAnimationFrame** - Smooth 60 FPS game loop

## Installation

1. Clone the repository:
```bash
git clone https://learn.zone01oujda.ma/git/melghama/make-your-game
cd make-your-game
```

2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge).

**Note:** The game uses ES6 modules, so you may need to run it through a local server if your browser restricts module loading from `file://` protocol.

## Usage

### Starting the Game
1. Open the game in your browser
2. Click "PLAY SPACE INVADERS" on the start screen
3. The game board will appear with your spaceship at the bottom

### Controls
- **Arrow Left** (←) - Move spaceship left
- **Arrow Right** (→) - Move spaceship right
- **Spacebar** - Shoot laser
- **P** - Pause/Resume game

### Pause Menu
When paused, you can:
- **Continue** - Resume the current game
- **Restart** - Start a new game from the beginning

### Game Objectives
- Destroy all alien invaders to win
- Avoid getting hit by alien lasers (you have 3 lives)
- Survive for 90 seconds or less
- Maximize your score by destroying aliens and the mystery UFO

### Scoring
- Red aliens: **10 points**
- Yellow aliens: **20 points**
- Green aliens: **30 points**
- Mystery UFO: **100-300 points** (random)

### Game Over Conditions
- All 3 lives are lost
- Aliens reach the bottom of the screen
- Time limit (90 seconds) expires

## Project Structure
```
make-your-game/
├── index.html              # Main HTML file
├── style/
│   └── style.css          # Game styling
├── assets/                # Game images
│   ├── red.png           # Red alien sprite
│   ├── yellow.png        # Yellow alien sprite
│   ├── green.png         # Green alien sprite
│   ├── extra.png         # Mystery UFO sprite
│   └── spaceinvaders.png # Favicon
└── js/                    # JavaScript modules
    ├── main.js           # Game initialization and main loop
    ├── gameControl.js    # Game state management
    ├── movePlayer.js     # Player movement logic
    ├── moveAliens.js     # Alien movement logic
    ├── laser.js          # Laser shooting and collision
    └── createBunker.js   # Bunker creation
```

## Main Features

### Core Gameplay
- **60 FPS Performance** - Smooth animation using RequestAnimationFrame
- **Player Movement** - Responsive keyboard controls for left/right movement
- **Shooting Mechanics** - Player and alien laser firing with cooldown timers
- **Collision Detection** - Laser-to-alien, laser-to-player, and laser-to-bunker collisions
- **Alien Movement** - Grid-based alien formation with directional changes
- **Mystery UFO** - Random UFO appearance with bonus points
- **Destructible Bunkers** - Four bunkers that provide cover and take damage

### Game UI
- **Score Display** - Real-time score tracking
- **Lives Counter** - Visual representation of remaining lives
- **Timer** - Countdown display showing elapsed game time (MM:SS format)
- **Pause Screen** - In-game pause menu with continue/restart options
- **Game Over Screen** - End screen with play again option

### Game Mechanics
- **Cooldown System** - 600ms cooldown between player shots
- **Alien Shooting** - Bottom-row aliens fire lasers at random intervals
- **Laser Interactions** - Player and alien lasers can destroy each other
- **Win Condition** - Destroy all 60 aliens
- **Time Limit** - 90-second maximum game duration
- **Responsive Scaling** - Game scales to fit different screen sizes

## Team
- **MOHAMMED EL GHAMARI** (melghama)
- **AYYOUB OUTRGUA** (aoutrgua)