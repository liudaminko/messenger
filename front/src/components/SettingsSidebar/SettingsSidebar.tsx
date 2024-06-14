import styles from "./SettingsSidebar.module.css";

function SettingsSidebar() {
  return (
    <div className={styles.container}>
      <img src="/more-lines.png" className={styles.icons} />
      <img src="/logo-white.svg" className={styles.icons} />
    </div>
  );
}

export default SettingsSidebar;
