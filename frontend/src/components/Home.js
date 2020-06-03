
import React, { Component } from 'react'
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: undefined
        }
    }
    componentDidMount() {
        console.log("Getting details");

        let data = [
            {
                place: "Campbell",
                latitude: 37.2872,
                longitude: -121.9500
            },
            {
                place: "Omaha",
                latitude: 41.2565,
                longitude: -95.9345
            },
            {
                place: "Austin",
                latitude: 30.2672,
                longitude: -97.7431
            },
            {
                place: "Timonium",
                latitude: 39.4371,
                longitude: -76.6197
            }
        ]

        axios.defaults.withCredentials = true;
        /**
         * http request to server to retrive weather conditons 
         * The API requires array of location-name, location-latitude and location-logitude as input.  
         * Output response contains weather details alerts, current weather conditions, daily weather conditions, hourly weather
         * conditions and minutely weather conditions are set in state variable details
         * Error message : "Unable to display details" is displayed  
         */
        axios({
            method: 'get',
            url: 'http://localhost:3001/getWeatherDetails',
            params: data
        })
            .then(response => {
                console.log("frontend");
                if (response.status === 200) {
                    console.log("response from API ");
                    this.setState({ details: response.data });
                    console.log("weather details from API : ", this.state.details)

                }
                else {
                    console.log("Status Code: ", response.status);
                    console.log("Unable to display details");
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {

        if (this.state.details === undefined) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {

            const resultJsx = this.state.details.map(oneWeatherData => (
                <>
                    <tr>
                        <td>{oneWeatherData.place}</td>
                        <td>{`${oneWeatherData.result.currently.apparentTemperature}° F`}</td>
                        <td>{oneWeatherData.result.daily.summary}</td>
                    </tr>
                </>
            ))

            return (
                <div >

                    <Navbar expanded variant="dark" bg="dark">
                        <Navbar.Brand>Weather App</Navbar.Brand>
                    </Navbar>


                    <ReactBootstrap.Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Current Weather</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>

                            {resultJsx}

                        </tbody>
                    </ReactBootstrap.Table>

                </div>
            )
        }




    }
}

