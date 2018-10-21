import React from 'react'
import styles from "./Header.module.scss";


class Header extends React.Component {

    render() {
        return <React.Fragment>
            <div className={styles['header_image_container']}>
                <div className={styles['pizza']}/>
            </div>
            <div className={styles['header']}>
                <h1>WeEat</h1>
                <h2>It's 12:00 and you're hungry.</h2>
            </div>
        </React.Fragment>
    }
}

export default Header;