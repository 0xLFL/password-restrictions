# PasswordRestriction

## Getting Started
PasswordRestriction creates a element that provides visual feedback to users on weather they are currently meeting the reqired password criteria

### Example
https://github.com/user-attachments/assets/b3e1a8f0-2353-484f-849c-cd6797f82cff




### Prerequisites
- Node.js (>= 16.x)
- npm (or yarn)

### Installation
```shell
npm i password-restrictions
```

### Usage
```jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginInput from '../LoginInput';
import { UserRegisterInputErrors } from '@/providers/UserRegisterProvider';
import PasswordRestrictions from 'password-restrictions';

const PasswordStageBody = ({
  isLoading,
  password,
  setPassword,
  back,
  next,
  error,
  PasswordRestrictionLabel,
}: {
  isLoading: boolean,
  password: Record<string, string>,
  setPassword: (name: string, password_: string) => void,
  back: () => void,
  next: () => Promise<void>,
  error: UserRegisterInputErrors,
  PasswordRestrictionLabel: string
}) => {
  const [passwordVisable, setPasswordVisable] = useState<boolean>(false);
  const togglePassword = () => {
    setPasswordVisable(!passwordVisable)
  }

  const [confirmVisable, setConfirmVisable] = useState<boolean>(false);
  const toggleConfirm = () => {
    setConfirmVisable(!confirmVisable)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await next();
  }

  const back_ = () => {
    setPasswordVisable(false);
    setConfirmVisable(false);
    back();
  }

  return (
    <form id='password-stage-container' onSubmit={handleSubmit} className='rp-input-container'>
      <PasswordRestrictions
        label={PasswordRestrictionLabel}
        password={password.password}
        confirmPassword={password.confirm}
      />
      <LoginInput
        type={passwordVisable ? 'text' : 'password'}
        id='password-stage-container-password'
        name='new-password'
        placeholder='New Password'
        disabled={isLoading as boolean}
        value={password.password}
        onChange={(e) => setPassword('password', e.target.value)}
        required={true}
        icon={
          <div onClick={togglePassword}>
            { passwordVisable ? <FaEye className='icon' /> : <FaEyeSlash className='icon' /> }
          </div>
        }
        error={error.password}
      />
      <LoginInput
        type={confirmVisable ? 'text' : 'password'}
        id='password-stage-container-confirm'
        name='confirm-password'
        placeholder='Confirm Password'
        disabled={isLoading as boolean}
        value={password.confirm}
        onChange={(e) => setPassword('confirm', e.target.value)}
        required={true}
        icon={
          <div onClick={toggleConfirm}>
            { confirmVisable ? <FaEye className='icon' /> : <FaEyeSlash className='icon' /> }
          </div>
        }
      />

      <button name='password-stage-container-submit' type='submit' disabled={isLoading as boolean}>Next</button>
      <div className='rp-res-login'>
        <a href='#' onClick={back_}>Back</a>
      </div>
    </form>
  )
}

export default PasswordStageBody;

```

### Types
```jsx

type DefaultRestrictionsIds = 'minChar' | 'containLower' | 'containUpper' | 'containNum' | 'containSpecial';

export type DefaultRestrictions = Partial<Record<DefaultRestrictionsIds, boolean | undefined>>;

export interface PasswordRestriction {
  condition: string,
  test: RegExp,
}
```

### Props
| Prop                     | Description                                                                                                                       | Type                                      | Required | Defaults to    |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|----------|---------------|
| label                    | The Label for the reqirements - seen in the example as "Your password must have"                                                  | `string`                                  | Yes      |  -            |
| password                 | The Password the user has entered                                                                                                 | `string`                                  | Yes      |  -            |
| confirmPassword          | For confirming both passwords match, the match reqirement will appear if this is defined defined                                  | `string`                                  | No       |  -            |
| confirmPasswordCondition | The label of the passwords must match requirement                                                                                 | `string`                                  | No       | 'Match'       |
| configureDefault         | Allows for the requirement of select default requirements, when defined only reqs that have keys defined as true will be rendered | `DefaultRestrictions`                     | No       |  -            |
| labelStyle               | For appling styles to the label                                                                                                   |   `React.CSSProperties`                     | No       |  {}           |
| containerStyle           | For appling styles to the components container                                                                                    |    `React.CSSProperties`                     | No       |  {}           |
| restrictionStyle         | For appling styles to the container of each restriction                                                                           |    `React.CSSProperties`                     | No       |  {}           |
| iconStyle                | For appling styles to the container of each icon                                                                                  |   `React.CSSProperties`                     | No       |  {}           |
| passColor                | The Color of the Pass icon (only when using the default icon)                                                                     |  `string (color - HexCode/RGB/color name)` | No       | '#8BC34A'     |
| passIcon                 | The Icon to be displayed if the password passes a restriction                                                                     |   `React.ReactNode`                         | No       | `<VscCheck/>` |
| failColor                | The Color of the Fail icon (only when using the default icon)                                                                     |   `string (color - HexCode/RGB/color name)` | No       | '#F44336'      |
| failIcon                 | The Icon to be displayed if the password fails a restriction                                                                      |   `React.ReactNode`                         | No       | `<VscClose/>` |
| passwordRestrictions     | For having custom restrictions, when defined none of the default restrictions will be rendered                                    | `PasswordRestriction[]`                   | No       |  See Below     |
```js
[{
  condition: 'Be at least 8 characters long',
  test: /.{8,}/,
},  {
  condition: 'Contain a lowercase letter',
  test: /[a-z]/,
}, {
  condition: 'Contain a uppercase letter',
  test: /[A-Z]/,
}, {
  condition: 'Contain a number letter',
  test: /[0-9]/,
}, {
  condition: 'Contain a special character',
  test: /[^\w\s]/,
}]
```
