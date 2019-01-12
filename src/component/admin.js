import React from "react";
import Context from "./context.js";
import { Table, IconButton, Avatar } from "evergreen-ui";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: [
        { id: 1, name: "image.jpg", uploadedAt: "7/1/2019", fileSize: "3.4MB" },
        { id: 2, name: "vsco.pdf", uploadedAt: "7/1/2019", fileSize: "1.1MB" },
        { id: 3, name: "oscar.png", uploadedAt: "7/1/2019", fileSize: "1.4MB" },
        { id: 4, name: "hoho.mp3", uploadedAt: "7/1/2019", fileSize: "3.2MB" },
        { id: 5, name: "echo.mkv", uploadedAt: "7/1/2019", fileSize: "2.6MB" },
        { id: 6, name: "pic.jpg", uploadedAt: "7/1/2019", fileSize: "1.5MB" },
        { id: 7, name: "tran.jpg", uploadedAt: "7/1/2019", fileSize: "3.4MB" }
      ]
    };
  }
  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <React.Fragment>
              <div className="admincard">
                <div className="admincard1">Number of User :</div>
                <div className="admincard1">Number of Files :</div>
                <div className="admincard1">Area Storage Used :</div>
              </div>
              <div className="admincontiner">
                <Table className="tablebody">
                  <Table.Head>
                    <Table.TextCell
                      flexBasis={65}
                      flexShrink={0}
                      flexGrow={0}
                    />
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Uploaded At</Table.TextHeaderCell>
                    <Table.TextHeaderCell>File Size</Table.TextHeaderCell>
                    <Table.TextCell
                      flexBasis={110}
                      flexShrink={0}
                      flexGrow={0}
                    />
                  </Table.Head>
                  <Table.Body className="tablebody">
                    {this.state.profile.map(item => (
                      <Table.Row
                        key={item.id}
                        isSelectable
                        onSelect={() => alert(item.name)}
                      >
                        <Table.TextCell
                          flexBasis={65}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <Avatar
                            name="Bill Gates"
                            size={40}
                            marginRight={16}
                          />
                        </Table.TextCell>
                        <Table.TextCell>{item.name}</Table.TextCell>
                        <Table.TextCell>{item.uploadedAt}</Table.TextCell>
                        <Table.TextCell>{item.fileSize}</Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <IconButton icon="redo" intent="success" />
                        </Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <IconButton icon="trash" intent="danger" />
                        </Table.TextCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </React.Fragment>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default Admin;
