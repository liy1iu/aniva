function Card({ children, className = '' }) {
  // simple wrapper for repeated panels
  return <article className={`glass rounded-lg ${className}`}>{children}</article>
}

export default Card
