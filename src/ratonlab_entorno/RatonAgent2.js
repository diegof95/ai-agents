const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class RatonAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "UP",
            "0,1,0,0,0": "LEFT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "RIGHT",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            "default": "TAKE"
        };
    }

    setup(initialState={}) {
        
        /* We create a 50x50 matrix filled with zeros. 
           This will be the enviroment model where we
           keep track of which cells the agent has visited */
        this.internalState = {
            worldLog: Array(15).fill().map(() => Array(15).fill(0)),
            actualPos: initialState
        };
        console.log(initialState)
        let x = initialState.x;
        let y = initialState.y;
        this.internalState.worldLog[y][x] = 1;
        
  }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {

        let viewKey = this.perception.join();
        let action;

        // If perceives cheese or its blocked in all directions,
        // takes, otherwise selects moving action
        if (this.table[viewKey]) {
            action = this.selectAction(this.internalState, this.perception);

            // Updates actual position
            switch(action){
                case "LEFT":
                    this.internalState.actualPos.x -= 1;
                    break;
                case "UP":
                    this.internalState.actualPos.y -= 1;
                    break;
                case "RIGHT":
                    this.internalState.actualPos.x += 1;
                    break;
                case "DOWN":
                    this.internalState.actualPos.y += 1;
                    break;
            }

            // Updates ocurrences of agent in actual position
            let x = this.internalState.actualPos.x;
            let y = this.internalState.actualPos.y;
            this.internalState.worldLog[y][x] += 1;

        } else {
            action = this.table["default"];
        }
        
        return action;
    }

    selectAction(internalState, perception){
        let x = internalState.actualPos.x;
        let y = internalState.actualPos.y;
        
        // Array contains number of occurrences of agent in each direction
        // or 1000 if path is blocked in that direction
        let possiblePaths = [];
        possiblePaths.push(
            !perception[0] ?
                internalState.worldLog[y][x-1]
                : 1000
        );
        possiblePaths.push(
            !perception[1] ?
                internalState.worldLog[y-1][x]
                : 1000
        );
        possiblePaths.push(
            !perception[2] ?
                internalState.worldLog[y][x+1]
                : 1000
        );
        possiblePaths.push(
            !perception[3] ?
                internalState.worldLog[y+1][x]
                : 1000
        );


        // We get the direction where there are minimum occurrences of the agent
        let minPath = possiblePaths.indexOf(Math.min(...possiblePaths));
        
        let action;

        // We select the action acording to the direction
        // where there are minimum occurrences of the agent
        switch(minPath) {
            case 0:
                action = 'LEFT';
                break;
            case 1:
                action = 'UP';
                break;
            case 2:
                action = 'RIGHT';
                break;
            case 3:
                action = 'DOWN';
                break;
        }
        return action;
    }
}

module.exports = RatonAgent;