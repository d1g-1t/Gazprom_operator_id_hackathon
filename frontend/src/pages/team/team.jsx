import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import FloatingEdge from "./FloatingEdge";
import FloatingConnectionLine from "./FloatingConnectionLine";
import { CreateNodesAndEdges } from "./utils";

import styles from "./team.module.css";

import SidebarTeam from "../../components/sidebar-team/sidebar-team";
import TeamUser from "../../components/team-user/team-user";

import { getSidebarTeam } from "../../services/sidebar/reducer";
import { selectProjects } from "../../services/projects/reducer";

const Team = () => {
  const sidebarTeamId = useSelector(getSidebarTeam);
  const companyDiagram = useSelector(selectProjects);
  const sidebarTeam = companyDiagram?.teams.find(
    (i) => i.id === Number(sidebarTeamId)
  );

  const { nodes: initialNodes, edges: initialEdges } = CreateNodesAndEdges();

  const nodeTypes = {
    team_card_company: TeamUser,
  };

  const edgeTypes = {
    floating: FloatingEdge,
  };

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div className={styles.team}>
        <div className={styles.team__flow}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            connectionLineComponent={FloatingConnectionLine}
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className={styles.team__sidebar}>
          <div className={styles.team__sidebar_title_container}>
            <h3 className={styles.team__sidebar_title}>Профиль команды</h3>
          </div>
          <div className={styles.team__sidebar_content}>
            <SidebarTeam item={sidebarTeam} />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default Team;
