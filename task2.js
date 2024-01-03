const cooks = new Map([
    ["Пицца", "Виктор"],
    ["Суши", "Ольга"],
    ["Десерт", "Дмитрий"],
]);

const menu = new Map([
    ["Пицца", new Set(["Маргарита", "Пепперони", "деревенская"])],
    ["Суши", new Set(["Филадельфия", "Калифорния", "Сеякемаки"])],
    ["Десерт", new Set(["Тирамису", "Чизкейк"])]
]);

// Посетитель ресторана.
class Client {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

class Manager {
    finalOrder = new Map();
    count;
    newOrder(client, ...order) {
        this.count = 0
        order.forEach((element) => {
            if (menu.get(element.type).has(element.name)) {
                this.count++;
            }
        });
        if (this.finalOrder.get(client) === undefined) {
            if (this.count === order.length) {
                this.finalOrder.set(client, order);
            }
        } else {
            if (this.count === order.length) {
                this.finalOrder.get(client).push(...order);
            }
        }
        if (this.count === order.length) {
            console.log(`Клиент ${client.firstname} заказал:`);
            const arr = formatArray(this.finalOrder.get(client));
            arr.forEach((e) => {
                const str = `${e.type} "${e.name}" - ${e.quantity}; готовит повар ${cooks.get(e.type)}`
                console.log(str);
            })
        }
    }
}

const formatArray = (array) => {
    let str = "";
    let index;
    for (let i = 0; i < array.length; i++) {
        str = array[i].name;
        for (let j = i + 1; j < array.length; j++) {
            if (str === array[j].name) {
                array[i].quantity = array[i].quantity + array[j].quantity;
                index = j
            }
        }
    }
    delete array[index]
    return array;
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
    new Client("Алексей", "Алексеев"),
    { name: "Пепперони", quantity: 2, type: "Пицца" },
    { name: "Тирамису", quantity: 1, type: "Десерт" }
);
// Вывод:
// Клиент Алексей заказал: 
// Пицца "Пепперони" - 2; готовит повар Виктор
// Десерт "Тирамису" - 1; готовит повар Дмитрий

// ---
console.log("--------------");
const clientMaria = new Client("Мария", "Смирнова");
manager.newOrder(
    clientMaria,
    { name: "Калифорния", quantity: 5, type: "Суши" },
    { name: "Маргарита", quantity: 3, type: "Пицца" }
);
// Вывод:
// Клиент Мария заказал: 
// Суши "Калифорния" - 5; готовит повар Ольга
// Суши "Маргарита" - 3; готовит повар Виктор
console.log("--------------");
const clientIrina = new Client("Ирина", "Пупкина");
manager.newOrder(
    clientIrina,
    { name: "Чизкейк", quantity: 1, type: "Десерт" }
);
// Вывод:
// Клиент Ирина заказал:
// Суши "Чизкейк" - 5; готовит повар Дмитрий
