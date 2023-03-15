import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="error">
      <article className='error__container'>
        <span className="error__container__message">Ett fel har inträffat</span>
        <button
          type="button"
          className="btn primary"
          onClick={() => navigate(-1)}>Tillbaka</button>
      </article>
    </div>
  )
}
