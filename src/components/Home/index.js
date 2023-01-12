import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import BooksRating from '../BooksRating'

import './index.css'

const ApiStatus = {
  initial: '',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    status: ApiStatus.initial,
    booksRating: [],
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  renderSuccessView = () => {
    const {booksRating} = this.state

    return (
      <ul className="books-item">
        {booksRating.map(each => (
          <BooksRating key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-view">
      <Loader type="TailSpin" color="#00BFF" height={50} width={50} />
    </div>
  )

  renderBooksRating = () => {
    const {status} = this.state

    switch (status) {
      case ApiStatus.success:
        return this.renderSuccessView()
      case ApiStatus.failure:
        return this.renderFailureView()
      case ApiStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getTopRatedBooks = async () => {
    this.setState({status: ApiStatus.loading})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    // console.log(response)

    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      const formattedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      //  console.log(formattedData)
      this.setState({booksRating: formattedData, status: ApiStatus.success})
    }
  }

  render() {
    return (
      <div className="home-section">
        <h1 className="heading-home">Find Your Next Favorite Books?</h1>
        <p className="paragraph-home">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, we will give you surprisingly insightful
          recommendations.
        </p>
        <div>{this.renderBooksRating()}</div>
      </div>
    )
  }
}

export default Home
