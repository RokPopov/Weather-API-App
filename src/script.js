/**
 *  STEPS:
 *
 *  [x] 1. Declare a class to GET weather data, and GET the woeid, output received data
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

    getLocation(query) {
        $.getJSON(this.searchApi, { query: query }).done(data => this.getWeatherData(data[0].woeid));
    }

    getWeatherData(location) {
        $.getJSON(`${this.baseApi}/${location}`).done(data => console.log(data));
    }
}

class coreDomElements {
    constructor() {
        this.searchForm = $('#search-form');
        this.errorBox = $('#error-box');
        this.searchBox = $('#search-box');
        this.loaderBox = $('#loader-box');
        this.forecastBox = $('#forecast-box');
    }

    showForecast() {
        this.hideError();
        this.forecastBox.removeClass('d-none');
        this.forecastBox.addClass('d-flex');
    }

    showLoader() {
        this.loaderBox.removeClass('d-none');
    }

    hideLoader() {
        this.loaderBox.addClass('d-none');
    }

    showSearch() {
        this.searchBox.removeClass('d-none');
        this.searchBox.addClass('d-flex');
    }

    hideSearchBox() {
        this.searchBox.removeClass('d-flex');
        this.searchBox.addClass('d-none');
    }

    showError(message) {
        this.hideLoader();
        this.showSearch();
        this.errorBox.removeClass('d-none');
        this.errorBox.addClass('d-block');
        this.errorBox.html(`<p class="mb-8">${message}</p>`);
    }

    hideError() {
        this.errorBox.addClass('d-none');
    }
}

class requestController {
    constructor() {
        this.fetchForecastApi = new fetchForecastApi();
        this.coreDomElements = new coreDomElements();
        this.addEventListener();
    }

    // init() {
    //     this.fetchForecastApi.getLocation();
    // }

    onSubmit() {
        const query = $('#search-query').val().trim();
        this.fetchForecastApi.getLocation(query);
    }

    addEventListener() {
        this.coreDomElements.searchForm.on('submit', e => {
            e.preventDefault();
            this.onSubmit();
        });
    }
}

const request = new requestController();
