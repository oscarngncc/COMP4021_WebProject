
var IceTerm = 0;

/* When bomb make contact, it booms */
function Boom()
{
    if ( isSettled == true && SpecialBlock == 1 )
    {
        console.log("BOOM BOOM");
        for ( var i = -2; i < 3; i++ )
        {
            for ( var j = -2; j <3; j++ )
            {
                //Out of Boundary; Just Ignore them
                if ( xPos + i <0 || xPos + i > 9 || yPos + j < 0 || yPos + j > 9 )
                { continue; }

                //BOOM That Blocks Out
                var block = Canvas[xPos + i][yPos + j ];
                
                Canvas[xPos + i][yPos + j] = null;
                if ( block != null )
                {
                    var bomb_direction = ( j < 0 )? (-20 + j*20) : (20 + j * 20);
                    if ( j == 0 ){ bomb_direction = 0; }

                    //Animation Before Actually Removing It
                    //-webkit-transition: all 1s cubic-bezier(0.310, 0.440, 0.445, 1.650);
                    block.style.transition = "all 3s cubic-bezier(0.310, 0.440, 0.445, 1.650)";
                    block.style.top =  (5 + (xPos+i)*5         +90                 ).toString() + "rem";
                    block.style.left = (0 + (yPos+j)*5 + 20    +bomb_direction     ).toString() + "rem";
                  

                }
                       
                UserControlBlocks = [];
                isSettled = true;  
            }
        }
        Gravity();
    }
}




/*Gravity so the Block Drops */
function Gravity()
{
    for ( var a = 9; a >= 0; a--  )
    {
        for ( var b =0; b < 8; b++  )
        {
            while ( a+1 < 10 )
            {
                var block = Canvas[a][b];
                if ( Canvas[a+1][b] == null && block != null && !UserControlBlocks.includes(block) )
                {
                    Canvas[a].splice( b, 1, null );
                    Canvas[a+1].splice( b, 1, block );
                    block.style.top = (5 + (a+1)*5).toString() + "rem";

                    a++;
                    continue;
                }
                break;
            }
        }
    }
}


function IceBreak()
{
    if ( !SpecialMode && ! isSettled ){return;}
    var doesBreak = false;
    IceTerm += 1;
    if ( IceTerm >= 20 )
    {
        IceTerm = 0;
        for ( var a = 9; a >= 0; a--  )
        {
            for ( var b =0; b < 8; b++  )
            {
                if ( Canvas[a][b] != null  )
                {
                    if ( Canvas[a][b].style.background == "url(\"Ice.png\")" 
                    && ! UserControlBlocks.includes(Canvas[a][b])  )
                    {
                        Canvas[a][b].style.background = "url(\"IceBreak.png\")";
                    }
                    else if ( Canvas[a][b].style.background == "url(\"IceBreak.png\")"  )
                    {
                        var block = Canvas[a][b];
                        var GameArea = document.getElementById("GameArea");
                        GameArea.removeChild(block);
                        Canvas[a][b] = null;
                        doesBreak = true;
                    }
                }
            }
        }     
        if ( doesBreak ){ Gravity(); }
    }
}


