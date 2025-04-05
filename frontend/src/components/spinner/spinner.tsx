import style from './spinner.module.css';

export default function Spinner(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner}></div>
    </div>
  );
}
