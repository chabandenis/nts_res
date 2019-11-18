import React from "react";
import Info from "./components/info"
import Search from "./components/search"
import Results from "./components/results"
import Edit from "./components/edit"
import Create from "./components/create"
import FormSearch from "./components/formSearch";
import AddNote from "./components/addNote"


class App extends React.Component {

    state = {
        notes: []
    }

    // список заметок
    listOfNotes = async (e, filtrTextNote) => {
        e.preventDefault();
        console.log("filterTextNote", filtrTextNote);
        const api_url = await fetch("http://127.0.0.1:8080/message?textNote=" + encodeURI(filtrTextNote),
            {cache: 'no-cache'});
        const data = await api_url.json();

        data.sort((a, b) => {
            return b.id - a.id
        });

        this.setState({notes: data});
    }

    // добавить заметку
    addNote = async (e) => {
        console.log("добавим");
        e.preventDefault();
        // dt.toLocaleDateString() + " " + dt.toLocaleTimeString()
        //let dt = new Date();
        //dateNote: dt,
        const bodyMsg = {

            urgencyNote: "",
            textNote: ""
        };
        const api_url = await fetch(`http://127.0.0.1:8080/message`,
            {
                method: 'POST', cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyMsg)
            });

        const data = await api_url.json();
        this.state.notes.push(data);
        this.state.notes.sort((a, b) => {
            return b.id - a.id
        });

        this.setState(this.state.notes);
    }

    // удалить заметку
    // строка для тестирования:
    // fetch('http://127.0.0.1:8080/message/1', {method: 'DELETE', hearders: {'Content-Type': 'application/json'}}).then(result=>console.log(result))
    deleteNote = async (e, idNoteToDel) => {
        //  deleteNote(e) {
        e.preventDefault();
        console.log("delete ", this, e, idNoteToDel);

        const api_url = await fetch("http://127.0.0.1:8080/message/" + idNoteToDel,
            {
                method: 'DELETE', cache: 'no-cache',
                headers: {'Content-Type': 'application/json'}
            });

        //console.log("index" + index);
        let notes = this.state.notes;

        this.state.notes.forEach(function (item, index, array) {
            //console.log("index" + index + "; " + item.id);
            if (item.id == idNoteToDel) {
                //console.log(" удалю index" + index + "; " + item.id);
                notes.splice(index, 1);
            }
        });

        notes.forEach(function (item, index, array) {
            console.log("index" + index + "; " + item.id);
        });

        this.setState(notes);

    }

    // редактировать заметку
    edtNote = async (e, userIdNote, userUrgencyNote, userTextNote, userDateNote) => {
        console.log("изменим ", userIdNote, userUrgencyNote, userTextNote);
        e.preventDefault();
        const bodyMsg = {id: userIdNote, dateNote: userDateNote, urgencyNote: userUrgencyNote, textNote: userTextNote};
        const api_url = await fetch("http://127.0.0.1:8080/message/" + userIdNote,
            {
                method: 'PUT', cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyMsg)
            });

        const data = await api_url.json();

        let notes = this.state.notes;

        this.state.notes.forEach(function (item, index) {
            //console.log("index" + index + "; " + item.id);
            if (item.id == userIdNote) {
                //console.log(" удалю index" + index + "; " + item.id);
                notes[index] = data;
            }
        });

        this.setState(this.state.notes);
    }

    render() {

        console.log("5555this.state.notes " + this.state.notes);
        console.log("this.state.v" + this.state.testValue);

        return (
            <div>
                <Info/>
                <FormSearch listOfNotes={this.listOfNotes}/>
                <AddNote noteAdd={this.addNote}/>

                <Edit/>
                <Create/>
                <Search/>
                <Results notes={this.state.notes}
                         deleteNote={this.deleteNote}
                         edtNote={this.edtNote}
                />
            </div>
        )
    }

}

export default App;
