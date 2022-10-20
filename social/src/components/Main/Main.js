import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/main.css";
import Card from "react-bootstrap/Card";
import Friends from "./Friends";
import {
  checkFriend,
  updateStatus,
  addFriends,
  searchPost,
  addPost,
  checkposts,
  refresh,
} from "../../actions/posts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Posts from "./Posts";

const initialState = {
  curstatus: "",
  newpost: "",
  searchItems: "",
};

const Main = ({
  updateStatus,
  checkposts,
  refresh,
  addPost,
  name,
  status,
  friends,
  justReg,
  searchPost,
  searchedposts,
  posts,
}) => {
  const [formData, setFormData] = useState(initialState);

  var newstatus = "";

  useEffect(() => {
    const profileData = { ...initialState };
    profileData[curstatus] = status;
    profileData[newpost] = "";
    profileData[searchItems] = "";
    console.log("local storage");
    console.log(window.localStorage.name);
    setFormData(profileData);
    refresh(window.localStorage.name);

    // console.log("Main")
    // console.log(name)
    // checkposts(name)
  }, [status]);

  const { curstatus, newpost, searchItems } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateStatus(curstatus);
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    addPost(name, newpost);
  };

  const clear = () => {
    setFormData({ ...formData, newpost: "" });
  };

  const search = (e) => {
    e.preventDefault();
    var searchkey = document.getElementById("searchText").value;
    console.log("searchItems" + document.getElementById("searchText").value);
    searchPost(searchkey, posts);
  };

  const handleShow = () => {};

  return (
    <section className="whole">
      <div className="nav">
        <a className="navbar1" style={{ display: "inline" }} href="../">
          {" "}
          Log Out
        </a>
        <a className="navbar2" style={{ display: "inline" }} href="../profile">
          {" "}
          Profile
        </a>
      </div>

      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ width: 100, height: 100, marginLeft: 80 }}
          src="https://p.qqan.com/up/2021-2/16137992352635419.jpg"
        />
        <Card.Title className="title">{name}</Card.Title>
        <Card.Text>{status}</Card.Text>
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Modify status"
              name="curstatus"
              value={curstatus}
              onChange={onChange}
              style={{ zIndex: 10 }}
            />
            {/* 随机编个add进去 */}
            <button onClick={onSubmit} style={{ zIndex: 10 }}>
              Update
            </button>
          </InputGroup>
        </Card.Body>
      </Card>
      {/* <form className="form" onSubmit={onSubmit}>

      <input
        placeholder='Modify status'
        name="curstatus"
        value={curstatus}
        onChange={onChange}
        />
        <br/>
      <button type="submit">Update</button>

  </form> */}

      <Friends friends={friends} />

      <div className="posts">
        <div className="uploadbox">
          <Form onSubmit={onSubmitPost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* another input for file. (Hint: input type='file')  */}
              <Form.Label>My Post</Form.Label>
              <br />
              <input type="file" id="myFile" name="filename" />
              <Form.Control
                as="textarea"
                rows={3}
                type="newpost"
                placeholder="newpost"
                name="newpost"
                value={newpost}
                onChange={onChange}
              />
            </Form.Group>

            <button className="btn1" variant="primary" type="submit">
              Submit
            </button>
          </Form>
          <button className="btn2" variant="primary" onClick={clear}>
            {/* clear */}
            Clear
          </button>
        </div>

        <div className="searchbar">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search Posts"
              type="text"
              id="searchText"
              // onChange={onChange}
            />
            {/* 随机编个add进去 */}
            <button onClick={search}>Search</button>
          </InputGroup>
        </div>

        <div className="pgrid">
          <Container>
            <Row>
              <Posts posts={searchedposts} />
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
};

Main.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  searchPost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  checkposts: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  justReg: PropTypes.bool,
  name: PropTypes.string,
  status: PropTypes.string,
  posts: PropTypes.array,
  searchedposts: PropTypes.array,
  friends: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isnew: state.isnew,
  name: state.name,
  status: state.status,
  searchedposts: state.searchedposts,
  justReg: state.justReg,
  posts: state.posts,
  friends: state.friends,
});

export default connect(mapStateToProps, {
  updateStatus,
  addPost,
  checkposts,
  refresh,
  searchPost,
})(Main);
