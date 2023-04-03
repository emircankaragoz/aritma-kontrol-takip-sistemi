import styles from "../../styles/AuthLayout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className="m-auto rounded p-5 border">
        <div className="d-flex justify-content-center">
          <div className="text-center p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
