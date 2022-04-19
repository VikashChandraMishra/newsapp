import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: '20rem' }}>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span>
                    <img className="card-img-top" src={imageUrl ? imageUrl : "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1020075066/image_1020075066.jpg?io=getty-c-w750"} alt="News Related Display" style={{ width: '318px', height: '100px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Anonymous"} on {(new Date(date)).toGMTString()}</small></p>
                        <a href={url} rel="noreferrer" target='_blank' className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;