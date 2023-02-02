function idleChecker(){
    let idleTime = eval(Date.now() - localStorage.getItem('last-active-timestamp'));
    let timeoutLimit = game.settings.get('idle-game-suspender', 'timeout-duration');
    let playerCount = game.users.filter(u => u.active).length;
    timeoutLimit = eval(timeoutLimit * 60000);
    if(playerCount == 1 && idleTime > timeoutLimit){ suspend(); }
};

function lastActivityTimestamp(){ localStorage.setItem('last-active-timestamp', Date.now()); };
function generateSettings(){ 
    game.settings.register('idle-game-suspender', 'timeout-duration', {
        name: 'Timeout Duration',
        hint: "The duration in which the timeout will happen and close the game (in minutes). The default time is 30 minutes.",
        scope: 'client',
        config: true,
        type: Number,
        default: 30,
    });
}
function suspend(){ $('button[data-action="setup"]').click(); };

Hooks.on('renderApplication', () => {
    lastActivityTimestamp();
});

Hooks.on('init', () => {
    setInterval(idleChecker, 60000);
    lastActivityTimestamp();
    generateSettings();
});