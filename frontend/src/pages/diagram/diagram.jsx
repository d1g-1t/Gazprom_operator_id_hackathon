import { useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "./DnDContext";

import { CloseOutlined } from "@ant-design/icons";

import dagre from "dagre";

import styles from "./diagram.module.css";

import CatalogCard from "../../components/catalog-card/catalog-card";
import DiagramUser from "../../components/diagram-user/diagram-user";
import DiagramComponent from "../../components/diagram-component/diagram-component";
import DiagramTeam from "../../components/diagram-team/diagram-team";
import Sidebar from "../../components/diagram-sidebar/diagram-sidebar";
import SidebarTeam from "../../components/sidebar-team/sidebar-team";
import SidebarComponent from "../../components/sidebar-component/sidebar-component";

import { selectUsers } from "../../services/users/reducer";
import { selectProjects } from "../../services/projects/reducer";

import {
  getSidebarStatus,
  getSidebarUser,
  getSidebarTeam,
  getSidebarComponent,
  setSidebarStatus,
  setSidebarUser,
  setSidebarTeam,
  setSidebarComponent,
} from "../../services/sidebar/reducer";
import DiagramNewUser from "../../components/diagram-new-user/diagram-new-user";
import { Button } from "antd";

const Diagram = () => {
  const dispatch = useDispatch();

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const companyStructure = useSelector(selectUsers);
  const companyDiagram = useSelector(selectProjects);
  const isSidebarOpen = useSelector(getSidebarStatus);
  const sidebarUserId = useSelector(getSidebarUser);
  const sidebarTeamId = useSelector(getSidebarTeam);
  const sidebarComponentId = useSelector(getSidebarComponent);

  const sidebarUser = companyStructure?.find(
    (i) => i.id === Number(sidebarUserId)
  );
  const sidebarTeam = companyDiagram?.teams.find(
    (i) => i.id === Number(sidebarTeamId)
  );
  const sidebarComponent = companyDiagram?.components.find(
    (i) => i.id === Number(sidebarComponentId)
  );

  const handleSidebarClose = () => {
    dispatch(setSidebarStatus(false));
    dispatch(setSidebarUser(null));
    dispatch(setSidebarTeam(null));
    dispatch(setSidebarComponent(null));
  };

  let sideBarTitle = null;

  if (sidebarUserId !== null) {
    sideBarTitle = "Карточка сотрудника";
  } else if (sidebarTeamId !== null) {
    sideBarTitle = "Профиль команды";
  } else if (sidebarComponentId !== null) {
    sideBarTitle = "Параметры компоненты";
  }

  let sideBarContent = null;

  if (sidebarUserId !== null) {
    sideBarContent = <CatalogCard item={sidebarUser} />;
  } else if (sidebarTeamId !== null) {
    sideBarContent = <SidebarTeam item={sidebarTeam} />;
  } else if (sidebarComponentId !== null) {
    sideBarContent = <SidebarComponent item={sidebarComponent} />;
  }

  const nodeTypes = {
    diagram_component: DiagramComponent,
    diagram_team: DiagramTeam,
    diagram_user: DiagramUser,
    diagram_new_user: DiagramNewUser,
  };

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "diagram_new_user",
        position,
        data: { label: `${type} ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  let initialNodes = [];
  let initialEdges = [];
  let productTeams = [];

  companyDiagram?.teams.map((item) => {
    if (
      !item.name.includes("Маркетинг") &&
      !item.name.includes("Менеджмент") &&
      !item.name.includes("HR")
    ) {
      productTeams.push(item);
    }
    return companyDiagram;
  });

  companyDiagram?.components.map((item) => {
    initialNodes.push({
      id: `${item.id}`,
      position: {
        x: 0,
        y: 0,
      },
      type: "diagram_component",
      data: {
        name: item.name,
        id: `${item.id}`,
      },
      coordinate: 400,
    });
    return initialNodes;
  });

  productTeams.map((item) => {
    initialNodes.push({
      id: `${item.id}`,
      position: {
        x: 0,
        y: 0,
      },
      type: "diagram_team",
      data: {
        name: item.name,
        id: `${item.id}`,
      },
      coordinate: 200,
    });
    return initialNodes;
  });

  companyStructure?.map((item) => {
    if (item.componentId) {
      initialNodes.push({
        id: `${item.id}`,
        position: {
          x: 0,
          y: 0,
        },
        type: "diagram_user",
        data: {
          first_name: item.first_name,
          last_name: item.last_name,
          photo: item.photo,
          itemId: id,
          departmentId: item.departmentId,
          id: `${item.id}`,
        },
        coordinate: 100,
      });
    }
    return initialNodes;
  });

  companyDiagram?.teams.map((item) => {
    initialEdges.push({
      id: `e${item.id}-${item.componentIds}`,
      source: `${item.id}`,
      target: `${item.componentIds}`,
    });
    return initialEdges;
  });

  companyStructure?.map((item) => {
    initialEdges.push({
      id: `e${item.id}-${item.teamId}`,
      source: `${item.id}`,
      target: `${item.teamId}`,
    });
    return initialEdges;
  });

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 100;
  const nodeHeight = 100;

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
          y: nodeWithPosition.y - nodeWidth / 2 + node.coordinate,
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

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handeleSidebarOpen = () => {
    setIsSidebarOpened(true);
  };

  const handeleSidebarClose = () => {
    setIsSidebarOpened(false);
  };

  return (
    <div className={styles.diagram}>
      {isSidebarOpened ? (
        <div>
          <Sidebar />
          <Button
            onClick={handeleSidebarClose}
            className={styles.diagram__close_button}
          >
            <CloseOutlined />
          </Button>
        </div>
      ) : (
        <Button
          onClick={handeleSidebarOpen}
          className={styles.diagram__open_button}
        >
          Добавить элементы
        </Button>
      )}

      <div className={styles.diagram__flow} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {isSidebarOpen &&
      (sidebarUserId || sidebarTeamId || sidebarComponentId) ? (
        <div className={styles.diagram__sidebar}>
          <div className={styles.diagram__sidebar_title_container}>
            <h3 className={styles.diagram__sidebar_title}>{sideBarTitle}</h3>
            <button
              className={styles.diagram__sidebar_button_close}
              onClick={handleSidebarClose}
            >
              <CloseOutlined />
            </button>
          </div>
          <div className={styles.diagram__sidebar_content}>
            {sideBarContent}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <Diagram />
    </DnDProvider>
  </ReactFlowProvider>
);
