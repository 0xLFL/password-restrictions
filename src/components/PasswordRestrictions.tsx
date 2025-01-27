import React from "react";
import PasswordCondition from "./PasswordCondition";

export interface PasswordRestriction {
  condition: string,
  test: RegExp
}

export interface PasswordRestrictionsProps {
  label: string,
  password: string,
  confirmPassword: string,
  passwordRestrictions: PasswordRestriction[]
}

const PasswordRestrictions = ({
  label,
  password,
  confirmPassword,
  passwordRestrictions,
}: PasswordRestrictionsProps) => {
  return (
    <div>
      <h3>{label}</h3>
      {
        passwordRestrictions.map(({ condition, test }, index) => {
          return (
            <PasswordCondition key={index} condition={condition} passed={test.test(password)}/>
          )
        })
      }
      <PasswordCondition condition='Match' passed={password === confirmPassword}/>
    </div>
  )
}

export default PasswordRestrictions;
