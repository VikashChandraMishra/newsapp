import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 21,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello, I am a constructor from News Component.");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        console.log(this.props.apiKey);
        const urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(urlToFetch);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
        console.log('cdm');
        this.updateNews();
    }

    handlePrevClick = async () => {
        console.log('Previous');
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log('Next');
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
        const urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // });
        let data = await fetch(urlToFetch);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    render() {
        if (this.state.loading === true)
            return <Spinner />

        else return (
            <>
                <h1 className='text-center'>NewsMonkey - Top HeadLines From {`${this.capitalizeFirstLetter(this.props.category)}`}</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    {/*Must pass unique key to child when using 'map'*/}
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? (element.description.slice(0, 80) + '...') : ""} imageUrl={element.urlToImage} url={element.url} author={element.author}
                                        date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page === 3} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News;