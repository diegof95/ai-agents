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
            "0,0,1,1,0": "LEFT",
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
    console.log('initialState: '+ JSON.stringify(initialState));

    this.internalState = {
        lastAction: "NONE",
    };
  }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        console.log('perception: '+ JSON.stringify(this.perception));
        let action = this.selectAction(this.internalState, this.perception)
        this.internalState.lastAction = action;
        console.log('lastAction: '+ this.internalState.lastAction)
        return action;
    }

    selectAction(state, perception){

        let lastAction = state.lastAction;
        let viewKey = perception.join();
        let action;
        
        if (this.table[viewKey]) {
            action = this.table[viewKey];
        }
        else {
            action = this.table["default"];
            return action;
        }
        console.log('isContrary: '+ this.isContrary(lastAction, action))
        if(this.isContrary(lastAction, action)){
            action = this.selectRandomAction(lastAction);
        }

        return action
    }

    isContrary(lastAction, action){

        if(action == "LEFT" && lastAction != "RIGHT"){
            return false;
        }
        if(action == "UP" && lastAction != "DOWN"){
            return false;
        }
        if(action == "RIGHT" && lastAction != "LEFT"){
            return false;
        }
        if(action == "DOWN" && lastAction != "UP"){
            return false;
        }
        if(lastAction == "NONE"){
            return false;
        }
        return true;
    }

    selectRandomAction(lastAction){
        
        let rand = Math.random();
        let action;
        switch(true){
            case (rand < 0.25):
                action = "LEFT";
                break;
            case (rand >= 0.25 && rand < 0.5):
                action = "UP";
                break;
            case (rand >= 0.5 && rand < 0.75):
                action = "RIGHT";
                break;
            case (rand >= 0.75):
                action = "DOWN";
                break;

            if (action == lastAction){
                action = selectRandomAction(action);
            }
        }
        return action;
    }

}

module.exports = RatonAgent;