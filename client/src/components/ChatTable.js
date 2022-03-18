import { Table } from 'react-bootstrap'

export default function ChatTable (props) {
 console.log(props.messages);
    return (
      <Table id="chat-table" striped hover>
        <tbody>
          {props.messages.map( message =>
            <tr id="table-row" key={message.key}>
              <td>{message.timestamp}</td>
              <td className="name-column">{message.user}</td>
              <td>{message.text}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  
}