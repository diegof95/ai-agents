const RatonProblem = require('./RatonProblem');
const RatonAgent = require('./RatonAgent2');

let myProblem = new RatonProblem({ maxIterations: 12 });

myProblem.addAgent("Smith", RatonAgent, {raton: { x: 0, y: 2 }, queso: {x: 3, y: 1}});
myProblem.solve([
    [0, 0, 0, 0],
    [0, 1, 1, -1],
    [0, 1, 0, 0],
    [0, 0, 0, 1]], {
    onFinish: (result) => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("agent: " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        world[agentState.raton.y][agentState.raton.x] = "X"
        status = 1;
        for (let line of world) {
            console.log(line)
            for (let cell of line)
                if (cell == -1)
                    status = -1
        }

        if (status == -1)
            console.log("Agent cannot solve this problem :(")
        else
            console.log("Agent could solve this problem :)")
    },
    onTurn: (result) => { console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1])) }
});
