const CleanerProblem = require('./CleanerProblem');
const CleanerAgent = require('./CleanerAgent');

let myProblem = new CleanerProblem({ maxIterations: 12 });

myProblem.addAgent("Roomba", CleanerAgent, { pos: 0 });
myProblem.solve([1, 1], {
    onFinish: (result) => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("agent: " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        console.log("Agent posc: "+ agentState.pos)
        console.log("World state: "+ world)
        console.log("Agent could solve this problem :)")
    },
    onTurn: (result) => { console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1])) }
});
