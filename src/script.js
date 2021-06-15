/**
 *  STEPS:
 *
 *  [] 1. Declare a class to GET weather data, and GET the woeid, output received data
 *  [] 2. Register an event listener and attach it to the GET requests chain from above, adjust UI loading state
 *  [] 3. Prepare data for the UI in advance and try to use unified structure before outputting to the template
 *  [] 4. Divide classes per function to have a more clean code approach and separation on concerns
 *  [] 5. Add error/loading states and cover edge use cases
 *
 */

class fetchForecastApi {
    constructor() {
        this.baseApi = 'https://www.metaweather.com/api/location';
        this.searchApi = `${this.baseApi}/search`;
        this.addCorsHeader();
    }

    addCorsHeader() {
        $.ajaxPrefilter(options => {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' + options.url;
            }
        });
    }

    getLocation() {
        $.getJSON(this.searchApi, { query: 'Amsterdam' }).done(data => this.getWeatherData(data[0].woeid));
    }

    getWeatherData(location) {
        $.getJSON(`${this.baseApi}/${location}`).done(data => console.log(data));
    }
}

class requestController {
    constructor() {
        this.fetchForecastApi = new fetchForecastApi();
        this.init();
    }

    init() {
        this.fetchForecastApi.getLocation();
    }
}

const request = new requestController();
