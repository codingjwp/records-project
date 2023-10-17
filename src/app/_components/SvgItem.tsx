import styles from './svgitem.module.css';

type SVGID = "cube" | "commit" | "commit_30";

interface SvgItemProps {
  wd: number;
  hi: number;
  id: SVGID;
}

const SvgItem = ({id, wd, hi}: SvgItemProps) => {

  return (
    <svg width={wd} height={hi} className={[styles.bgcolor, id === "cube" ? styles.main_animation : ""].join(" ")}>
      <use href={"svgs/iconsprite.svg#" + `${id}`} />
    </svg>
  )
}

export default SvgItem;