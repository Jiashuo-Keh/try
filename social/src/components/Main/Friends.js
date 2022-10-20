import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkFriend, addFriends, deletefriends } from "../../actions/posts";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../css/main.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Friends = ({
  friends,
  posts,
  checkFriend,
  addFriends,
  deletefriends,
}) => {
  // useEffect(() => {
  // },[friends]);

  const add = (e) => {
    e.preventDefault();
    var friendName = document.getElementById("addfriends").value;
    addFriends(friends.length, friendName, friends, posts);
  };

  const deleteFriend = (id) => {
    console.log("delete id" + id);
    deletefriends(id, friends, posts);
  };

  const friend = friends.map((fri) => (
    <tr key={fri.id}>
      <td>
        <img
          className="perimgage"
          style={{ width: 50, height: 50 }}
          src="https://p.qqan.com/up/2021-2/16137992352635419.jpg"
          alt=""
        ></img>
        <Button
          variant="outline-secondary"
          onClick={() => deleteFriend(fri.id)}
          style={{ float: "right" }}
        >
          x
        </Button>
        <ul>
          <span>{fri.name}</span>
          <br />
          <span>{fri.status}</span>
        </ul>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="friends">
        <Card className="carddown" style={{ width: "18rem" }}>
          {/*  User with id 1 follows users with ids 2, 3, and 4. The user with id 10 follows users with ids 1, 2, and 3. */}
          <div style={{ overflowY: "auto", height: 350 }}>
            <table className="table">
              <tbody>{friend}</tbody>
            </table>
          </div>

          {/* list */}
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Add Friends" id="addfriends" />
              {/* 随机编个add进去 */}
              <button onClick={add}>Add</button>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

Friends.propTypes = {
  checkFriend: PropTypes.func.isRequired,
  deletefriends: PropTypes.func.isRequired,
  addFriends: PropTypes.func.isRequired,
  posts: PropTypes.array,
  // friends: PropTypes.array
};

const mapStateToProps = (state) => ({
  // friends: state.friends
  posts: state.posts,
});

export default connect(mapStateToProps, {
  checkFriend,
  addFriends,
  deletefriends,
})(Friends);
