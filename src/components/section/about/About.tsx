import React from 'react'
import './about.scss'

export const About = () => {
  return (
    <section id="about" className="about-container">
      <article className="about-container__article">
        <h2 className="about-container__article__title">
          Vi förstår att du vill veta mer om oss...
        </h2>
        <p className="about-container__article__desc">
          ...och vi vill väldigt gärna berätta. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Magni molestiae modi sunt reiciendis
          magnam dolorem incidunt maxime, vero, nihil alias perspiciatis eveniet
          deserunt exercitationem quam et voluptatem ipsa error doloremque.
        </p>
      </article>
      <div className="about-container__img">
        <img
          className="about-container__img__src"
          src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          alt="about"
        />
      </div>
    </section>
  )
}
