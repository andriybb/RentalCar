import css from './page.module.css';
export function Loader() {
  return (
    <div className={css.loading}>
  <div className={css.loadingBar}></div>
  <div className={css.loadingBar}></div>
  <div className={css.loadingBar}></div>
  <div className={css.loadingBar}></div>
</div>
  );
}