import React, { useEffect, useState } from "react";
import PasswordCondition from "./PasswordCondition";

export interface PasswordRestriction {
  condition: string,
  test: RegExp,
}

export const defaultRestrictionsIds = {
  minChar: 'minChar',
  containLower: 'containLower',
  containUpper: 'containUpper',
  containNum: 'containNum',
  containSpecial: 'containSpecial',
} as const;

type DefaultRestrictionsIds = typeof defaultRestrictionsIds[keyof typeof defaultRestrictionsIds];
export type DefaultRestrictions = Partial<Record<DefaultRestrictionsIds, boolean | undefined>>;

export interface PasswordRestrictionsProps {
  label: string,
  password: string,
  confirmPassword?: string,
  passwordRestrictions?: PasswordRestriction[],
  configureDefault?: DefaultRestrictions,
  confirmPasswordCondition?: string,
  labelStyle?: React.CSSProperties,
  containerStyle?: React.CSSProperties,
  restrictionStyle?: React.CSSProperties,
  iconStyle?: React.CSSProperties,
  passColor?: string,
  passIcon?: React.ReactNode,
  failColor?: string,
  failIcon?: React.ReactNode,
}

const defaultRestrictions: Record<DefaultRestrictionsIds, PasswordRestriction> = {
  [defaultRestrictionsIds.minChar]: {
    condition: 'Be at least 8 characters long',
    test: /.{8,}/,
  },
  [defaultRestrictionsIds.containLower]: {
    condition: 'Contain a lowercase letter',
    test: /[a-z]/,
  },
  [defaultRestrictionsIds.containUpper]: {
    condition: 'Contain a uppercase letter',
    test: /[A-Z]/,
  },
  [defaultRestrictionsIds.containNum]: {
    condition: 'Contain a number letter',
    test: /[0-9]/,
  },
  [defaultRestrictionsIds.containSpecial]: {
    condition: 'Contain a special character',
    test: /[^\w\s]/,
  }
}

/**
 * PasswordRestriction creates a element that provides visual feedback to 
 * users on weather they are currently meeting the reqired password criteria
 * 
 * @typedef {object} PasswordRestrictionsProps
 * @param {string} label - The Label for the reqirements
 * @param {string} password - The Password the user has entered
 * @param {string} [confirmPassword] - For confirming both passwords match, the match reqirement will appear if this is defined defined
 * @param {PasswordRestriction[]} [passwordRestrictions] - For having custom restrictions, when defined none of the default restrictions will be rendered
 * @param {DefaultRestrictions} [configureDefault] - Allows for the requirement of select default requirements, when defined only reqs that have keys defined as true will be rendered
 * @param {string} [confirmPasswordCondition] - The label of the passwords must match requirement
 * @param {React.CSSProperties} [labelStyle] - For appling styles to the label
 * @param {React.CSSProperties} [containerStyle] - For appling styles to the components container
 * @param {React.CSSProperties} [restrictionStyle] - For appling styles to the container of each restriction
 * @param {React.CSSProperties} [iconStyle] - For appling styles to the container of each icon
 * @param {string} [passColor] - The Color of the Pass icon (only when using the default icon)
 * @param {React.ReactNode} [passIcon] - The Icon to be displayed if the password passes a restriction  
 * @param {string} [failColor] - The Color of the Fail icon (only when using the default icon) 
 * @param {React.ReactNode} [failIcon] - The Icon to be displayed if the password fails a restriction
 * 
 * @returns {JSX.Element}
 */
const PasswordRestrictions = ({
  label,
  password,
  confirmPassword,
  passwordRestrictions,
  configureDefault,
  confirmPasswordCondition,
  labelStyle = {},
  containerStyle = {},
  restrictionStyle,
  iconStyle,
  passColor,
  passIcon,
  failColor,
  failIcon,
}: PasswordRestrictionsProps) => {
  const [passwordRestrictions_, setPasswordRestrictions] = useState<PasswordRestriction[]>([]);

  // prevents the passwordRestrictictions from being set every time there is a state change
  useEffect(() => {
    const _passwordRestrictions: PasswordRestriction[] = [];
    if (passwordRestrictions === undefined && configureDefault) {
      for (const id of Object.values(defaultRestrictionsIds)) {
        if (configureDefault[id]) {
          _passwordRestrictions.push(defaultRestrictions[id])
        }
      }
    } else if (passwordRestrictions === undefined) {
      _passwordRestrictions.push(...Object.values(defaultRestrictions));
    } else {
      return setPasswordRestrictions(passwordRestrictions)
    }

    setPasswordRestrictions(_passwordRestrictions)
  }, [passwordRestrictions, configureDefault,])

  return (
    <div style={containerStyle}>
      <h3 style={labelStyle}>{label}</h3>
      {
        passwordRestrictions_.map(({ condition, test }, index) => {
          return (
            <PasswordCondition
              key={index}
              condition={condition}
              passed={test.test(password)}
              restrictionStyle={restrictionStyle}
              iconStyle={iconStyle}
              passColor={passColor}
              passIcon={passIcon}
              failColor={failColor}
              failIcon={failIcon}
            />
          )
        })
      }
      { confirmPassword !== undefined &&
        <PasswordCondition
          condition={confirmPasswordCondition || 'Match'}
          passed={password === confirmPassword}
          restrictionStyle={restrictionStyle}
          iconStyle={iconStyle}
          passColor={passColor}
          passIcon={passIcon}
          failColor={failColor}
          failIcon={failIcon}
        />
      }
    </div>
  )
}

export default PasswordRestrictions;
