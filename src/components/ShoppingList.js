import React, { useState,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //fetch items from API
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        setItems(items);
      });
  },[]) 

  //Add function to handle deleteItem
  function handleDeletItem(DeletedItem){
    const updatedItems = items.filter((item) => item.id !== DeletedItem.id);
    setItems(updatedItems);

  }

  //Add function to handle updateItem
  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem;
      }else{
        return item;
      }
    });
    setItems(updatedItems);
  }

  //Add function to handle newItem
  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} 
          item={item}
         onUpdateItem={handleUpdateItem} 
         onDeletItem={handleDeletItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
