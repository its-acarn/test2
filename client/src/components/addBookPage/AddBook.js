import React from 'react';
import {useState, useEffect} from 'react';
import {postBarcode} from '../../fetches/BookFetch';

const AddBook = ({currentUser}) => {

  const [newBook, setNewBook] = useState({});
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    if (barcode.length === 13) {
      postBarcode(barcode, currentUser)
      .then(data => console.log(data))
    }
  }, [barcode])

  const handleSubmit = (event) => {
      event.preventDefault();
      setBarcode(event.target.isbn.value);
  }
  return (
    <>
      <h1>newBook</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="isbn" placeholder="ISBN Number" />
        <button type="submit">Lookup Barcode</button>
      </form>
    </>
  )
}

export default AddBook;
