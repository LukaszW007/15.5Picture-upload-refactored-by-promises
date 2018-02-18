App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    },
    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
            .then(gif=> {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            });
    },
    getGif: function (searchingText) {
        return new Promise(
            function (resolve, reject) {
                var GIPHY_API_URL = "http://api.giphy.com";
                var GIPHY_PUB_KEY = 'mGi7FkmUPlcnjaI1MZdlXfFHYBa1FWLu';
                var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (this.status === 200) {
                        var data = JSON.parse(xhr.responseText).data;
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject(new Error(this.statusText))
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            }
        )
    },
    render: function () {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
            <div style={styles}>
                <h1>GIF search engine</h1>
                <p>Find Gif<a href="http://giphy.com">giphy</a> Press Enter to get next GIF</p>
                <Search
                    onSearch={this.handleSearch}
                />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        )
    }
});