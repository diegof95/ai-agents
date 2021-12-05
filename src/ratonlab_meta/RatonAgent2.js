const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class RatonAgent extends Agent {
    constructor(value) {
        super(value);
    }

    setup(state0) {
        this.internalState = {
            worldLog: Array(15).fill().map(() => Array(15).fill(0))
        };
        let x = state0.raton.x;
        let y = state0.raton.y;
        this.internalState.worldLog[y][x] = 1;
    };

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        //this.perception = [LEFT, UP, DOWN, RIGTH, SMELL, ratonx, ratony, qx, qy]

        let action;

        let ratonX = this.perception[5];
        let ratonY = this.perception[6]
        let quesoX = this.perception[7]
        let quesoY = this.perception[8]

        let cheeseDistance = taxiCabDistance(ratonX,ratonY,quesoX,quesoY);

        // If we are at 0 distance from cheese, take, else select action
        if (cheeseDistance != 0) {
            action = this.selectAction(this.internalState, this.perception);

            switch(action) {
                case 'LEFT':
                    this.internalState.worldLog[ratonY][ratonX-1] += 1;
                    break;
                case 'UP':
                    this.internalState.worldLog[ratonY-1][ratonX] += 1;
                    break;
                case 'RIGHT':
                    this.internalState.worldLog[ratonY][ratonX+1] += 1;
                    break;
                case 'DOWN':
                    this.internalState.worldLog[ratonY+1][ratonX] += 1;
                    break;
            }
        } else {
            action = "TAKE";
        }
        
        return action;
    }

    selectAction(internalState, perception){
        let ratonX = perception[5];
        let ratonY = perception[6]
        let quesoX = perception[7]
        let quesoY = perception[8]

        let possiblePaths = [];
        possiblePaths.push(
            !perception[0] ?
                taxiCabDistance(ratonX - 1,ratonY,quesoX,quesoY)
                + (internalState.worldLog[ratonY][ratonX-1] * 100)
                : Number.MAX_VALUE
        );
        possiblePaths.push(
            !perception[1] ?
                taxiCabDistance(ratonX,ratonY - 1,quesoX,quesoY)
                + (internalState.worldLog[ratonY-1][ratonX] * 100)
                : Number.MAX_VALUE
        );
        possiblePaths.push(
            !perception[2] ?
                taxiCabDistance(ratonX + 1,ratonY,quesoX,quesoY)
                + (internalState.worldLog[ratonY][ratonX+1] * 100)
                : Number.MAX_VALUE
        );
        possiblePaths.push(
            !perception[3] ?
                taxiCabDistance(ratonX,ratonY + 1,quesoX,quesoY)
                + (internalState.worldLog[ratonY+1][ratonX] * 100)
                : Number.MAX_VALUE
        );

        // We get the direction where there are minimum distance to the cheese
        let minPath = possiblePaths.indexOf(Math.min(...possiblePaths));

        let action;

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

// Taxicab distance between two points in plane
function taxiCabDistance(x1,y1,x2,y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
 }