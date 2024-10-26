import React from 'react'
import Spin from '@UI/Spin'

import * as styles from './index.scss'

function PageLoading() {
    return (
        <div className={styles.pageLoading}>
            <Spin width={50} opacity={0.8} height="100%" />
        </div>
    )
}

export default PageLoading
