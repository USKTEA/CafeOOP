  class Cafe {
    constructor() {
      this.customer = null;
      this.menu = new Menu();
      this.casher = new Casher(1000, this);
      this.baristar = new Baristar(['Americano','Cappucino','MochaGold','Kanu','CoffeeWithoutWater']);
      this._cafeMakePair();
    }

    cafeAddCustomer(number) {
      for (let i = 0; i < number; i++) {
        this.customer = new Customer(Math.floor(Math.random() * 100), i, this.casher, this);
      }
    }

    _cafeMakePair() {
      this.casher.baristar = this.baristar;
      this.baristar.casher = this.casher;
    }
  }

  class Customer {
    constructor(money, number, casher, cafe) {
      this.money = money;
      this.number = number;
      this.casher = casher;
      this.cafe = cafe;
      this.coffee = null;
      this._setCasher(this);
    }

    _setCasher(customer) {
      this.casher.setCustomer(customer);
    }

    startOrder() {
      const menu = new Menu();
      const coffeeList = menu._giveCoffeList();

      this._chooseCoffee(coffeeList);
    }

    _chooseCoffee(coffeeList) {
      let coffeeListIndex = 0;

      for (const item in coffeeList) {
        coffeeListIndex += 1;
      }

      const randomNumber = Math.floor(Math.random() * coffeeListIndex);
      const [coffee, price] = Object.entries(coffeeList)[randomNumber];

      this._checkMoney(price, coffee);
    }

    _checkMoney(price, coffee) {
      if (price > this.money) {
        console.log('Fool me, even can\'t take a cup of coffee');
        return this._leaveCafe();
      }

      this._makeOrder(coffee, price);
    }

    _leaveCafe() {
      setTimeout(() => console.log('Im back'), 99999999);
    }

    _makeOrder(coffee, price) {
      this.money -= price;
      this.casher.getOrder(coffee, price);
    }

    takeCoffee(coffee) {
      this.coffee = coffee;
      this.checkMoneyAndCoffee();
    }

    checkMoneyAndCoffee() {
      console.log(`I have ${this.money} won and a cup of ${this.coffee.coffee}`);
    }
  }

  class CoffeeMenu {
    #coffeeList = {
      'Americano': 100,
      'Cappucino': 200,
      'MochaGold': 300,
      'Kanu': 30,
      'CoffeeWithoutWater': 5
    }

    constructor() {}

    _getCoffeList() {
      return this.#coffeeList;
    }
  }

  class Menu {
    #coffeList = new CoffeeMenu()._getCoffeList();

    constructor() {}

    _giveCoffeList() {
      return this.#coffeList;
    }
  }

  class Casher {
    constructor(money, cafe) {
      this.money = money;
      this.cafe = cafe;
      this.baristar = null;
    }

    setCustomer(customer) {
      this.customer = customer;
    }

    getOrder(coffee, price) {
      this.money += price;
      this._deliverOrderToBaristar(coffee);
    }

    _deliverOrderToBaristar(coffee) {
      this.baristar.makeCoffee(coffee);
    }

    deliverCoffeeToCustomer(coffee) {
      this.customer.takeCoffee(coffee);
    }
  }

  class Baristar {
    constructor(recipe) {
      this.recipe = recipe;
      this.casher = null;
    }

    makeCoffee(coffee) {
      if (this.recipe.findIndex(cof => cof === coffee)+1) {
        const Customercoffee = new Coffee(coffee);

        this._deliverCoffeeToCahser(Customercoffee);
      } else {
        console.log(`I cant make that ${coffee}`);
      }
    }

    _deliverCoffeeToCahser(coffee) {
      this.casher.deliverCoffeeToCustomer(coffee);
    }
  }

  class Coffee {
    constructor(coffee) {
      this.coffee = coffee;
      this.amount = 50;
    }
  }

  const myCafe = new Cafe();
  const customer = new Customer(1090, 1, myCafe.casher, myCafe);
  customer.startOrder();
