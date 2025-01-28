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
export type DefaultRestrictions = Record<DefaultRestrictionsIds, boolean | undefined>;

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
