import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {postBarcode, postBook} from '../../fetches/BookFetch';
import MyBookDetail from '../../components/myBooksPage/MyBookDetail'

const AddBook = ({currentUser}) => {

  const [newBook, setNewBook] = useState({});
  const [barcode, setBarcode] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (barcode.length === 13) {
      postBarcode(barcode, currentUser)
      .then(data => setNewBook(data))
      .then(setSaved(false))
    }
  }, [barcode])

  const handleSubmit = (event) => {
      event.preventDefault();
      setBarcode(event.target.isbn.value);
  }

  const handleSaveBook = (event) => {
    event.preventDefault();
    postBook(newBook, currentUser.id)
    .then(data => setNewBook({}))
    .then(setSaved(true))
    .then(setBarcode(""))
  }

  if (Object.keys(currentUser).length === 0 && currentUser.constructor === Object){
    return <p>Please select a user to continue</p>
  }

  if (Object.keys(newBook).length === 0 && newBook.constructor === Object){
    return (
      <>
        <h1>newBook</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="isbn" placeholder="ISBN Number" />
          <button type="submit">Lookup Barcode</button>
        </form>
        { saved ? <p> Saved to Your Book Collection</p> : <></>}
      </>
    )
  } else {
    return (
      <>
        <h1>newBook</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="isbn" placeholder="ISBN Number" />
          <button type="submit">Lookup Barcode</button>
        </form>
        <MyBookDetail book={newBook} />
        <button onClick={handleSaveBook}>Save To My Books</button>
      </>
    )
  }

}

export default AddBook;
