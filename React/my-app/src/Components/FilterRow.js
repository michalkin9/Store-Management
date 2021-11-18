function FilterRow({info}) {
    return (
      <tr>
          <td>{info.firstname} {info.lastname}</td>
          <td>{info.name}</td>
          <td>{info.date.split('T')[0]}</td>
      </tr>
    )
}

export default FilterRow
