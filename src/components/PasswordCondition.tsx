import React from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

export interface PasswordConditionProps {
  condition: string,
  passed: boolean
}

const PasswordCondition = ({ condition, passed }: PasswordConditionProps) => {
  return (
    <div className='rp-password-condition-container'>
      {
        passed ? <VscCheck fill='#8BC34A' /> : <VscChromeClose fill='#F44336' />
      }
      <p>{ condition }</p>
    </div>
  )
}

export default PasswordCondition;
