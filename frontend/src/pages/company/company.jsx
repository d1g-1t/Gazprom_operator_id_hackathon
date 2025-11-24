import { useSelector } from "react-redux";

import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
} from "@xyflow/react";

import dagre from "dagre";

import styles from "./company.module.css";

import CompanyCard from "../../components/company-card/company-card";

import { selectUsers } from "../../services/users/reducer";

const Company = () => {
  const companyStructure = useSelector(selectUsers);

  const nodeTypes = {
    team_card_company: CompanyCard,
  };

  let initialNodes = [];
  let initialEdges = [];
  companyStructure?.map((item) => {
    initialNodes.push({
      id: `${item.id}`,
      position: { x: 0, y: 0 },
      type: "team_card_company",
      data: {
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        photo: item.photo,
        position: item.position,
        level: item.level,
        grade: item.grade,
        employment_type: item.employment_type,
        timezone: item.timezone,
        contacts: item.contacts.links,
      },
    });
    initialEdges.push({
      id: `e${item.id}-${item.bossId}`,
      source: `${item.id}`,
      target: `${item.bossId}`,
    });
    return companyStructure;
  });

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 250;
  const nodeHeight = 230;

  const getLayoutedElements = (nodes, edges) => {
    dagreGraph.setGraph({});

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: node.data.level * 420,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);

  return (
    <div className={styles.company}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Company;
