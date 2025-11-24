import styles from "./diagram-new-user.module.css";

import { Handle, Position } from "@xyflow/react";

import { UserOutlined } from "@ant-design/icons";

function DiagramNewUser({ data }) {
  return (
    <div className={styles.diagram_new_user}>
      <Handle type="source" position={Position.Bottom} />
      <UserOutlined />
      <div className={styles.diagram_new_user__position}>{data.label}</div>
    </div>
  );
}

export default DiagramNewUser;
