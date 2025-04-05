
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import style from './not-found.module.css';

const NotFound = (): JSX.Element => (
  <div className={style.notFound}>404 Page Not Found
    <p>back to <Link to={AppRoute.Root}>main page</Link></p>
  </div>
);

export default NotFound;
