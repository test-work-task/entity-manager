import { FC, useEffect, useState } from 'react'
import { Stage, Layer, Arrow, Line } from 'react-konva';
import { IEntity } from '../../core/interfaces/entity.interface';
import CustomCircle from './CustomCircle';
const width = window.innerWidth

interface ChartProps {
    entities: IEntity[]
}

const Chart: FC<ChartProps> = ({ entities }) => {
    const [line, setLine] = useState<number[]>([])

    useEffect(() => {
        if(!entities) return;
        let arr: number[] = []
        entities.map(entity => {
            arr = [...arr, Number(entity.coordinate[0]) + width / 2, 250 - Number(entity.coordinate[1])]
        })
        setLine(arr)
    }, [entities])


    return (
        <Stage width={width} height={500}>
            <Layer>
                <Arrow
                    x={0}
                    y={0}
                    points={[width / 2, 500, width / 2, 0]}
                    pointerLength={10}
                    pointerWidth={6}
                    fill='#83888e'
                    stroke='#83888e'
                    strokeWidth={1}
                />
                <Arrow
                    x={0}
                    y={0}
                    points={[0, 250, width, 250]}
                    pointerLength={10}
                    pointerWidth={6}
                    fill='#83888e'
                    stroke='#83888e'
                    strokeWidth={1}
                />
                {line.length > 0 && (
                    <Line
                        points={line}
                        stroke='#3eb3d4db'
                        strokeWidth={2}
                        lineCap='round'
                        lineJoin='round'
                    />
                )}
                {entities && entities.map((entity) => (
                    <CustomCircle
                        key={entity._id}
                        entity={entity}
                        width={width}
                    />
                ))}
            </Layer>
        </Stage>
    )
}

export default Chart