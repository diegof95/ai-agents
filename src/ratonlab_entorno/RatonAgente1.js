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
        // We save agents last action
        this.internalState = {
            lastAction: "NONE",
    };
  }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {

        // We prevent the agent from returning by blocking
        // the path from where he came by altering perception 
        switch(this.internalState.lastAction) {
            case "LEFT":
                this.perception[2] = 1;
                break;
            case "UP":
                this.perception[3] = 1;
                break;
            case "RIGHT":
                this.perception[0] = 1;
                break;
            case "DOWN":
                this.perception[1] = 1;
                break;
        }

        let viewKey = this.perception.join();
        let action;

        // If perceives cheese or its blocked in all directions,
        // takes, otherwise selects moving action
        if (this.table[viewKey]) {
            action = this.table[viewKey];
        } else {
            action = this.table["default"];
        }
        // We update last action
        this.internalState.lastAction = action;
        return action;

    }

}

module.exports = RatonAgent;