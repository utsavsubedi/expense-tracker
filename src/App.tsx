import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useState } from 'react';
import { produce } from 'immer';

import './App.css'
import Form from './components/Form'
import Table from './components/Table'

interface tableItem {
  description: string;
  amount: number;
  category: string;
}



function App() {
  const [allItems, setAllItems] = useState<tableItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<tableItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['food', 'transport', 'entertainment', 'other'];

  const handleSubmit = (data: tableItem) => {
    setAllItems(
      produce((draft: tableItem[]) => {
        draft.push(data);
      }, allItems)
    );
    if (activeCategory === 'all' || activeCategory === data.category) {
      setFilteredItems(
        produce((draft: tableItem[]) => {
          draft.push(data);
        }, allItems)
      );
    }

  };

  const handleDelete = (index: number) => {
    const itemToDelete = allItems[index];
    setAllItems(
      produce((draft: tableItem[]) => {
        draft.splice(index, 1);
      }, allItems)
    );
    if (activeCategory === 'all' || activeCategory === itemToDelete.category) {
      setFilteredItems(
        produce((draft: tableItem[]) => {
          draft.splice(index, 1);
        }, filteredItems)
      );
    }


  };

  const filterItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(event.target.value);
    const selectedCategory = event.target.value;
    if (selectedCategory === 'all') {
      setFilteredItems([...allItems]);
    } else {
      const filtered = allItems.filter(item => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Form and Table</h1>
        <Form categories={categories} handleSubmit={handleSubmit} />
        <Table
          filterItems={filterItems}
          categories={categories}
          items={filteredItems}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;