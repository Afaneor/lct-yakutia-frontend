import React from 'react'
import styles from './MailingPage.module.scss'
import { FCC } from 'src/types'

interface MailingPageProps {
    prop?: any
}
export const MailingPage: FCC<MailingPageProps> = ({prop}) => {
  return <div className={styles.container} data-testid='test-MailingPage'>MailingPage</div>
}

MailingPage.displayName = 'MailingPage'

export default MailingPage