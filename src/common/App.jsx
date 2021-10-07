import React from "react";
import { useSelector } from "react-redux";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { loadBooks } from "../redux/actions";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookCard from "./BookCard";
function App() {
  const dispatch = useDispatch();
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [select, setSelect] = useState("all");
  const errorParams = useSelector((state) => state.books.errorParams);
  const errorLoad = useSelector((state) => state.books.errorLoad);
  const [loading, setLoading] = useState(false);
  const load = useSelector((state) => state.books.loading);
  const cards = useSelector((state) => state.books.cards);
  const KEY = useSelector((state) => state.books.key);
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error("max results must be between 1 and 40");
    } else {
      dispatch(loadBooks(query, maxResults, startIndex, KEY, select));
      if (errorParams.isError) {
        toast.error(errorParams.title);
      } else if (errorLoad.isError) {
        toast.error(errorLoad.title);
      }
    }
  };
  const changeSelect = (e) => {
    setSelect(e.target.value);
  };
  console.log(select);
  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        {/*overlay*/}
        <div className="filter">1</div>
        <h1
          className="display-2 text-center text-white mb-3"
          style={{ zIndex: 2 }}
        >
          Google books
        </h1>
        <div style={{ width: "60%", zIndex: 2 }}>
          <InputGroup size="lg" className="mb-3">
            <select name="" id="" value={select} onChange={changeSelect}>
              <option value="all">all</option>
              <option value="art">art</option>
              <option value="biograpfy">biography</option>
              <option value="computers">computers</option>
              <option value="history">history</option>
              <option value="medical">medical</option>
              <option value="poetry">poetry</option>
            </select>
            <Input
              placeholder="serch books"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={handleSubmit}>
                search
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup className="ml-5">
              <Label for="maxResults">Max results</Label>
              <input
                type="number"
                id="maxResults"
                placeholder="Max results"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="ml-5">
              <Label for="startIndex">startIndex</Label>
              <input
                type="number"
                id="startIndex"
                placeholder="startIndex"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };
  const handleCards = () => {
    const items = cards.map((item) => {
      let thumbnail = "";
      if (item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }

      return (
        <div className="col-lg-4" key={item.id}>
          <BookCard
            thumbnail={thumbnail}
            title={item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.language}
            authors={item.volumeInfo.authors}
            publisher={item.volumeInfo.publisher}
            publishedDate={item.volumeInfo.publishedDate}
            description={item.volumeInfo.description}
            previewLink={item.volumeInfo.previewLink}
            infoLink={item.volumeInfo.infoLink}
            category={item.volumeInfo.categories}
          />
        </div>
      );
    });
    if (load) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner
            children=""
            color="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      );
    } else {
      return (
        <div className="container mt-5">
          <div className="row">{items}</div>
        </div>
      );
    }
  };

  return (
    <div className="w-100vh h-100vh">
      {mainHeader()}
      {cards.length === 0 ? (
        ""
      ) : (
        <div className="ml-3 counter-books">найденое книг: {cards.length}</div>
      )}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}

export default App;
