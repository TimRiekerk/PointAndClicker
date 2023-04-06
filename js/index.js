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
            removeItem("rusty key", "rustyKey")
            setTimeout(getItem, 4 * sec, "ruby", "ruby");
        } else {
            showMessage(mainCharacterSpeech, characterAudio, "The door is closed,<br> I need a key to open it...");
        }

        break;
    case "signToLeft":
        //something insert here
        showMessage(mainCharacterSpeech, characterAudio, "Okay that house on the left<br>that's the house of the town wizard.");
        break;
    case "statue":
        if (!checkItem("ruby")) {
            counterPortrait.style.opacity = 1;
            showMessage(mainCharacterSpeech, characterAudio, "Wow, lok at this statue!");
            setTimeout(showMessage, 4 * sec, counterSpeech, counterAudio, "Oh hello! Finaly someone to talk to :)");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, characterAudio, "Whaat? A statue that talks?.");
            setTimeout(showMessage, 12 * sec, counterSpeech, counterAudio, "Yes, I'm the magic statue. Could you find the ruby for me?");
            setTimeout(function () { counterPortrait.style.opacity = 0; }, 16 * sec);
            setTimeout(showMessage, 16 * sec, mainCharacterSpeech, characterAudio, "Yea Sure I'll do my best.");
            setTimeout(showMessage, 20 * sec, mainCharacterSpeech, characterAudio, "That was wierd, I need something to open that door!");
        } else {
            counterPortrait.style.opacity = 1;
            showMessage(mainCharacterSpeech, characterAudio, "Here, I found you're Ruby!");
            removeItem("ruby", "ruby")
            setTimeout(showMessage, 4 * sec, counterSpeech, counterAudio, "Wow you realy did it! Thank you!");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, characterAudio, "What now?");
            setTimeout(function () { counterPortrait.style.opacity = 0; }, 12 * sec);
            setTimeout(showMessage, 12 * sec, counterSpeech, counterAudio, "nothing... You're done dumbass.");
        }
        break;
    case "crate":
        if (!checkItem("rusty key")) {
            getItem("rusty key", "rustyKey");
            showMessage(mainCharacterSpeech, characterAudio, "Yay I found a key!<br>Maybe I could use this for the door?");
            setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
        } else {
            showMessage(mainCharacterSpeech, characterAudio, "I already have the key, maybe it could fit in the door?");
            setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
        }

        break;
    default:
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
    let listItem = document.createElement("li");

    listItem.id = itemId;

    listItem.appendChild(document.createTextNode(itemName));

    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();
}