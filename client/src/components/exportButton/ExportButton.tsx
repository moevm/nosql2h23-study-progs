import React, { useState, useEffect } from "react";
import { DocumentsAPIs } from "../../api/documents.api";

const ExportButton = () => {
    const [graph, setGraph] = useState("")

    const exportDB = async () => {
        const gData = await DocumentsAPIs.getGraphDataForExport();
        let data = await gData.data[0]._fields[0];
        setGraph(data);
    }

    useEffect(() => {
        exportDB();
    }, []);

	//return <button onClick={() => exportDB()}>Экспорт БД</button>;
    return <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(graph)}`}
        download="db.json">Экспоритровать БД</a>
};

export default ExportButton;
