// Session Manager for Ball and Wall Game
// Handles URL parameters, session validation, and automatic score submission

(function() {
    'use strict';

    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    const roomId = urlParams.get('room_id');
    const onChainRoomId = urlParams.get('on_chain_room_id');
    const gameId = urlParams.get('game_id');
    const sessionToken = urlParams.get('session_token');
    const gameName = urlParams.get('game_name');
    const instructions = urlParams.get('instructions');
    const status = urlParams.get('status');
    const players = urlParams.get('players');
    const currency = urlParams.get('currency');
    const entryFee = urlParams.get('entry_fee');
    const totalPrizePool = urlParams.get('total_prize_pool');
    const maxPlayers = urlParams.get('max_players');
    const currentPlayers = urlParams.get('current_players');
    const winnerSplitRule = urlParams.get('winner_split_rule');

    console.log('[BALL AND WALL SESSION]', {
        userId,
        roomId,
        onChainRoomId,
        gameId,
        sessionToken,
        gameName,
        currency,
        totalPrizePool
    });

    // Track if we've submitted a score (allow multiple submissions)
    let hasSubmittedScore = false;
    let gameStartTime = null;
    let gameEndTime = null;

    // Listen for responses from parent window
    window.addEventListener('message', function (event) {
        if (event.data.type === 'SCORE_SUBMISSION_SUCCESS') {
            console.log('Score submission successful:', event.data);
            hasSubmittedScore = true;

            // Show success message using alert
            const message = event.data.updated
                ? `New High Score: ${event.data.newScore}!`
                : `Score: ${event.data.newScore} (Best: ${event.data.previousScore})`;
            
            alert(message);

        } else if (event.data.type === 'SCORE_SUBMISSION_ERROR') {
            console.error('Score submission failed:', event.data.error);
            
            // Show error message using alert
            alert('Error submitting score: ' + event.data.error);
        }
    });

    // Validate session before allowing game start
    function validateSession() {
        if (!userId || !roomId || !sessionToken) {
            alert('Invalid game session. Please return to the game room and try again.');
            exitGame();
            return false;
        }
        return true;
    }

    // Exit game function
    function exitGame() {
        console.log('[DEBUG] Closing game window, keeping session active');

        if (window.opener && !window.opener.closed) {
            // Optional: Send a different message type if you want to track game closes
            // window.opener.postMessage({
            //   type: 'GAME_CLOSED',
            //   userId,
            //   roomId,
            //   sessionToken
            // }, '*');
        }

        window.close();
    }

    // Submit score function - automatically called on game over
    function submitScore(finalScore) {
        // Validate session first
        if (!validateSession()) return;

        console.log('[SUBMITTING SCORE]', finalScore);

        // Calculate game duration
        const gameDuration = gameEndTime ? (gameEndTime - gameStartTime) / 1000 : 0;

        // Send score back to parent window
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                type: 'SUBMIT_SCORE',
                score: finalScore,
                userId,
                roomId,
                onChainRoomId,
                gameId,
                sessionToken,
                metadata: {
                    gameDuration: gameDuration,
                    gameEndTime: new Date().toISOString(),
                    finalStats: {
                        totalScore: finalScore,
                        timePlayed: gameDuration,
                        gameType: 'ball-and-wall'
                    }
                }
            }, '*');
        } else {
            // Fallback if opener is not available
            alert('Unable to submit score. Please ensure the game room tab is still open.');
            return;
        }
    }

    // Hook into the game's mediator system to listen for game over
    function initializeGameHooks() {
        // Wait for the game to be loaded
        if (typeof require !== 'undefined') {
            require(['app/core/_'], function(core) {
                // Listen for game over event
                core.mediator.addListener('game:game-over', function() {
                    console.log('[GAME OVER DETECTED]');
                    
                    // Get the current score from the dashboard
                    require(['app/dashboard'], function(dashboard) {
                        const finalScore = dashboard.getScore().get();
                        gameEndTime = Date.now();
                        
                        console.log('[FINAL SCORE]', finalScore);
                        
                        // Automatically submit the score
                        submitScore(finalScore);
                    });
                });

                // Listen for game start to track timing
                core.mediator.addListener('game:game-start', function() {
                    console.log('[GAME START DETECTED]');
                    gameStartTime = Date.now();
                    gameEndTime = null;
                });
            });
        }
    }

    // Handle page unload
    window.addEventListener('beforeunload', function (e) {
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                type: 'EXIT_GAME',
                userId,
                roomId,
                onChainRoomId,
                gameId,
                sessionToken
            }, '*');
        }
    });

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        if (!validateSession()) return;

        // Initialize game hooks after a short delay to ensure game is loaded
        setTimeout(initializeGameHooks, 1000);
    });

    // Fallback initialization if DOMContentLoaded already fired
    if (document.readyState === 'loading') {
        // DOM is still loading, wait for DOMContentLoaded
    } else {
        // DOM is already loaded
        if (!validateSession()) return;
        setTimeout(initializeGameHooks, 1000);
    }

})();
