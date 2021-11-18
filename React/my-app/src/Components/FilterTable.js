import FilterRow from './FilterRow';
function FilterTable({filteredData}) {
    return (
        <div>
            <table>
                <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Purchase Date</th>
                </tr>

                {filteredData.map((info,index)=>{
                    return <FilterRow info={info} key={index}/>
                })}

            </table>
        </div>
    )
}

export default FilterTable
