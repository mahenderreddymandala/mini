import {BsFillStarFill} from 'react-icons/bs'
import Slider from 'react-slick'

import './index.css'

const BookshelvesItem = props => {
  const {details} = props
  const {authorName, coverPic, title, id, readStatus, rating} = details

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="books-rating-c">
      <Slider {...settings}>
        <div>
          <img src={coverPic} alt={id} className="cover-pics" />

          <h1 className="heading">{title}</h1>
          <p className="a-name">{authorName}</p>
          <p className="rating">
            Avg rating:
            <BsFillStarFill className="star" />
            {rating}
          </p>
          <p>
            status:<span className="read-status">{readStatus}</span>
          </p>
        </div>
      </Slider>
    </div>
  )
}

export default BookshelvesItem
