import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';


class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }


  edit() {
    this.setState({editing: true})
  }

  save() {
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState({editing: false})
  }

  remove() {
    this.props.onRemove(this.props.id)
  }

  renderForm() {
    return (
      <div className="note">
        <textarea ref="newText"></textarea>
        <button onClick={this.save}>SAVE</button>
      </div>
    );
  }

  renderDisplay() {
    return (
      <div className="note">
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit}>EDIT</button>
          <button onClick={this.remove}>X</button>
        </span>
      </div>
    );
  }

  render() {
    return (this.state.editing) ? this.renderForm() : this.renderDisplay();
    }
}

//*********************************Board Component**************** */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.eachNote = this.eachNote.bind(this);
    this.nextId = this.nextId.bind(this);
    this.add = this.add.bind(this);
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  add (text) {
    var notes = [
    ...this.state.notes,
    {
      id: this.nextId(), 
      note: text
    }
  ]
    this.setState({notes})
  }
  update(newText, id) {
    var notes = this.state.notes.map(
      note=> (note.id !== id) ?
        note : 
          {
            ...note,
            note: newText
          }
    )
    this.setState({notes})
  }

  remove(id) {
    var notes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes})
  }

  eachNote(note) {
    return (<Note key={note.id}
             id={note.id}
             onChange={this.update}
             onRemove={this.remove}>
            {note.note}
          </Note>)
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={()=> this.add()}>+</button>
      </div>
    )
  }
}

Board.propTypes = {
  count: PropTypes.number
};



ReactDOM.render(
      <Board count={10}/>,
      document.getElementById('root') 
);


// ReactDOM.render(<Checkbox/>,
//   document.getElementById('checkbox'));

//****************************************Checkbox Component******************************************** */

// class Checkbox extends React.Component {   
//   constructor(props) {
//     super(props);
//     this.state = {
//       checked: true,
//     };
//     this.handleCheck = this.handleCheck.bind(this);
//   }

//   handleCheck() {
//     this.setState({
//       checked: !this.state.checked,
//     });
//   }

//   render() {
//     var msg
//     if(this.state.checked) {
//       msg = "checked"
//     } else {
//       msg = "unchecked" 
//     }
//     return (
//       <div>
//         <input type="checkbox"
//           onChange={this.handleCheck} 
//           defaultChecked={this.state.checked}/>
//         <p>This box is {msg}</p>
//       </div>
//     );
//   }
// }

