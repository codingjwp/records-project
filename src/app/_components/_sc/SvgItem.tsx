import styles from './svgitem.module.css'

type SVGID = 'cube' | 'commit' | 'commit_30' | 'storages'
type FILL = 'rt' | 'ft' | 'mn'
type SVGSIZE = 'sm' | 'md' | 'lr'
interface SvgItemProps {
  id: SVGID
  color: FILL
  size: SVGSIZE
}

const SvgItem = ({ id, color, size }: SvgItemProps) => {
  const sizeStyle = {
    sm: styles.sm,
    md: styles.md,
    lr: styles.lr,
  }
  const fillStyle = {
    rt: styles.bg_root,
    ft: styles.bg_font,
    mn: styles.bg_main,
  }

  return (
    <svg
      className={[
        fillStyle[color],
        sizeStyle[size],
        id === 'cube' ? styles.main_animation : '',
      ].join(' ')}
    >
      <use href={'/svgs/iconsprite.svg#' + `${id}`} />
    </svg>
  )
}

export default SvgItem
