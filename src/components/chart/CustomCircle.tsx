import { FC, useState } from 'react'
import { Circle } from 'react-konva'
import { IEntity } from '../../core/interfaces/entity.interface'
import CustomText from './CustomText'

interface CustomCircleProps {
    entity: IEntity
    width: number
}

const CustomCircle: FC<CustomCircleProps> = ({ entity, width }) => {
    const [showText, setShowText] = useState(false)
    const x = Number(entity.coordinate[0]) + width / 2
    const y = 250 - Number(entity.coordinate[1])
    return (
        <>
            <Circle
                x={x}
                y={y}
                radius={2.5}
                fill="#3eb3d4db"
            />
            <Circle
                x={x}
                y={y}
                radius={5}
                fill="#3eb3d454"
                onClick={() => {setShowText(true)}}
            />
            {showText && (
                <CustomText
                    x={x}
                    y={y}
                    entity={entity}
                    onClose={() => {setShowText(false)}}
                />
            )}
        </>
    )
}

export default CustomCircle