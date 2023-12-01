import Style from './loading.module.css';

export default function Loading(): JSX.Element {
  return (
    <div className={Style.C_loading}>
      <span className={Style.C_loading_loading}>loading</span>
      <span className={Style.C_loading_circle}></span>
    </div>
  )
}