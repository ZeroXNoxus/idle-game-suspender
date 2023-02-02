function idleChecker(){
    let idleTime = eval(Date.now() - localStorage.getItem('last-active-timestamp'));
    let timeoutLimit = 30;
    let playerCount = game.users.filter(u => u.active).length;
    timeoutLimit = eval(timeoutLimit * 60000);
    if(playerCount = 1 && idleTime > timeoutLimit){ suspend(); }
};

function lastActivityTimestamp(){ localStorage.setItem('last-active-timestamp', Date.now()); };
function suspend(){ $('button[data-action="setup"]').click(); };

Hooks.on('renderApplication', () => {
    lastActivityTimestamp();
});

Hooks.on('init', () => {
    setInterval(idleChecker(), 60000);
    lastActivityTimestamp();
    idleChecker();
});