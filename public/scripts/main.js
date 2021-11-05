export default function main(){

    const state = {

        users: {}
    }

    var localBoxes = -1;

    function createLocalBox(){

        localBoxes++;
        let message = document.getElementById("writeMessage").value;

        if(message != ""){

            let newChatBox = document.createElement("div");
            newChatBox.setAttribute("class", "myChatBox");
            let paragraph = document.createElement("p");
                
            newChatBox.setAttribute("id", `chatBox${localBoxes}`);
            document.getElementById("myMessages").appendChild(newChatBox);
            let lastChatBox = document.getElementById(`chatBox${localBoxes}`);
            lastChatBox.appendChild(paragraph);
            
            paragraph.innerHTML = message;

            document.getElementById("writeMessage").value = null;
        }
    }

    function addUser(command){

        const userId = command.userId;

        state.users[userId] = {
            sent: {},
            received: {}
        }
    }

    function removeUser(command){

        const userId = command.userId;

        delete state.users[userId];
    }

    return{
        state,
        createLocalBox,
        addUser,
        removeUser
    }
}