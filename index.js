var playerColors = ["red","green"];
var playerChoice = [".","."];

var currentPlayer;

function chooseRandomPlayer()
{
    var randomPlayer = Math.floor(Math.random()*2)+1;

    if(randomPlayer === 1)
    {
    var player1 = prompt("Player choose your character ?");
    var player2 = (player1==='O'?'X':'O');
    }
    else
    {
        var player2 = prompt("Player choose your character ?");
        var player1 = (player2 ==='O'?'X':'O'); 
    }

    playerChoice=[player1,player2];
    for(var i=1;i<=playerChoice.length;i++)
        document.querySelector(".player"+i).innerHTML="player"+i+" has chosen "+playerChoice[i-1];
    return randomPlayer;
}

document.addEventListener("keydown",function(){
    currentPlayer = chooseRandomPlayer();
    document.querySelector("h1").innerHTML="Player "+currentPlayer+" make a move";
});

function changeBackgroundColor(gameState)
{
    if(gameState === "win" || gameState === "draw")
    {
        document.querySelector("body").style.backgroundColor = "yellow";
    }
    else
        document.querySelector("body").style.backgroundColor = "grey";
}
function playAudio(fileName)
{
    var audio = new Audio("sounds/"+fileName+".mp3");
    audio.play();
}

function resetBoard()
{
    changeBackgroundColor("reset");
    document.querySelector("h1").innerHTML = "Press any key to Start the Game";
    var blocks=document.querySelectorAll(".square");
    for(var i=0;i<blocks.length;i++)
    {
        blocks[i].innerHTML = '';
        blocks[i].style.backgroundColor = "white";
    }
    for(var i=1;i<=playerChoice.length;i++)
    {
        document.querySelector(".player"+i).innerHTML="";
        playerChoice[i-1]=".";
    }
}

function checkBlocks(blocks,choice)
{
    for(var i=0;i<blocks.length;i++)
    {
        if(blocks[i].innerHTML != choice)
            return false;
    }
    return true;
}
function checkIfWin(choice){
    for(var i=1;i<=3;i++)
    {
        var blocksInRow = document.querySelectorAll(".row"+i);
        if(checkBlocks(blocksInRow,choice))
            return true;
        var blocksInCol = document.querySelectorAll(".col"+i);
        if(checkBlocks(blocksInCol,choice))
            return true;
    }

    var blockInDiag1 =document.querySelectorAll(".diag1");
    if(checkBlocks(blockInDiag1,choice))
        return true;
    var blockInDiag2 =document.querySelectorAll(".diag2");
    if(checkBlocks(blockInDiag2,choice))
        return true;
    return false;
}

function isDraw()
{
    var blocks=document.querySelectorAll(".square");
    for(var i=0;i<blocks.length;i++)
    {
        if(blocks[i].innerHTML !== 'O' && blocks[i].innerHTML !== 'X')
            return false;
    }

    return true;
}

function updateScore(state)
{
    if(state === "win")
    {
        var currentScore = document.querySelector(".WinsPlayer"+currentPlayer).textContent;
        currentScore = parseInt(currentScore,10);
        currentScore+=1;
        document.querySelector(".WinsPlayer"+currentPlayer).textContent=currentScore;
        return;
    }
    var secondPlayer=1;
    if(currentPlayer === 1)
    {
        secondPlayer = 2;
    }
    var anotherScore = document.querySelector(".WinsPlayer"+secondPlayer).textContent;
    anotherScore+=1;
    document.querySelector(".WinsPlayer"+secondPlayer).textContent=anotherScore;
}

/* checks if the player clicked on already clicked block */
function IsWrongSquare(squareBlock)
{
    if(squareBlock.innerHTML === "")
        return false;
    return true;
}

var boardSquares = document.querySelectorAll(".square");

for(var i=0;i<boardSquares.length;i++)
{
    boardSquares[i].addEventListener("click",function(){
        if(!IsWrongSquare(this)){
            this.style.backgroundColor = playerColors[currentPlayer-1];
            this.innerHTML = playerChoice[currentPlayer-1];
            playAudio(playerColors[currentPlayer-1]);
            $(this).fadeOut(50).fadeIn(50);
            if(checkIfWin(this.innerHTML))
            {
                document.querySelector("h1").innerHTML="Player "+currentPlayer+" Wins!";
                changeBackgroundColor("win");
                playAudio("win");
                updateScore("win");

                setTimeout(function(){
                    resetBoard();
                },2000);
            }
            else
            {
                if(isDraw())
                {
                    document.querySelector("h1").innerHTML=" It's Draw";
                    playAudio("draw");
                    changeBackgroundColor("draw");
                    updateScore("draw");
                    setTimeout(function(){
                        resetBoard();
                    },2000);
                }
                else{
                    if(currentPlayer===1)
                        currentPlayer=2;
                    else
                        currentPlayer=1;
                        document.querySelector("h1").innerHTML="Player "+currentPlayer+" make a move";
                }
            }
        }
        else
        {
            alert("player"+currentPlayer+" Invalid Move try again!");
        }
    });
}