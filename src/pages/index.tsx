import { Button, withAuthenticator } from "@aws-amplify/ui-react"

import { Auth } from "aws-amplify"
import { useId, useState } from "react"

export default withAuthenticator(function Home({signOut, user}) {
  const [input, setInput] = useState('')

  function handleUserChange() {
    console.log(input)

    const setUsername = async() => {
      let user = await Auth.currentAuthenticatedUser()
      const result = await Auth.updateUserAttributes(user, {"preferred_username": input})
      console.log(result)
    }

    setUsername().catch(console.error)
  }

  const id = useId()

  return (
    <div style={{ padding: 50 }}>
      <h1>Logged in as {user?.attributes?.preferred_username}.</h1>
      <div>
        <input id={id} value={input} onInput={e => setInput(e.target.value)} type="text" />
      </div>
      <div>
        <Button onClick={handleUserChange}>Change username</Button>
      </div>
      <div>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
})
