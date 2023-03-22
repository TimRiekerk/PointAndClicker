document.getElementById("mainTitle").innerText = "Point and click adventure";

const offsetCharacter = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");


gameWindow.onClick = function(e){

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left; //xposition of the element
    var Y = e.clientY - rect.right; //yposition of the element
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";
    console.log(e.clientX);

    switch (e.target.id) {
        case "door":
            console.log("There is nothing here");
            break;
        case "doo2":
            console.log("Lets go inside the house?");
            break;
        default:
            console.log("there is nothing here, aapje?");
            break;

    }
}