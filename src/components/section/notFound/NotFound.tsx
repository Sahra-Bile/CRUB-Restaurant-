import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="error">
      {' '}
      <p className="error__message">Ett fel har inträffat</p>
      <div className="error__back">
        <button
          type="button"
          className="btn primary"
          onClick={() => navigate(-1)}
        >
          Tillbaka
        </button>
      </div>
    </div>
  )
}
