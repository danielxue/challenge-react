import React from 'react';
import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'
import './Question.css'

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected,
        }
    }

    handleClick(index) {
        if (this.props.mutable) {
            this.setState({selected: index});
            this.props.handler(this.props.index, index);
        }
    }

    render() {
        let options = Object.entries(this.props.options).map(([key, value], index) => {
           return (
               <div className={((this.state.selected === index ? 'sel ' : 'unsel ')
                   + (this.props.mutable ? 'mut ' : 'immut ')
                   + "box")}
                    onClick={this.handleClick.bind(this, index)}>
                   <table>
                       <tr>
                           <td className="check">
                               {this.state.selected === index ? <FaRegCheckSquare size={32}/> : <FaRegSquare size={32}/>}
                           </td>
                           <td>
                               <div className="option">{'' + key + ': ' + value}</div>
                           </td>
                       </tr>
                   </table>
               </div>
           );
        });

        return (
            <div className="questions">
                <h2>{'' + (this.props.index + 1) + '. ' + this.props.prompt}</h2>
                <div className="options">
                    {options}
                </div>
            </div>
        );
    }
}

export default Question;