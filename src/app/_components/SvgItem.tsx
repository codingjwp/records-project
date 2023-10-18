import styles from './svgitem.module.css';

type SVGID = "cube" | "commit" | "commit_30" | "storages";
type FILL = "rt" | "ft" | "mn";
interface SvgItemProps {
  wd: number;
  hi: number;
  id: SVGID;
  color: FILL;
}

const SvgItem = ({id, wd, hi, color}: SvgItemProps) => {
  const fillStyle = (color: FILL) => {
    switch(color) {
      case 'rt':
        return styles.bg_root;
      case 'ft':
        return styles.bg_font;
      case 'mn':
        return styles.bg_main;
      default :
        return '';
    }
  }
  const bgStyle = fillStyle(color);

  return (
    <svg width={wd} height={hi} className={[bgStyle, id === "cube" ? styles.main_animation : ""].join(" ")}>
      <use href={"svgs/iconsprite.svg#" + `${id}`} />
    </svg>
  )
}

export default SvgItem;