export default function main(){

    const users = {

    }
    // não preciso dessa função, quase certeza;
    function checkMessage(userId){

        let text = document.getElementById("writeMessage").value;

        users[userId].sent.push(text);

        if(text != null){

            createMyBox(text);
        }
        document.getElementById("writeMessage").value = null;
    } 

    var localBoxes = 0;
    // tenhoq faze as text boxes serem geradas de acordo com o numero das mensagens em users[userId].sent/received;
    function createMyBox(message){

        let newChatBox = document.createElement("div");
        newChatBox.setAttribute("class", "myChatBox");
        let paragraph = document.createElement("p");
        
        newChatBox.setAttribute("id", `chatBox${localBoxes}`);
        document.getElementById("myMessages").appendChild(newChatBox);
        let lastChatBox = document.getElementById(`chatBox${localBoxes}`);
        lastChatBox.appendChild(paragraph);
        
        paragraph.innerHTML = message;

        localBoxes++;
    }

    function receiveMessage(message){

        const userId = message.userId;

        users[userId].received.push(message);
        console.log("message received");
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