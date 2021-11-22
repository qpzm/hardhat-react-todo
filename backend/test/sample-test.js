const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Todos", function() {
  it("Should create todo and update its text", async function() {
    const Todos = await ethers.getContractFactory("Todos");
    const todos = await Todos.deploy();
    await todos.deployed();

    await todos.create("First Todo");
    const [text, ] = await todos.get(0);
    expect(text).to.equal("First Todo");

    const updateTodoTx = await todos.update(0, "Updated Todo");
    await updateTodoTx.wait();

    const [updatedText, ] = await todos.get(0);
    expect(updatedText).to.equal("Updated Todo");
  });
});
