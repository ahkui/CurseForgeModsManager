const readline = require('readline');



function ask(questionText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(questionText, (input) => {
            resolve(input)
            rl.close()
        });
    });
}

module.exports = ask
