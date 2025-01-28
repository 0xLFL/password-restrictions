import React from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

export interface PasswordConditionProps {
  condition: string,
  passed: boolean,
  passColor?: string,
  passIcon?: React.ReactNode,
  failColor?: string,
  failIcon?: React.ReactNode,
  restrictionStyle?: React.CSSProperties,
  iconStyle?: React.CSSProperties,
}

const PasswordCondition = ({
  condition,
  passed,
  passColor = '#8BC34A',
  passIcon,
  failColor = '#F44336',
  failIcon,
  restrictionStyle = {},
  iconStyle = {},
}: PasswordConditionProps) => {
  const resolvedPassSymbol = passIcon || <VscCheck style={iconStyle} fill={passColor} />;
  const resolvedFailSymbol = failIcon || <VscChromeClose style={iconStyle} fill={failColor} />;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      ...restrictionStyle
    }}>
      {
        passed ? resolvedPassSymbol : resolvedFailSymbol
      }
      <p>{ condition }</p>
    </div>
  )
}

export default PasswordCondition;
