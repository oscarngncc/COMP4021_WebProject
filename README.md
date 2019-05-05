# COMP4021_WebProject
Self Proposed Web Project for COMP4021 - Special Tetris Game 

Variables Explaination:

**isSettled** = Boolean which is true when reaching the bottom, indicating that a new block needs to be created

**xPos** = Current row-Position of User-Controlled TetrisBlock ( e.g. xPos = 5 when in 5th row )

**xPos** = Current col-Position of User-Controlled TetrisBlock ( e.g. yPos = 3 when in 3th column )

**Canvas** = a 2-Dimensional 10*8 Matrix storing the exact DOM object (TetrisBlock), empty if Canvas[a][b] = null;

**Timer** = Timer for iterating/looping functions


Some Details Explaination:
1. Canvas being 10*8, because it's capacity it can hold for each blocks

2. Each Tetrisblocks should be a square size of 5rem * 5rem

3. To know that which tetrisblock(s) is user-controllable ( the one that's still dropping ), those blocks have an additional class
   called ".UserControllBlock" upon created, besides the usual ".TetrisBlock". Once it reaches to the bottom, it loses that class. 




Functions Explaination:
**CanvasMoveBlock**: Function that allows movement of the User-Controllablle Block to move either top/left/right/bottom. Parameters:
                     Dimension:  an integer which is 0 for moving along x-dimension, otherwise for moving y-dimesion
                     Distance: How much block Distance it is going to move. ( Can be -1, which makes block move top/left )

**CreateBlock**    : Create A New block when needed. Append it into the Canvas Array. Also update ".UserControllableBLock"

**CheckRowCondition**: If a row is completely filled, it removes all blocks of that row and make other blocks drop once.

**IterationFunc**: Iteration Functioon for the Timer. Also check GameOver and stop the game if true

**Main**: The function run when onloaded. Also setup on keydown Events






