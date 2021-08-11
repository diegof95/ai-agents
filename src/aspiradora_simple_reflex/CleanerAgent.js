const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
  constructor(value) {
    super(value);
    // Actions: Left, Right, Suck up dirt
    this.actions = ["L", "R", "S"]
  }

  setup(initialState={}) {
    /*
    Actions table
    Key => "agentPos,worldPositionState"*/
    this.table = {
      "0,0": this.actions[1],
      "1,0": this.actions[0],
      "0,1": this.actions[2],
      "1,1": this.actions[2],
      "default": this.actions[2]
    }
  }

    //[1, [1, 1]]

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
  send() {

    /* We take from the percept the agent posc and
    the state of that square as key for the look up in the table*/
    let agentPos = this.perception[0]
    let posState = this.perception[1][agentPos]
    return this.table[agentPos+","+posState]
  }

}

module.exports = CleanerAgent;