import type { RefObject } from "react";
import styles from "./StageRoom.module.scss";

type StageRoomProps = {
  floor?: boolean;
  floorRef?: RefObject<HTMLDivElement>;
};

/** Ambient stage: clean lit wall + an optional receding floor. */
export function StageRoom({ floor = true, floorRef }: StageRoomProps) {
  return (
    <div aria-hidden="true" className={styles.room}>
      <div className={styles.back} />
      {floor ? (
        <>
          <div className={styles.floor} ref={floorRef} />
          <div className={styles.grounding} />
          <div className={styles.seam} />
        </>
      ) : null}
    </div>
  );
}
