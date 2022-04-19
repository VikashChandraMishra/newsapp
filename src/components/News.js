import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

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
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        const urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec6da13af2ba4fc2a36e3051188c3daf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
        // let urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddd4b5117d51484387f20391fc7604f3&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // });
        // let data = await fetch(urlToFetch);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        this.updateNews();  
    }

    handlePrevClick = async () => {
        console.log('Previous');
        // let urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddd4b5117d51484387f20391fc7604f3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // });
        // let data = await fetch(urlToFetch);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // });
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log('Next');
        // let urlToFetch = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddd4b5117d51484387f20391fc7604f3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // });
        // let data = await fetch(urlToFetch);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // });
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();
    }

    render() {
        if (this.state.loading === true)
            return <Spinner />

        else return (
            <div className='container my-4'>
                <h1 className='text-center'>NewsMonkey - Top HeadLines From {`${this.capitalizeFirstLetter(this.props.category)}`}</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            {/*Must pass unique key to child when using 'map'*/}
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? (element.description.slice(0, 80) + '...') : ""} imageUrl={element.urlToImage} url={element.url} author={element.author}
                                date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page === 3} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;