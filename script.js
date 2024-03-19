import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c17c3-default-rtdb.firebaseio.com/"
}

// Initializing Database
const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const shoppingListDb = ref(dataBase, "Shopping List") 

// Dom Elements
const inputBtn = document.getElementById('input-btn')
const addBtn = document.getElementById('add-btn')
const shoppingList = document.getElementById('shopping-list')

addBtn.addEventListener('click', () => {
    let inputValue = inputBtn.value

    if (inputValue !== "") {
        push(shoppingListDb, inputValue)
        clearInput()
    } else {
        console.log('Input value cannot be empty.')
    }
})

// Displaying Items on the cart
onValue(shoppingListDb, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())

        clearList()

        for (let i = 0; i < itemsArr.length; i++){
            let currentItem = itemsArr[i]

            let itemValue = currentItem[1]
            let itemId = currentItem[0]

            addItem(currentItem)
        }
    } else {
        shoppingList.innerHTML = 'No Items here...'
        shoppingList.style.color = 'black';
          
    }
})

function addItem(item) {
    let itemId = item[0]
    let itemValue = item[1]

    let newElement = document.createElement('li')

    newElement.textContent = itemValue

    newElement.addEventListener('click', () => {
        let itemLocation = ref(dataBase, `Shopping List/${itemId}`)
        remove(itemLocation)
    })

    shoppingList.append(newElement)
}

function clearInput() {
    inputBtn.value = ""
}

function clearList() {
    shoppingList.innerHTML = ""
}