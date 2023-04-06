document.getElementById("mainTitle").innerText = "Made By Tim Riekerk";

const offsetCharacter = 16;
const offsetY = 40;

const gameWindow = document.getElementById("gameWindow");

const sec = 1000;

//Main character
const mainCharacter = document.getElementById("mainCharacter");
const characterAudio = document.getElementById("characterAudio");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

//Counter character
const counterSpeech = document.getElementById("counterSpeech");
const counterAudio = document.getElementById("counterAudio");
const counterPortrait = document.getElementById("counterCharacter");

//inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList");

gameWindow.onclick = function (e) {
    if (counterSpeech.style.opacity == 0 && mainCharacterSpeech.style.opacity == 0) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";

        console.log(e.target.id);


switch (e.target.id) {
    case "door1":
        //something insert here
        if (checkItem("rusty key")) {
            showMessage(mainCharacterSpeech, characterAudio, "Wow this keys fits! Lets go inside!..");
            setTimeout(showMessage, 4 * sec, mainCharacterSpeech, characterAudio, "OMG! There is a ruby here.");

            setTimeout(getItem, 4 * sec, "ruby", "ruby");
        } else {
            showMessage(mainCharacterSpeech, characterAudio, "The door is closed,<br> I need a key to open it...");
        }

        break;
    case "signToLeft":
        //something insert here
        showMessage(mainCharacterSpeech, characterAudio, "Okay that house on the left<br>that's the house of the town wizard.");
        break;
    case "stone":
        if (!checkItem("ruby")) {
            showMessage(mainCharacterSpeech, characterAudio, "Some sort of pilar.. And there are runes embeded.");
        } else {
            showMessage(mainCharacterSpeech, characterAudio, "Wow. I feel light headed..");
        }
        break;
    case "statue":
        counterPortrait.style.opacity = 1;
        showMessage(mainCharacterSpeech, characterAudio, "Wow, lok at this statue!");
        setTimeout(showMessage, 4 * sec, counterSpeech, counterAudio, "Oh hello! Finaly someone to talk to :)");
        setTimeout(showMessage, 8 * sec, mainCharacterSpeech, characterAudio, "What do you mean? Statues are not supose to talk anyway..");
        setTimeout(showMessage, 12 * sec, counterSpeech, counterAudio, "You should go down to the bunker");
        setTimeout(function () { counterPortrait.style.opacity = 0; }, 16 * sec);
        setTimeout(showMessage, 16 * sec, mainCharacterSpeech, characterAudio, "Wait! Why?");
        setTimeout(showMessage, 16 * sec, mainCharacterSpeech, characterAudio, "That's wierd, but maybe I sould go to the bunker?");
        break;
    case "crate":
        if (!checkItem("rusty key")) {
            getItem("rusty key", "rustyKey");
            showMessage(mainCharacterSpeech, characterAudio, "Wow I found a rusty key!<br>Must been lying here for ages..");
            setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
        } else {
            showMessage(mainCharacterSpeech, characterAudio, "Nope nothing here...");
            setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
        }

        break;
    default:
        // do something when it doesn't have a case
        hideMessage(mainCharacterSpeech, characterAudio);
        hideMessage(counterSpeech, counterAudio);
        break;
        }
    }
}


function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerHTML = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
    targetBalloon.innerHTML = "...";
}

function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }

}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(itemName, itemId) {
    //Make a list item from scratch and store it in a variable
    let listItem = document.createElement("li");

    //Give List Item an ID name
    listItem.id = itemId;

    //fill that list item with value of inputfield
    listItem.appendChild(document.createTextNode(itemName));

    //find UL with id todoContainer and attach the list item to it.
    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    //remove item in Array
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    //removes list element in HTML
    document.getElementById(itemId).remove();

}