import React, { useState } from "react";
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from "reactstrap";

function BookCard(props) {
  console.log(props.category);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <Card style={{ width: "233px" }} className="m-auto mt-4 ">
      <CardImg
        top
        style={{ width: "100%", height: "233px" }}
        src={props.thumbnail}
        alt="card image"
      />
      <CardBody>
        <CardTitle className="card-title">{props.title}</CardTitle>
        <Button onClick={toggle} className="btn btn-secondary">
          More info
        </Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle} className="border-radius-3">
        <div className="modal-header d-flex justify-content-center">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            {props.title}
          </h5>
          <button
            aria-label="Close"
            className="close btn"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>x</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img
              src={props.thumbnail}
              alt={props.title}
              style={{ height: "233px" }}
            />
            <div>
              <p>кол-во страниц: {props.pageCount}</p>
              <p>язык: {props.language}</p>
              <p>автор: {props.authors}</p>
              <p>издатель: {props.publisher}</p>
              <p>дата: {props.publishedDate}</p>
            </div>
          </div>
          <div className="mt-5">{props.description}</div>
        </div>
        <div className="modal-footer">
          <div className="left-slide">
            <a
              href={props.previewLink}
              className="btn-link"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              просмотреть
            </a>
          </div>
          <div className="divider">
            <div className="right-slide">
              <a
                href={props.infoLink}
                className="btn-link"
                color="default"
                type="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                информация
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

export default BookCard;
