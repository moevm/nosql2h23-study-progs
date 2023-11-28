import { Link, useLocation, useNavigate } from "react-router-dom";
import './nav.scss';


const Nav = () => {

	return (
		<nav className="nav">
			<div className="container">
				<ul>
					<li>
						<Link to="/">Образовательные программы</Link>
					</li>
					<li>
						<Link to="/discipline-programs-list">Учебные программы</Link>
					</li>
					<li>
						<Link to="/training-plan-list">Учебные планы</Link>
					</li>
					<li>
						<Link to="/training-plan-comparison">Сравнение учебных планов</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Nav;

