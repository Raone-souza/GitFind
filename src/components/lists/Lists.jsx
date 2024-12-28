import "./lists.css"

const Lists = ({title, description}) => {
  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export default Lists
