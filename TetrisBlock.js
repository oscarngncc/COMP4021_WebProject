
var TetrisBlocksOption = [];

var Option0 = [ [1, 1, 1, 1 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option0);


var Option1 = [ [0, 1, 1, 0 ],
                [1, 1, 0, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option1);


var Option2 = [ [0, 1, 0, 0 ],
                [1, 1, 1, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option2);


var Option3 = [ [1, 1, 0, 0 ],
                [0, 1, 1, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option3);


var Option4 = [ [1, 1, 0, 0 ],
                [1, 1, 0, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option4);


var Option5 = [ [0, 0, 1, 0 ],
                [1, 1, 1, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option5);


var Option6 = [ [1, 0, 0, 0 ],
                [1, 1, 1, 0 ],
                [0, 0, 0, 0 ],
                [0, 0, 0, 0 ],
              ];
TetrisBlocksOption.push(Option6);


var Option7 =  [ [1, 1, 1, 1 ],
                 [1, 1, 1, 1 ],
                 [1, 0, 0, 1 ],
                 [1, 1, 1, 1 ],
                ];
//TetrisBlocksOption.push(Option7);



function getColumnLength(Option)
{
    var LongestLength = 0;
    for ( var i = 0; i < 4; i++ )
    {
        var ColLength = 0;
        for ( var j = 0; j <4; j++ )
        {
            if ( Option[i][j] == 1 ){ ColLength = j; }
        }
        if ( ColLength >= LongestLength ){ LongestLength = ColLength; }
    }
    return LongestLength + 1;
}


function getRowLength(Option)
{
    var LongestLength = 0;
    for ( var i = 0; i < 4; i++ )
    {
        var RowLength = 0;
        for ( var j = 0; j <4; j++ )
        {
            if ( Option[i][j] == 1 ){ RowLength = i; }
        }
        if ( RowLength >= LongestLength ){ LongestLength = RowLength; }
    }
    return LongestLength + 1;
}



function getRandomOption()
{
    var OptionValue = Math.floor( Math.random() * TetrisBlocksOption.length );
    return TetrisBlocksOption[OptionValue];
}


