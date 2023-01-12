import Slider from 'react-slick'

import './index.css'

const BooksRating = props => {
  const {details} = props
  const {authorName, coverPic, title, id} = details

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
        </div>
      </Slider>
    </div>
  )
}

export default BooksRating
