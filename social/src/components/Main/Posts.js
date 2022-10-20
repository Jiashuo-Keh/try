import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { checkposts } from "../../actions/posts";
import Col from "react-bootstrap/Col";
import "../../css/post.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

const Posts = ({ posts, checkposts }) => {
  useEffect(() => {
    console.log("showData");
    showData(posts.slice(0, 3));

    console.log(posts[0]);
  }, [posts]);

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCom, setShowCom] = useState(false);
  const handleCloseCom = () => setShowCom(false);
  const handleShowCom = () => setShowCom(true);
  const [showedData, showData] = useState(posts.slice(0, 3));

  // each post contains author, timestamp, text, and at least three have images
  // a button to unfollow
  const changepage = (page) => {
    setCurrentPage(page);
    const PageIndex = page - 1;
    const firstIndex = PageIndex * 3;
    const lastIndex = PageIndex * 3 + 3;
    showData(posts.slice(firstIndex, lastIndex));
  };

  const post = showedData.map((po) => (
    <Col xs={6} md={4}>
      <Card className="cardpost" style={{ overflowY: "auto", height: 400 }}>
        <Card.Img className="postimg" variant="top" src={po.img} />
        <Card.Title>{po.title}</Card.Title>
        <span>Auther: {po.id}</span>
        <span>Date:{po.date}</span>
        <Card.Body>
          <Card.Text>
            {po.content}
            <br />
            <Button variant="outline-secondary" onClick={handleShow}>
              Edit
            </Button>
            <Button
              className="btn2"
              variant="outline-secondary"
              onClick={handleShowCom}
            >
              Comment
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

  let items = [];
  for (let number = 1; number <= posts.length / 3 + 1; number++) {
    items.push(
      <Pagination.Item
        onClick={() => changepage(number)}
        key={number}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Imgage</Form.Label>
              <Form.Control placeholder="Address" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCom} onHide={handleCloseCom}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowY: "auto", height: 350 }}>
            <Table striped>
              <tbody>
                <tr>
                  <td colSpan={2}>Fantanstic article!</td>
                  <td>Antonette</td>
                  <td>2022/10/16</td>
                </tr>
                <tr>
                  <td colSpan={2}>Fantanstic article!</td>
                  <td>Antonette</td>
                  <td>2022/10/16</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Fantanstic article!Multi-layered client-server neural-net
                  </td>
                  <td>Antonette</td>
                  <td>2022/10/16</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Form.Control as="textarea" rows={3} placeholder="New Comments" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCom}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseCom}>
            Submit Comments
          </Button>
        </Modal.Footer>
      </Modal>

      {post}
      <Pagination>{items}</Pagination>
    </Fragment>
  );
};

Posts.propTypes = {
  checkposts: PropTypes.func.isRequired,
  // posts: PropTypes.array
};

const mapStateToProps = (state) => ({
  // posts: state.searchedposts
});

export default connect(mapStateToProps, { checkposts })(Posts);
