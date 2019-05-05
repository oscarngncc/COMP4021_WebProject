
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


function getLength(Option)
{
    var LongestLength = 0;
    for ( var i = 0; i < 4; i++ )
    {
        var RowLength = 0;
        for ( var j = 0; j <4; j++ )
        {
            if ( Option[i][j] == 1 ){ RowLength++; }
        }
        if ( RowLength >= LongestLength ){ LongestLength = RowLength; }
    }
    return LongestLength;
}



