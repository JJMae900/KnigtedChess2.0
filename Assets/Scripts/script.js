
/**
 * *******************************************
 * All Code here is owned by Jordan M. Sahs. *
 *                                           *
 * Please contact me here: jjmae900@gmail.com*
 *                                           *
 * *******************************************
 * */
var clear = false;
var hints = [];

var playerChose = false;
var playerPicked = "-1-1";
var piece = null;

var d = document;

var disableHints = false;
var gameWin = false;

var chosenPiece = "";
var replacement = false;

var turnorder = 0;

//Sounds
var click = new Audio("Assets/sounds/click.mp3")
var move = new Audio("Assets/sounds/move.mp3");
var cancel = new Audio("Assets/sounds/cancel.mp3");
var restart = new Audio("Assets/sounds/reset.mp3");
var erase = new Audio("Assets/sounds/clear.mp3");
var anew = new Audio("Assets/sounds/replace.mp3");

//Codes
const Z = "bKnig";
const N = "bKing";
const B = "bPawn";
const W = "wPawn";
const K = "wKing";
const H = "wKnig";

var board = [];
var winTimer = setInterval(win, 1000 / 60);

/**
 * Gets the Current Board State and intilizes it into the
 * Board Array.
 * */
function getBoardState()
{
    for (var i = 0; i < 8; i++)
    {
        for (var j = 0; j < 8; j++)
        {
            board[i.toString() + j.toString()] = d.getElementById(i.toString() + j.toString()).style.backgroundImage.substring(12, 17);
        }
    }
}

/**
 * When a replace button is clicked it sets a chosen piece
 * to be used to replace a Tile.
 *
 * @param piece The piece type to use to replace.
 */
function replace(piece)
{
    replacement = true;
    chosenPiece = piece;
}

/**
 * When a Tile is clicked on the Chess Board it calls this function.
 * This Function determines what happens to that piece.
 *
 * @param tile The Chess tile that was clicked.
 */
function clicked(tile)
{
    let exit = false;

    if (replacement)
    {
        d.getElementById(tile).style.backgroundImage = "url(images/" + chosenPiece + ".png)";
        replacement = false;
        exit = true;
        anew.play();
    }
    else if ((d.getElementById(tile).style.backgroundImage === "none" && !playerChose) || gameWin)
    {
        exit = true;
    }
    else if (clear)
    {
        d.getElementById(tile).style.backgroundImage = "none";
        d.getElementById("clearButton").style.border = "none";
        clear = false;
        erase.play();
        exit = true;
    }

    if (exit)
    {
        return;
    }

    turnOrder(tile);
}

function turnOrder(tile)
{
    //Turn Order
    if (d.getElementById(tile).style.backgroundImage !== "none" && !playerChose)
    {
        piece = d.getElementById(tile).style.backgroundImage.substring(12, 17);

        if (turnorder % 2 === 0 && piece.substring(0, 1) !== "w")
        {
            return;
        }
        else if (turnorder % 2 === 1 && piece.substring(0, 1) !== "b")
        {
            return;
        }
    }

    if (tile !== playerPicked && !playerChose) //Player Chose
    {
        d.getElementById(tile).style.border = "solid 3px red";
        playerPicked = tile;
        playerChose = true;

        piece = d.getElementById(tile).style.backgroundImage.substring(12, 17);

        chessHints(piece, tile);

        click.play();
    }
    else if (tile === playerPicked && playerChose) //Player Cancel
    {
        d.getElementById(tile).style.border = "solid 3px grey";
        playerPicked = "-1-1";
        playerChose = false;
        cancel.play();
    }
    else if (tile != playerPicked && playerChose)
    {
        d.getElementById(playerPicked).style.border = "solid 3px grey";
        d.getElementById(playerPicked).style.backgroundImage = "none";
        d.getElementById(tile).style.backgroundImage = "url(images/" + piece + ".png)";
        playerPicked = "-1-1";
        playerChose = false;
        turnorder += 1
        move.play();
    }
}

/**
 * When the reset button is clicked, this method is called.
 *
 * This method sets the gamestate to exactly what it is when
 * the page first loaded.
 * */
function reset()
{
    d.getElementById("00").style.backgroundImage = "url(images/bRook.png)";
    d.getElementById("01").style.backgroundImage = "url(images/bBish.png)";
    d.getElementById("02").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("03").style.backgroundImage = "url(images/bQuee.png)";
    d.getElementById("04").style.backgroundImage = "url(images/bKing.png)";
    d.getElementById("05").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("06").style.backgroundImage = "url(images/bBish.png)";
    d.getElementById("07").style.backgroundImage = "url(images/bRook.png)";

    d.getElementById("10").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("11").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("12").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("13").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("14").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("15").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("16").style.backgroundImage = "url(images/bKnig.png)";
    d.getElementById("17").style.backgroundImage = "url(images/bKnig.png)";

    
    d.getElementById("20").style.backgroundImage = "none";
    d.getElementById("21").style.backgroundImage = "none";
    d.getElementById("22").style.backgroundImage = "none";
    d.getElementById("23").style.backgroundImage = "none";
    d.getElementById("24").style.backgroundImage = "none";
    d.getElementById("25").style.backgroundImage = "none";
    d.getElementById("26").style.backgroundImage = "none";
    d.getElementById("27").style.backgroundImage = "none";
    
    d.getElementById("30").style.backgroundImage = "none";
    d.getElementById("31").style.backgroundImage = "none";
    d.getElementById("32").style.backgroundImage = "none";
    d.getElementById("33").style.backgroundImage = "none";
    d.getElementById("34").style.backgroundImage = "none";
    d.getElementById("35").style.backgroundImage = "none";
    d.getElementById("36").style.backgroundImage = "none";
    d.getElementById("37").style.backgroundImage = "none";

    d.getElementById("40").style.backgroundImage = "none";
    d.getElementById("41").style.backgroundImage = "none";
    d.getElementById("42").style.backgroundImage = "none";
    d.getElementById("43").style.backgroundImage = "none";
    d.getElementById("44").style.backgroundImage = "none";
    d.getElementById("45").style.backgroundImage = "none";
    d.getElementById("46").style.backgroundImage = "none";
    d.getElementById("47").style.backgroundImage = "none";

    d.getElementById("50").style.backgroundImage = "none";
    d.getElementById("51").style.backgroundImage = "none";
    d.getElementById("52").style.backgroundImage = "none";
    d.getElementById("53").style.backgroundImage = "none";
    d.getElementById("54").style.backgroundImage = "none";
    d.getElementById("55").style.backgroundImage = "none";
    d.getElementById("56").style.backgroundImage = "none";
    d.getElementById("57").style.backgroundImage = "none";

    d.getElementById("60").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("61").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("62").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("63").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("64").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("65").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("66").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("67").style.backgroundImage = "url(images/wKnig.png)";

    d.getElementById("70").style.backgroundImage = "url(images/wRook.png)";
    d.getElementById("71").style.backgroundImage = "url(images/wBish.png)";
    d.getElementById("72").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("73").style.backgroundImage = "url(images/wQuee.png)";
    d.getElementById("74").style.backgroundImage = "url(images/wKing.png)";
    d.getElementById("75").style.backgroundImage = "url(images/wKnig.png)";
    d.getElementById("76").style.backgroundImage = "url(images/wBish.png)";
    d.getElementById("77").style.backgroundImage = "url(images/wRook.png)";
    
    restart.play();

    playerChose = false;
    playerPicked = "-1-1";
    turnorder = 0;

    for (var i = 0; i <= 7; i++)
    {
        for (var j = 0; j <= 7; j++)
        {
            d.getElementById(i.toString() + j.toString()).style.border = "solid 3px grey";
        }
    }

    hints = [];

    d.getElementById("playerOneWin").style.visibility = "hidden";
    d.getElementById("playerTwoWin").style.visibility = "hidden";

    if (playerPicked !== "-1-1")
    {
        d.getElementById(playerPicked).style.border = "solid 3px grey";
    }
}

/**
 * When the Clear Tile Button is clicked, this method is called.
 * It clears a Tile on the Chessboard based on user click.
 * */
function clearTile()
{
    d.getElementById("clearButton").style.border = (clear) ? "none" : "3px solid red";
    clear = !clear;
}
