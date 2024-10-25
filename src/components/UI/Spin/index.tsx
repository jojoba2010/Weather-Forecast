import React from 'react'
import Spinner from './spinner'
import * as styles from './index.scss'
interface IProps {
    marginTop?: string | number
    position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'
    opacity?: number
    size?: number
    color?: string
    showBackground?: boolean
    width?: string | number
    height?: string | number
}
const Spin = (props: IProps) => {
    const {
        marginTop,
        position = 'absolute',
        opacity = 0.5,
        size = 11,
        color = '#ff6414',
        showBackground = true,
        width=256,
        height
    } = props
    return (
        <div
            className={styles['spin-container']}
            style={{
                marginTop: marginTop,
                position: position,
                opacity: opacity,
                backgroundColor: showBackground ? '#fff' : 'unset',
                height:height
            }}
        >
            <div>
                <Spinner fillColor={color} size={size} width={width}/>
            </div>
        </div>
    )
}
export default Spin
