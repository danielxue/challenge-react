import React from 'react';
import './App.css';
import parents from './parents.jpg'
import data from './data.json';
import Question from './Question'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.bottomRef = React.createRef();

        this.state = {
            selections: Array(data.questions.length).fill(-1),
            result: '',
            mutable: true,
        }
    }

    onClick(index, selection) {
        let selections = this.state.selections.slice();
        selections[index] = selection;
        this.setState({selections: selections});
        this.forceUpdate();
    }

    mostFrequent() {
        let freq = Array(data.results.length).fill(0);

        for (let i of this.state.selections) {
            freq[i]++
        }

        let most_freq = 0;
        for (let i = 1; i < freq.length; i++) {
            if (freq[i] > freq[most_freq]) {
                most_freq = i;
            }
        }

        return most_freq;
    }

    onSubmit() {
        if (this.state.mutable) {
            if (this.state.selections.indexOf(-1) === -1) {
                let most_freq = this.mostFrequent();
                this.setState({result: data.results[most_freq], mutable: false});
            }
            this.bottomRef.current.scrollIntoView();
        }
        else {
            this.setState({mutable: true})
        }
    }

    render() {
        const questions = data.questions.map((question, index) => {
            return (
                <Question key={index}
                          index={index}
                          prompt={question.prompt}
                          options={question.options}
                          selected={this.state.selections[index]}
                          mutable={this.state.mutable}
                          handler={this.onClick.bind(this)}
                />
            );
        });
        
        return (
            <div className="App">
                <h1>Quiz: Do Your Parents Miss You or Do They Just Feel Obligated to Talk to You?</h1>
                <img src={parents} />
                {questions}
                <button onClick={this.onSubmit.bind(this)}>
                    {this.state.mutable ? 'Show me my results!' : 'Retake quiz'}
                </button>
                {this.state.result !== '' &&
                    !this.state.mutable &&
                    <div className="results">
                        <h2>Congratulations!</h2>
                        <p>{this.state.result}</p>
                    </div>
                }
                <div ref={this.bottomRef}/>
            </div>
        );
    }
}

export default App;
