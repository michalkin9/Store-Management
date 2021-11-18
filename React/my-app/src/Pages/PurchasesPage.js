import FilterDivPurchases from "../Components/FilterDivPurchases"
import {observer} from 'mobx-react-lite';

function PurchasesPage({store}) {
    return (
        <div>
            <h2 style={{textAlign:"center"}}>Purchases Page</h2>
            <FilterDivPurchases store={store}/>
        </div>
    )
}

export default observer(PurchasesPage)
