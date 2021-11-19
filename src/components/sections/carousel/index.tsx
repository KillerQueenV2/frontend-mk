import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'

export function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    slideIndex > 300 && setSlideIndex(0);

    const interval = setInterval(() => {
      setSlideIndex(slideIndex + 100)
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex])

  const slideData = [
    {
      banner: 'https://i.imgur.com/I4IfRQa.png'
    },
    {
      banner: 'https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/non-4k/original/14.jpg'
    },
    {
      banner: 'https://i.imgur.com/UbzgFRd.jpg'
    },
    {
      banner: 'https://wallpaperaccess.com/full/3513781.jpg'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slideData.map((slide, i) => (
          <div
            className={styles.item}
            key={i}
            style={{right: `${slideIndex}%`}}
          >
            <img src={slide.banner} alt="random banner" />
          </div>
        ))}
      </div>
      <button
        className={styles.previousBtnCarousel}
        onClick={() => setSlideIndex(slideIndex - 100)}
        disabled={slideIndex === 0 ? true : false}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        className={styles.nextBtnCarousel}
        onClick={() => setSlideIndex(slideIndex + 100)}
        disabled={slideIndex === 300 ? true : false}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  )
}