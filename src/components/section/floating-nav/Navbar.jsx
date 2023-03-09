export const Navbar = ({ className, item }) => {
  return (
    <li className={className}>
      <a href={item.link}>{item.icon}</a>
    </li>
  )
}
