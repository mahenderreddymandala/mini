import { Component } from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import BookshelvesItem from '../BookshelvesItem'

const ApiStatus = {
    initial: '',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}


const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
console.log(bookshelvesList)

class Bookshelves extends Component {
    state = {
        searchText: '',
        bookshelfName: '',
        bookShelvesList: [],
    }

    componentDidMount() {
        this.getBookshelves()
    }

    renderSuccessView = () => {
        const { bookShelvesList } = this.state

        return (
            <ul className="books-item">
                {bookShelvesList.map(each => (
                    <BookshelvesItem key={each.id} details={each} />
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
        const { status } = this.state

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

    getBookshelves = async () => {
        this.setState({ status: ApiStatus.loading })
        const { bookshelfName, searchText } = this.state

        const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`

        const jwtToken = Cookies.get('jwt_token')

        const options = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(url, options)
        console.log(response)

        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            const formattingData = data.books.map(each => ({
                id: each.id,
                authorName: each.author_name,
                coverPic: each.cover_pic,
                title: each.title,
                readStatus: each.read_status,
                rating: each.rating,
            }))
            //  console.log(formattedData)
            this.setState({
                bookShelvesList: formattingData,
                status: ApiStatus.success,
            })
        }
    }


    renderList=()=>{

        {bookshelvesList.map(each=>({
            <li key={each.id}>
                <p>{label}</p>
            </li>

        })) 

        }

    render() {
        return (
            <div className="home-section">
                <div className="row1">
                    <h1 className="heading-home">Bookshelves</h1>
                    {this.renderList()}
                </div>

                <h1 className="heading-home">All Books</h1>

                <div>{this.renderBooksRating()}</div>
            </div>
        )
    }
}

export default Bookshelves
