import React, { useState, useCallback, ChangeEvent } from 'react'
import ImgSearch from '@assets/search.svg'
import * as styles from './index.scss'

interface IProps {
    onSearch: (e: string) => void
    getForecastBySearch: () => void
}
const Search = React.memo((props: IProps) => {
    const { onSearch, getForecastBySearch } = props
    const [inputValue, setInputValue] = useState('')

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setInputValue(value)
            onSearch(value)
        },
        [onSearch]
    )
    const enterKeyHandler = e => {
        if (e.key === 'Enter' && inputValue) getForecastBySearch()
    }
    return (
        <div className={styles['search']}>
            <input
                type="text"
                placeholder="City"
                onChange={handleChange}
                onKeyDown={enterKeyHandler}
                value={inputValue}
            />
            <img src={ImgSearch} onClick={getForecastBySearch} />
        </div>
    )
})

export default Search
