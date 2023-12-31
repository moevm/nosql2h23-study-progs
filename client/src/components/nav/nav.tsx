import { Link, useLocation, useNavigate } from "react-router-dom";
import './nav.scss';


const Nav = () => {

	return (
		<nav className="nav">
			<div className="container">
				<ul>
					<li>
						<Link to="/education-program-list">Образовательные программы</Link>
					</li>
					{/* <li>
						<Link to="/discipline-programs-list">Учебные программы</Link>
					</li> */}
					<li>
						<Link to="/training-plan-list">Учебные планы</Link>
					</li>
					<li>
						<Link to="/training-plan-comparison">Сравнение учебных планов</Link>
					</li>
					<li>
						<Link to="/graph-visualization">Визуализация графа</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Nav;

