export default function main(){

    const users = {

    }
    // não preciso dessa função, quase certeza;
    function checkMessage(userId){

        let text = document.getElementById("writeMessage").value;

        if(text != ""){
        
            users[userId].sent.push(text);
            createMyBox(text);
        }

        document.getElementById("writeMessage").value = null;
    }

    var myBoxes = 0;
    
    function createMyBox(message){

        let newChatBox = document.createElement("div");
        newChatBox.setAttribute("class", "myChatBox");
        let paragraph = document.createElement("p");
        
        newChatBox.setAttribute("id", `chatBox${myBoxes}`);
        document.getElementById("messages").appendChild(newChatBox);
        let lastChatBox = document.getElementById(`chatBox${myBoxes}`);
        lastChatBox.appendChild(paragraph);
        
        paragraph.innerHTML = message;

        myBoxes++;
    }

    var OUBoxes = 0;

    function createOUBox(message){

        let newChatBox = document.createElement("div");
        newChatBox.setAttribute("class", "othersChatBox");
        let paragraph = document.createElement("p");
        
        newChatBox.setAttribute("id", `oChatBox${OUBoxes}`);
        document.getElementById("messages").appendChild(newChatBox);
        let lastChatBox = document.getElementById(`oChatBox${OUBoxes}`);
        lastChatBox.appendChild(paragraph);
        
        paragraph.innerHTML = message.text;

        OUBoxes++;
    }

    function receiveMessage(message, userId){

        users[userId].received.push(message);

        console.log(users);
        createOUBox(message);
    }

    function addUser(command){

        const userId = command.userId;

        users[userId] = {
            sent: [],
            received: []
        }
    }

    function removeUser(command){

        const userId = command.userId;

        delete users[userId];
    }

    return{
        users,
        checkMessage,
        addUser,
        removeUser,
        receiveMessage
    }
}