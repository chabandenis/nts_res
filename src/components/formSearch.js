import React from "react";

class FormSearch extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            filter: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      //  console.log("var ", e.target.value);
        this.state.filter = e.target.value;
    }

    render() {

        let handleSubmit = this.handleSubmit;

        return (
            <div>
                <form>
                    <input type="text" name="city"
                           placeholder="Фильтр"
                           onChange={(e) => {
                               handleSubmit(e)
                           }}/>
                    <button onClick={(e) => {
                        console.log(this.state.filter);
                        this.props.listOfNotes(e, this.state.filter)
                    }}>Список заметок
                    </button>
                </form>
            </div>
        );
    }
}

export default FormSearch;
