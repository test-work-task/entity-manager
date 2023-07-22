import { FC, useEffect } from 'react'
import { IEntity } from '../../core/interfaces/entity.interface'
import { Rect, Text } from 'react-konva'

interface CustomTextProps {
    onClose: () => void
    entity: IEntity
    x: number
    y: number
}

const CustomText: FC<CustomTextProps> = ({ entity, x, y, onClose }) => {
    useEffect(() => {
        document.addEventListener('click', onClose)
        return () => {
            document.removeEventListener('click', onClose)
        }
    }, [])

    return (
        <>
            <Rect
                x={x + 10}
                y={y}
                width={100}
                height={80 + (entity.labels.length * 16)}
                fill='#313136'
                stroke='#83888e'
                strokeWidth={2}
                cornerRadius={10}
            />
            <Text
                x={x + 10}
                y={y}
                text={`${entity.name}\n\n${entity.labels.join(", ")}\n${entity.coordinate.join(", ")}`}
                fontSize={16}
                fill='#e8eaed'
                width={100}
                padding={15}
            />
        </>
    )
}

export default CustomText