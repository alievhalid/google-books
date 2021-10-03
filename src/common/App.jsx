import React, { useEffect, useSelector } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
  import { useDispatch } from "react-redux";
  import { loadBooks } from "../redux/actions";
  import { useState } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const KEY = useSelector((state) => state.key);
  const errorParams = useSelector((state) => state.errorParams);
  const errorLoad = useSelector((state) => state.errorLoad);
  const handleSubmit = () => {
    setLoading(true);
    if(maxResults > 40 || maxResults < 1) {
      toast.error('max results must be between 1 and 40')
    } else {
      dispatch(loadingBooks(query, maxResults, startIndex, KEY));
      if (errorParams.isError) {
        toast.error(errorParas.title);
      } else if (errorLoad.isError) {
        toast.error(errorLoad.title)
      }
    }
  };
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

  return (
    <div>
      {mainHeader()}
      <ToastContainer />
    </div>
  );
}

export default App;
