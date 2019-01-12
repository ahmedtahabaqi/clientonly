import React, { Component } from "react";
import Context from "./component/context.js";
import { toaster } from "evergreen-ui";
import Show from "./component/show.js";
import Trash from "./component/trash";
import Admin from "./component/admin";
import MyFiles from "./component/myFile";
import Login from "./component/login";
import { BrowserRouter, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Openfolder from "./assets/openfolder.svg";
import FolderIcon from "./assets/folder.svg";
var FolderIdCheck;
var FileUpload;
var SelectFolderOnUpload;
var FolderName;
var iconbuffer;
const cookies = new Cookies();
class App extends Component {
  constructor() {
    super();
    this.state = {
      Session: [],
      FolderIdCheck: "",
      Packagefree: "",
      packageSize: ""
    };
  }

  componentDidMount() {
    fetch(`/api/files/`, {
      credentials: "same-origin",
      headers: {
        token: cookies.get("token")
      }
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          //calculate limit for
          let packageSize;
          var limit = data[1].session.limit;
          if (data[1].session.package == "free") {
            packageSize = 100000000;
          } else if (data[1].session.package == "economic") {
            packageSize = 1000000000;
          } else if (data[1].session.package == "standard") {
            packageSize = 10000000000;
          } else if (data[1].session.package == "business") {
            packageSize = 100000000000;
          }

          var free = packageSize - limit;
          var rate = free / packageSize;
          var packagefree = rate * 100;

          this.setState({
            Session: data[1].session,
            Packagefree: packagefree,
            PackageSize: packageSize
          });
        }

        console.log(this.state.PackageSize);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Context.Provider value={{ value: this.state, actions: {} }}>
          <Show />
          <Route exact path="/" component={MyFiles} />
          <Route exact path="/Trash" component={Trash} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/Login" component={Login} />
        </Context.Provider>
      </BrowserRouter>
    );
  }
}
export default App;
