<?php
if( isset( $_COOKIE['highestScore'] ) ) 
{ } 
else 
{ 
    setcookie("highestScore","no_record");    
    header("Location:Main.php");
} 
?>


<!DOCTYPE html>
<html>
    <head>
        <title>Special Tetris Game</title>
        <meta charset="utf-8"/>
        <link href="MainStyle.css" rel="stylesheet" type="text/css">
        <meta name="viewport" content="width=device-width, initial-scale=1" >
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="TetrisBlock.js"></script>
        <script src="BasicTetris.js"></script>
        <script src="SpecialTetris.js"></script>
    </head>

    <body onload="Main()">
        <!--Script Goes here-->
        <script>
            var IterationTime = 500;
            var difficulty = 1;

            function Main()
            {
                Timer = setTimeout(IterationFunc, 500);

                //When User Press the button
                $(document).on("keydown", function(e){
                    if ( e.keyCode == 37 )  //Press Left
                    { CanvasMoveBlock(1, -1); }
                    else if ( e.keyCode == 39 ) //Press Right
                    { CanvasMoveBlock(1, 1);}
                    else if ( e.keyCode == 38 ) //Press Up, Change Direction
                    { Rotate();}
                    else if ( e.keyCode == 40 ) //Press Down, //Increase DownSpeed
                    { CanvasMoveBlock(0, 1); }
                });
            }

            function ChangeMode()
            {
                if ( SpecialMode ){ SpecialMode = false; }
                else { SpecialMode = true;}

                var CurrentModep = document.getElementById("CurrentMode");
                if (SpecialMode ){CurrentModep.innerHTML = "Special Mode"; }
                else { CurrentModep.innerHTML="Normal Mode";}
            }

            /*Function Called for each timer iteration, Bascially Sum up everything*/
            function IterationFunc()
            {
                CanvasMoveBlock( 0, 1 ); //User-Controlled Block will drop each time interval
                IceBreak();                
                Boom();
                CheckRowCondition();
                
                
                //Check GameOver                
                for ( var i = 0; i < 8; i++ )
                {
                    if ( Canvas[0][i] != null ){ 
                        isSettled = true;
                        clearTimeout(Timer);
                        alert("GAMEOVER");
                        
                        
                        var score=$("#score").text();
                        var x=document.cookie;
                        var split_read_cookie = x.split(";");
                        for (i=0;i<split_read_cookie.length;i++){
                            
                        var value=split_read_cookie[i];

                        value=value.split("=");
                            
                        if((value[0]==" highestScore"&&value[1]<score)||(value[0]==" highestScore"&&value[1]=="no_record")){
                            var name=prompt("Please enter your name");
                            document.cookie = 'highestScore='+score+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";

                            document.cookie = 'hname='+name+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                            $("#hscore").text(score);
                            $("#hname").text(" by "+name);
                        }}
                        
                        return;
                    }
                }

                //Check Level Difficulty
                var score=parseInt($("#score").text());
                if ( difficulty != Math.floor(score/500) + 1 )
                {
                    difficulty = Math.floor(score/500) + 1;
                    IterationTime = 500 - (difficulty-1)*50;
                    var Level = document.getElementById("Level");
                    var LevelTest = "Level " + difficulty.toString();
                    Level.innerHTML = LevelTest ;
                }
                

                
                CreateBlock();
                Timer = setTimeout(IterationFunc, IterationTime);
            }

        </script>
        <!--Script Ends here-->

        <div id="Game">
            <div id = "Board1" class = "GameDataBoard">
                <p>Next Block Dropping:</p>
                <div id="NextBlockDiv">
                    <div class="TetrisBlock" style="display: none; top:1rem; left: 1rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:1rem; left: 6rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:1rem; left: 11rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:1rem; left: 16rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:6rem; left: 1rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:6rem; left: 6rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:6rem; left: 11rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:6rem; left: 16rem;"></div>  
                    <div class="TetrisBlock" style="display: none; top:11rem; left: 1rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:11rem; left: 6rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:11rem; left: 11rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:11rem; left: 16rem;"></div>  
                    <div class="TetrisBlock" style="display: none; top:16rem; left: 1rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:16rem; left: 6rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:16rem; left: 11rem;"></div>
                    <div class="TetrisBlock" style="display: none; top:16rem; left: 16rem;"></div>                        
                </div>
                <p>Score: <span id="score">0</span></p>
                <p style="color:yellow;">Highest Score:<BR><span id="hscore"><?=
                $_COOKIE["highestScore"]; ?></span><span id="hname">
                <?php if(isset($_COOKIE['hname'])){echo "by ".$_COOKIE['hname'];} ?>   
                </span></p>
            </div>
            <div id = "GameArea">
                <div id="BorderLine"></div>
                <div id="BaseGround">            
                </div>
            </div>
            <div id="Board2" class = "GameDataBoard">
                <p>You are Now Playing</p>
                <p id="CurrentMode" style="color:yellow; font-size: 4rem;">Special Mode</p>
                <button id="ModeButton" onclick="ChangeMode()">Toggle Mode</button>                
                <p id="Level">Level 1</p>

                <div id="description">
                    <p style="top: 4rem"> Instructions of Special Mode: </p>
                    <div class="TetrisBlock" style="background: url(TNT.png); position: relative; display: inline-block; "></div>
                    <p style="top: 4rem"> TNT which will explode upon contact </p>
                    <div class="TetrisBlock" style="background: url(Ice.png); position: relative; display: inline-block; "></div>
                    <p style="top: 4rem"> Ice which will melt as time flies </p>
                </div>
            </div>
        </div>

        
    </body>

</html>

