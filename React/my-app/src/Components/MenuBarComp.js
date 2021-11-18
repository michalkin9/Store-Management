import { useNavigate } from 'react-router-dom';
import './menuBar.css'

function MenuBarComp() {

    const navigate = useNavigate();

    const handleNevigation = (e) => {
        console.log(e.target.name);
        navigate(`${e.target.name}`);
    }
    
    return (
        <div>
            <div id="menu-bar">
                <button className="menuButton" onClick={handleNevigation} name="/products">Products</button>
                <button className="menuButton" onClick={handleNevigation} name="/customers">Customers</button>
                <button className="menuButton" onClick={handleNevigation} name="/purchases">Purchases</button>
            </div>
        </div>
    )
}

export default MenuBarComp
