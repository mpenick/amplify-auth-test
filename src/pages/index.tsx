import { Button, withAuthenticator } from "@aws-amplify/ui-react"

import { Auth } from "aws-amplify"
import { useId, useState } from "react"

export default withAuthenticator(function Home({ signOut, user }) {
  const [usernameInput, setUsernameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [requiresVerify, setRequiresVerify] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')

  function handleUserChange() {
    console.log(usernameInput)

    const setUsername = async () => {
      let user = await Auth.currentAuthenticatedUser()
      const result = await Auth.updateUserAttributes(user, { preferred_username: usernameInput })
      console.log(result)
    }

    setUsername().catch(console.error)
  }

  function handleEmailChange() {
    console.log(emailInput)

    const setEmail = async () => {
      let user = await Auth.currentAuthenticatedUser()
      const result = await Auth.updateUserAttributes(user, { email: emailInput })
      setRequiresVerify(true)
      console.log(result)
    }

    setEmail().catch(console.error)
  }

  function handleEmailVerify() {
    console.log(emailInput)

    const doVerify = async () => {
      let user = await Auth.currentAuthenticatedUser()
      const result = await Auth.verifyUserAttributeSubmit(user, 'email', verifyCode)
      setRequiresVerify(true)
      console.log(result)
    }

    doVerify().catch(console.error)
  }

  const id = useId()

  const verifyContent = <div>
    <div>
      <input id={id} value={verifyCode} onInput={e => setVerifyCode(e.target.value)} type="text" />
    </div>
    <div>
      <Button onClick={handleEmailVerify}>Enter email verification code</Button>
    </div>
  </div>

  return (
    <div style={{ padding: 50 }}>
      <h1>Logged in as {user?.attributes?.preferred_username}.</h1>
      <div>
        <div>
          <input id={id} value={usernameInput} onInput={e => setUsernameInput(e.target.value)} type="text" />
        </div>
        <div>
          <Button onClick={handleUserChange}>Change username</Button>
        </div>
      </div>
      <div>
        <div>
          <input id={id} value={emailInput} onInput={e => setEmailInput(e.target.value)} type="text" />
        </div>
        <div>
          <Button onClick={handleEmailChange}>Change email</Button>
        </div>
      </div>
      {requiresVerify && verifyContent}
      <div>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
})
