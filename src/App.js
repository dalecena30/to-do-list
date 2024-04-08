import React, { useState, useEffect } from "react";
import "./App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentItem, setCurrentItem] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { task: inputValue, itemList: [] }]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleItemClick = (index) => {
    const clickedTodo = todos[index];
    alert(`Clicked: ${clickedTodo.task}`);
  };

  const handleItemInputChange = (e) => {
    setCurrentItem(e.target.value);
  };

  const handleAddItem = (index) => {
    if (currentItem.trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].itemList.push({ name: currentItem, done: false });
      setTodos(newTodos);
      setCurrentItem("");
    }
  };

  const handleToggleItem = (todoIndex, itemIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].itemList[itemIndex].done =
      !newTodos[todoIndex].itemList[itemIndex].done;
    setTodos(newTodos);
  };

  const calculateTotalPercentage = () => {
    if (todos.length === 0) return 0;

    const totalItems = todos.reduce(
      (acc, todo) => acc + todo.itemList.length,
      0
    );
    const completedItems = todos.reduce(
      (acc, todo) => acc + todo.itemList.filter((item) => item.done).length,
      0
    );

    return (completedItems / totalItems) * 100;
  };

  useEffect(() => {
    // Calculate total percentage whenever todos or their items change
    console.log("Todos or items changed, recalculating total percentage...");
  }, [todos]);

  return (
    <div className="todo-list">
      <div className="title-container">
        <h2>To-Do List</h2>
        <p>Total Completion: {calculateTotalPercentage().toFixed(2)}%</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <ul>
        {todos.map((todo, todoIndex) => {
          return (
            <li key={todoIndex}>
              <div onClick={() => handleItemClick(todoIndex)}>{todo.task}</div>
              <input
                type="text"
                placeholder="Add an item"
                value={currentItem}
                onChange={handleItemInputChange}
              />
              <button onClick={() => handleAddItem(todoIndex)}>Add Item</button>
              <ul>
                {todo.itemList.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => handleToggleItem(todoIndex, itemIndex)}
                    />
                    <span className={item.done ? "done" : ""}>{item.name}</span>
                  </li>
                ))}
              </ul>
              <i
                className="fas fa-trash-alt delete-icon"
                onClick={() => handleDeleteTodo(todoIndex)}
              ></i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
