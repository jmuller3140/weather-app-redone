import React, { Fragment } from 'react'
import { cityLookup, runWeatherGenerator, getWeatherDetailDisplay } from '../../utils'
import cityJson from '../../../assets/json/citylist.json'
import { DailyWeatherComponent } from '../../../weather'
import { LoadingSpinnerComponent } from '../loading'

export default class WeatherLookupComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingWeather: false,
      showDropdown: false,
      dropDown: [],
      error: null,
      weeklyWeatherData: [],
      input: '',
      cityId: '',
      cityList: [],
      weatherDetailDisplay: [],
      isLoading: false

    }
    this.onClickWeatherDetailDisplay = this.onClickWeatherDetailDisplay.bind(this)
  }

  componentDidMount() {
    this.cityList = cityJson
  }

  onSubmitListener(e) {
    e.preventDefault()
    this.setState({ isLoadingWeather: true })
    const payload = { cityId: this.state.cityId, unit: 'imperial' }
    runWeatherGenerator(payload, this)
  }
  onChange(e) {
    e.preventDefault()
    this.setState({ input: e.target.value })
    const filteredCityList = cityLookup(e.target.value, this.cityList)
    if (filteredCityList.length > 0) this.setState({ dropDown: filteredCityList, showDropdown: true, cityId: '', weeklyWeatherData: [] })
  }
  onClick(item) {
    this.setState({ cityId: item.id, input: item.name, showDropdown: false, dropDown: [] })
  }
  onClickWeatherDetailDisplay(e, hours, dayString) {
    e.preventDefault()
    this.props.displayModal(getWeatherDetailDisplay(hours), dayString)
  }
  render() {
    const { showDropdown, dropDown, weeklyWeatherData, isLoading } = this.state
    return (
      <Fragment>
        <form className='d-flex align-items-center justify-content-center flex-column' onSubmit={e => this.onSubmitListener.call(this, e)}>
          <div className='form-group col-md-6'>
            <h4>Check the weather. Type a city.</h4>
            <input type="text" className="form-control mt-5" placeholder="Enter a city" onChange={e => this.onChange.call(this, e)} value={this.state.input} />
            <div className='w-100'>
              {(dropDown && showDropdown) && (
                <table className='table'>
                  <tbody>
                    {dropDown.map((item, idx) => (
                      <tr key={idx}>
                        <td className='border border-primary pt-3 pb-3 pl-3' key={idx} onClick={e => this.onClick.call(this, item)}>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
              }
            </div>
          </div>
          < button type='submit' className='btn btn-outline-primary btn-lg mt-5'> Submit</button>
        </form>
        {
          isLoading && (
            <div className='w-100 d-flex justify-content-center pt-5'>
              <LoadingSpinnerComponent />
            </div>
          )
        }
        {
          (weeklyWeatherData.length !== 0 && isLoading === false) && (
            <div className='w-100 d-flex justify-content-center pt-5'>
              <div className='d-flex align-items-center justify-content-around border-top border-primary'>
                {weeklyWeatherData.map((day, idx) => (
                  <DailyWeatherComponent key={idx} day={day} onClick={this.onClickWeatherDetailDisplay} />
                )
                )
                }
              </div>
            </div>
          )
        }
      </Fragment>
    )
  }
}