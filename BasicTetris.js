

/* true if the block player previously controlled reaches to the bottom/another block*/
var isSettled = true;

/* Current Position of the User-Controlled TetrisBlock, based on Canvas*/
var xPos = 0; 
var yPos = 0;
var OptionValue = 0;
var Rotation = 0;

/* 10 x 8 2-Dimensional Matrix Canvas with actual DOM object*/
var Canvas = new Array(10);
for ( var i = 0; i < 10; i++)
{
    var Canvas_Col = new Array(8);
    Canvas[i] = Canvas_Col;
}

//Timer
var Timer;

//Color Array
var colorlist = ["blue", "red", "yellow", "orange", "green", "purple"];

/* User Accessible Variables here*/
var UserControlBlocks = [];
var CurrentOptions;

/* Predict Next Tetris Here */
var NextOptionValue = getRandomValue();
var NextOptions = getOption(NextOptionValue);
var NextColor = colorlist[ Math.floor( Math.random() * colorlist.length ) ];

/*  @@@@@@@@@@@@@@@@ Special Mode Activiated @@@@@@@@@@@@@ */
var SpecialMode = true;
/* BlockList for calculating radius */
var BlockList = [   "url(\"Amber.png\")", 
                    "url(\"Diamond.png\")",
                    "url(\"Gold.png\")",
                    "url(\"Ice.png\")",
                    "url(\"TNT.png\")"
                ];

// 1 for TNT, 2 for Ice, 0 otherwise (normal)                
var SpecialBlock = 0;
var NextSpecialBlock = 0;


/* Apply Impact If Special Mode */
if ( SpecialMode )
{
    Index = Math.floor( Math.random() * BlockList.length);
    if ( Index >= 3){ Index = 2; }
    NextColor = BlockList[ Index ];
} else { NextSpecialBlock = 0; }
/*  @@@@@@@@@@@@@@@@ Special Mode Activiated @@@@@@@@@@@@@ */







/* Helper Function for Changing position of elements inside Canvas, Parameters:
    Dimension - 0 which is x position, 1 which is y position
    Distance: How much (based on canvas) should the block move
*/
function CanvasMoveBlock( Dimension, Distance )
{
    if ( UserControlBlocks.length == 0 ){ return false;}

    //Blocks cannot be moved if it's already settled
    if ( isSettled  ){ return false; }

    var TxPos = xPos + getRowLength(CurrentOptions) -1;
    var TyPos = yPos + getColumnLength(CurrentOptions) -1;
    

    //It may already be settled, but not updated yet
    if ( TxPos >= 9 )
    {  
        isSettled = true;
        return false;
    }
    for ( var j = 0; j < getColumnLength(CurrentOptions); j++ )
    {
        if ( Canvas[TxPos+1][ yPos+j] != null && Canvas[TxPos][ yPos+ j] != null )
        {  
            isSettled = true;
            return false; 
        }
    }



    //Out of Boundary Checking
    var Pos = ( Dimension  == 0 )? xPos : yPos;
    var TPos = ( Dimension == 0 )? TxPos: TyPos;
    var UpperBoundery = (Dimension == 0 )? 9 : 7;
    if ( TPos + Distance > UpperBoundery || Pos + Distance < 0 ){
        return false; 
    }
    
    
    var MovedxPos = ( Dimension == 0 )? xPos + Distance: xPos;
    var MovedyPos = ( Dimension != 0 )? yPos + Distance: yPos;

    

    //Check If movable to the position
    var canMove = true;
    for ( var i = 0; i < getRowLength(CurrentOptions); i++ )
    {
        for ( var j = 0; j < getColumnLength(CurrentOptions); j++ )
        {
            if ( Canvas[xPos + i][yPos + j] != null )
            {
                var MovedPosition =Canvas[MovedxPos + i][MovedyPos + j];
                if ( MovedPosition != null )
                {
                    if ( ! UserControlBlocks.includes(MovedPosition) )
                    {
                        canMove = false; break;
                    }
                }
            }
        }
    }

    if ( canMove )
    {
        for ( var i = 0; i < getRowLength(CurrentOptions); i++ )
        {
            for ( var j = 0; j < getColumnLength(CurrentOptions); j++ )
            {
                if ( Canvas[xPos + i][yPos + j] != null )
                {
                    //Splice All blocks first
                    var block = Canvas[xPos + i][yPos + j];
                    Canvas[xPos+i].splice( yPos + j, 1, null );
                }
            }
        }
        var count = 0;
        for ( var i = 0; i <4; i++)
        {
            for ( var j = 0; j<4; j++)
            {
                if ( CurrentOptions[i][j] != 0  )
                {
                    //Insert All blocks
                    var block = UserControlBlocks[count];
                    Canvas[MovedxPos+i].splice(MovedyPos+j, 1, block );

                    //Update Actual Block Position in URL
                    block.style.top = (5 + (MovedxPos+i)*5).toString() + "rem"; 
                    block.style.left = (0 + (MovedyPos+j)*5 + 20 ).toString() + "rem";

                    isSettled = false;
                    count++;
                }
            }
        }
        xPos = MovedxPos;
        yPos = MovedyPos;

        return true;
    }   
    return false;   
}


/*********************************************************/
function Rotate()
{
    var TheoryRotation = ( Rotation + 1 ) % 4;
    var NewOption = getOption( OptionValue, TheoryRotation);


    // Return false if no controllable block
    if ( UserControlBlocks.length == 0 ){ return false;}
    //Blocks cannot be moved if it's already settled
    if ( isSettled  ){ return false; }

    //Out of Boundary
    if ( xPos + getRowLength(NewOption)  > 10    || xPos + getRowLength(NewOption) < 0  )
    {
        return false;
    }
    if ( yPos + getColumnLength(NewOption) > 8  || yPos + getColumnLength(NewOption) < 0  )
    {
        console.log(yPos);
        return false;
    }

    //Check If movable to the position
    var canMove = true;
    for ( var i = 0; i < getRowLength(NewOption); i++ )
    {
        for ( var j = 0; j < getColumnLength(NewOption); j++ )
        {
            if ( NewOption[i][j] != 0 )
            {
                if ( Canvas[xPos + i][yPos + j] != null )
                {
                    if ( ! UserControlBlocks.includes(Canvas[xPos + i][yPos + j]) )
                    {
                        canMove = false; break;
                    }
                }
            }
        }
    }
    if ( canMove )
    {
        $(".TetrisBlock").css("transition", "top 0s");
        $(".TetrisBlock").css("transition", "left 0s");
        for ( var i = 0; i < getRowLength(CurrentOptions); i++ )
        {
            for ( var j = 0; j < getColumnLength(CurrentOptions); j++ )
            {
                if ( Canvas[xPos + i][yPos + j] != null )
                {
                    //Splice All blocks first
                    var block = Canvas[xPos + i][yPos + j];
                    Canvas[xPos+i].splice( yPos + j, 1, null );
                }
            }
        }
        var count = 0;
        for ( var i = 0; i <4; i++)
        {
            for ( var j = 0; j<4; j++)
            {
                if ( NewOption[i][j] != 0  )
                {
                    //Insert All blocks
                    var block = UserControlBlocks[count];
                    Canvas[xPos+i].splice(yPos+j, 1, block );

                    //Update Actual Block Position in URL
                    block.style.top = (5 + (xPos+i)*5).toString() + "rem"; 
                    block.style.left = (0 + (yPos+j)*5 + 20 ).toString() + "rem";

                    isSettled = false;
                    count++;
                }
            }
        }
        CurrentOptions = NewOption;
        Rotation = TheoryRotation;

        $(".TetrisBlock").css("transition", "top 0.25s");
        $(".TetrisBlock").css("transition", "left 0.25s");

        return true;
    }
    return false;
}



function CreateBlock()
{
    if ( isSettled )
    {
        /* New Block Position, randomly of either 0-7th column and first row */
        xPos = 0;
        yPos = Math.floor( Math.random() * (8-4) );
        Rotation = 0;

        //Make Previous UserControlBlocks no longer controllable                    
        if ( $(".UserControlBlock")[0] )
        {
            //Previous block doesn't have ".UserControlBlock" class anymore
            $(".UserControlBlock").each( function(){
                $(this).attr("class", "TetrisBlock");
            });
            UserControlBlocks = [];
        }

        //Create new Block
        var GameArea = document.getElementById("GameArea");

        
        OptionValue = NextOptionValue;
        CurrentOptions = getOption(OptionValue);
        NextOptionValue = getRandomValue();
        NextOptions = getOption(NextOptionValue);
        

        //Choose Color
        var color = NextColor;
        NextColor = colorlist[ Math.floor( Math.random() * colorlist.length ) ];

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        SpecialBlock = NextSpecialBlock;
        if ( SpecialMode )
        {
            var Index = Math.floor( Math.random() * BlockList.length ); 
            NextColor = BlockList[Index];
            // Indicating a Bomb is going to explode here
            if ( Index >= 4 ){
                NextSpecialBlock = 1;
                NextOptionValue = 999;
                NextOptions = getOption(NextOptionValue); 
            }
            // Indicating ice blocks are going to be created
            else if ( Index == 3 )
            {
                NextSpecialBlock = 2; 
            }
            else { NextSpecialBlock = 0; } 
        }
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        for ( var i = 0; i < 4; i++ )
        {
            for ( var j = 0; j <4; j++ )
            {
                if ( CurrentOptions[i][j] != 0 )
                {
                    var block = document.createElement("div");
                    block.setAttribute("class", "TetrisBlock UserControlBlock");
                    block.style.top = (5 + (xPos+i)*5).toString() + "rem"; 
                    block.style.left = (0 + (yPos+j)*5 + 20 ).toString() + "rem";
                    block.style.background = color;

                    GameArea.appendChild(block);   //Add to Web Interface
                    UserControlBlocks.push(block); //Label Block as User Controllable
                    Canvas[0+i][yPos+j] = block;  //Add Block to Canvas 
                    
                }
            }
        }

        /* Forsee Next Tetris Block */
        for ( var i = 0; i < 4; i++ )
        {
            for ( var j = 0; j < 4; j++ )
            {
                if ( NextOptions[i][j] == 0 )
                { $("#NextBlockDiv").children().eq(i*4+j).css("display", "none");  }
                else 
                { $("#NextBlockDiv").children().eq(i*4+j).css("display", "inline");  }
                
                $("#NextBlockDiv").children().eq(i*4+j).css("background", NextColor);
            }
        }

        console.log("creation");
        isSettled = false; 
    }              
}




function CheckRowCondition()
{
    for ( var i = 9; i >= 0; i-- )
    {
        var AllFilled = true;
        for ( var j = 0; j < 8; j++ )
        {
            if ( Canvas[i][j] == null ){ AllFilled = false; break; }
        }

        //When a Row is filled, remove that row and update other TetrisBlock
        if ( AllFilled && isSettled == true ) 
        {
            clearTimeout(Timer);
            UserControlBlocks = [];

            //Revmove The Fully Filled Row
            for ( var k = 0; k < 8; k++ )
            {
                var block = Canvas[i][k];
                var GameArea = document.getElementById("GameArea");
                GameArea.removeChild(block);
                Canvas[i][k] = null;    
            }

            
            //Update All other tetrisBlocks by moving down 1 layer
            for ( var a = i-1; a>= 0; a-- )
            {
                for ( var b = 0; b < 8; b++ )
                {
                    //Update Array
                    var block = Canvas[a][b];
                    if ( block != null )
                    {
                        Canvas[a].splice( b, 1, null );
                        Canvas[a+1].splice( b, 1, block );
                        block.style.top = (5 + (a+1)*5).toString() + "rem";
                    }                              
                }
            }
            var score=parseInt($("#score").text());
            score += 100;
            $("#score").text(score);
            i++;
        }
    }
}


