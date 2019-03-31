import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import axios from 'axios'

class NameForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', showError: false, showName: false, unix: '', utc: '', message: 'Invalid Date ! Please enter 13 digit Epoch time or date in yyyy-mm-dd format' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
    console.log(this.state.value)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({
      showName: true,
      showError: false
    })
    const value = this.state.value
    axios.get('http://localhost:3001/api/timestamp/' + value)
      // .then(data => data.json())
      .then(res => {
        if (res.data !== 'Invalid Date') { this.setState({ unix: res.data.unix, utc: res.data.utc }) } else { this.setState({ showName: false, showError: true }) }
      })
  }
  render () {
    return (
      <div align='center' class='div1'>
        <h1 class='Text'>Simple Time converter</h1>
        <h3 class='Text1'>Convert Epoch to UTC and vice versa</h3>
        <form onSubmit={this.handleSubmit}>
          <label class='Label'>
            <b>Time --->  </b>
            <input
              type='text'
              value={this.state.value}
              onChange={this.handleChange}
              class='inputBox'
            />
          </label>
          <input type='submit' class='Button' value='Submit' />
        </form>
        <br /><br /><b>
          {this.state.showError && <i>{this.state.message}</i>}
          {this.state.showName && <i>Epoch:   {this.state.unix} <br /><br />UTC:  {this.state.utc}</i>}
        </b>
      </div>
    )
  }
}

ReactDOM.render(<NameForm />, document.getElementById('root'))
