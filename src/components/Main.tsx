import React, {useState} from "react";
import * as ST from './styled';

// interface IEdge {
//     firstVertex: number,
//     secondVertex: number,
//     weight: number
// }

const Main = () => {
    const [fileName, setFileName] = useState('Граф');
    const [quantityVertex, setQuantityVertex] = useState(0);
    const [quantityEdge, setQuantityEdge] = useState(0);
    const [edgesList, setEdgesList] = useState([
        [1, 6, 20],
        [4, 5, 20],
        [4, 7, 30],
        [2, 7, 40],
        [2, 8, 35]
    ]);
    const [vertexList, setVertexList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const getGraphAsEdgeList = (edgesList : any) => {
        const vertexAmount = `${vertexList.length} \n`;
        // @ts-ignore
        const edgeList = edgesList.map((edge : []) => `${edge[0]} ${edge[1]} ${edge[2]} \n`);
        return vertexAmount + edgeList.join('');
    }

    const addVertex = () => {
        const numberVertex = +prompt('Укажите номер вершины')!;
        const newVertexList = vertexList;

        if (!(vertexList.indexOf(numberVertex) === -1)){
            window.alert('Данная вершина уже существует!');
            return;
        }

        newVertexList.push(numberVertex);
        setVertexList(newVertexList);
    }

    const countingQuantityVertex = () => {
        setQuantityVertex(vertexList.length);
    }

    const deleteEdge = () => {
        const firstVertex = +prompt('Укажите первую вершину:')!;
        const secondVertex = +prompt('Укажите вторую вершину')!;
        let flag = 0;

        if (firstVertex === secondVertex || vertexList.indexOf(firstVertex) === -1 || vertexList.indexOf(secondVertex) === -1){
            window.alert('Такого ребра не существует')
            return;
        }
        const calcNewList = (edgesList : any, indexOut : number) => {
            let newEdgesList: number[][] = [];
            edgesList.forEach((item : Array<number>, indexIn : number) => {
                if (indexOut !== indexIn) {
                    newEdgesList.push(item)
                }
            });
            setQuantityEdge(newEdgesList.length);
            return newEdgesList;
        }
        edgesList.forEach((item, index) => {
            if ((item[0] === firstVertex && item[1] === secondVertex)
                || (item[0] === secondVertex && item[1] === firstVertex)) {
                setEdgesList(calcNewList(edgesList, index));
                flag = 1;
            }
        })

        if (flag === 1){
            return;
        } else {
            window.alert('Такого ребра не существует');
        }
    }

    const countingQuantityEdge = () => {
        setQuantityEdge(edgesList.length);
    }

    const checkEdges = () => {
        const firstVertex = +prompt('Укажите первую вершину:')!;
        const secondVertex = +prompt('Укажите вторую вершину')!;
        let flag = 0;

        if (vertexList.indexOf(firstVertex) === -1 || vertexList.indexOf(secondVertex) === -1){
            window.alert('Какой-то из вершины не существует');
            return;
        }

        if (firstVertex === secondVertex){
            window.alert('Укажите разные вершины');
            return;
        }

        edgesList.forEach((item) => {
            if ((item[0] === firstVertex && item[1] === secondVertex)
                || (item[0] === secondVertex && item[1] === firstVertex)) {
                alert('Данные вершины смежны');
                flag = 1;
            }
        })

        if (flag === 1){
            return;
        } else {
            window.alert('Данные вершины не смежны');
        }
    }

    const getWeightEdge = () => {
        const firstVertex = +prompt('Укажите первую вершину:')!;
        const secondVertex = +prompt('Укажите вторую вершину')!;
        let flag = 0;

        if (vertexList.indexOf(firstVertex) === -1 || vertexList.indexOf(secondVertex) === -1){
            window.alert('Какой-то из вершины не существует');
            return;
        }

        if (firstVertex === secondVertex){
            window.alert('Укажите разные вершины');
            return;
        }

        edgesList.forEach((item) => {
            if ((item[0] === firstVertex && item[1] === secondVertex)
                || (item[0] === secondVertex && item[1] === firstVertex)) {
                alert(item[2]);
                flag = 1;
            }
        })

        if (flag === 1){
            return;
        } else {
            window.alert('Такого ребра не существует');
        }
    }

    const addEdge = () => {
        const firstVertex = +prompt('Укажите первую вершину:')!;
        const secondVertex = +prompt('Укажите вторую вершину')!;
        const weightEdge = +prompt('Укажите вес ребра')!;

        if (vertexList.indexOf(firstVertex) === -1 || vertexList.indexOf(secondVertex) === -1){
            window.alert('Какой-то из вершины не существует');
            return;
        }

        if (firstVertex === secondVertex){
            window.alert('Укажите разные вершины');
            return;
        }

        setEdgesList([...edgesList, [firstVertex, secondVertex, weightEdge]]);
    }

    return (
            <ST.Container>
                <ST.MainContainer>
                    <ST.AddVertexButton onClick={() => addVertex()}>Добавить вершину</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => countingQuantityVertex()}>Узнать число вершин</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => countingQuantityEdge()}>Узнать число ребер</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => getWeightEdge()}>Узнать вес ребра</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => checkEdges()}>Проверка на смежность</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => addEdge()}>Добавить ребро</ST.AddVertexButton>
                    <ST.AddVertexButton onClick={() => deleteEdge()}>Удалить ребро</ST.AddVertexButton>
                </ST.MainContainer>
                <ST.Output>
                    <ST.QuantityVertex>Число вершин: {quantityVertex}</ST.QuantityVertex>
                    <ST.QuantityEdge>Число ребер: {quantityEdge}</ST.QuantityEdge>
                </ST.Output>
                <ST.Output>
                    <ST.DownloadGraphFileName placeholder={'Укажите имя файла'} onChange={(e) => setFileName(e.target.value)}/>
                    <ST.DownloadGraphAsEdgeList
                        href={`${window.URL.createObjectURL(new Blob([getGraphAsEdgeList(edgesList)], {type: 'text/plain;charset=utf-8;'}))}`}
                        download={fileName}
                    >
                        Скачать граф в виде списка ребер
                    </ST.DownloadGraphAsEdgeList>
                </ST.Output>
            </ST.Container>
    )
}

export default Main;