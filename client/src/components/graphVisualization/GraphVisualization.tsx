import React, { useState, useEffect } from "react";
import { DocumentsAPIs } from "../../api/documents.api";
import ForceGraph3D from 'react-force-graph-3d';
import ReactDOM from "react-dom/client";
import ForceGraph from "react-force-graph-3d";
import {json} from "stream/consumers";

const GraphVisualization = () => {
    const[graph, setGraph] = useState({nodes: [], links: []});

     const getGraphData = async () => {
       const gData = await DocumentsAPIs.getGraphData();
       let data = await gData.data;
       setGraph(data);
     };

     useEffect(() => {
         getGraphData();
     }, []);

    return(
        <div className="graphVisualization">
            <ForceGraph3D
                graphData={graph}
                nodeAutoColorBy="label"
                nodeLabel="caption"
                nodeThreeObjectExtend={true}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}/>
        </div>
    );
};

export default GraphVisualization;
