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
        <link href="Responsive.css" rel="stylesheet" type="text/css">
        <meta name="viewport" content="width=device-width, initial-scale=1" >
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="TetrisBlock.js"></script>
        <script src="BasicTetris.js"></script>
    </head>

    <body onload="Main()">
        <!--Script Goes here-->
        <script>
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

            /*Function Called for each timer iteration, Bascially Sum up everything*/
            function IterationFunc()
            {
                
                CanvasMoveBlock( 0, 1 ); //User-Controlled Block will drop each time interval
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

                CreateBlock();
                Timer = setTimeout(IterationFunc, 500);
            }

        </script>
        <!--Script Ends here-->

        <div id="Game">
            <div id = "Board1" class = "GameDataBoard">
                <p>Next Block Dropping:</p>
                <p>Score: <span id="score">0</span></p>
                <p>Highest Score:<BR><span id="hscore"><?=
                $_COOKIE["highestScore"]; ?></span><span id="hname">
                <?php if(isset($_COOKIE['hname'])){echo "by ".$_COOKIE['hname'];} ?>   
                </span></p>
            </div>
            <div id = "GameArea">
                <div id="BorderLine"></div>
                <div id="BaseGround">
                    <!-- BaseGroundUnit are Just White BorderLines that lets the player know the coordinate-->
            
                </div>
            </div>
            <div id="Board2" class = "GameDataBoard"></div>
        </div>

        
    </body>

</html>

