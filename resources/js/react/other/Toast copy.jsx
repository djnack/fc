import { Component } from "react";

class Toast extends Component {
    constructor(props) {
        super(props)
        this.state = { show: 'show', data: props.data }
    }
    timeOut = () => {
        setTimeout(() => {
            this.setState({ show: '' })
        }, 5000)
    }
    componentDidMount() {
        this.timeOut()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data === prevState.data) {
console.log('mmmm');
        }
        if (prevState.show === '' && this.state.show === '') {
            console.log(this.state);
            console.log(prevProps);
            console.log(prevState);
            this.setState({ data: this.props.data, show: 'show' })
            this.timeOut()
        }
    }
    state = {}
    render() {
        return (<>
            <div className={`toast-box toast-top bg-${this.state.data.color} ${this.state.show}`}>
                <div className="in">
                    {Object.keys(this.state.data.text).map(key => {
                        return (<div className="text" key={key}>{this.state.data.text[key]}</div>);
                    })}
                </div>
            </div>
        </>);
    }
}

export default Toast;