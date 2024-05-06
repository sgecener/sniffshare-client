import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Input } from '../app/components/form-elements'
import Layout from '../app/components/layout'
import Navbar from '../app/components/navbar'
import { useAppContext } from '../context/state'
import { register } from '../data/auth'

export default function Register() {
  const {setToken} = useAppContext();
  const firstName = useRef('')
  const lastName = useRef('')
  const username = useRef('')
  const password = useRef('')
  const router = useRouter()
  const email = useRef('')

  const submit = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value
    }

    register(user).then((res) => {
      if (res.token) {
        setToken(res.token);
        router.push('/');
      }
    })
  }

  return (
    <div className="max-w-xl mx-auto">
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-6">
      <h1 className="text-2xl font-semibold title">Welcome!</h1>
      <form className="box">
        <div className="mb-4">
          <Input
            id="firstName"
            refEl={firstName}
            type="text"
            label="First Name"
          />
        </div>
        <div className="mb-4">
          
          <Input
            id="lastName"
            refEl={lastName}
            type="text"
            label="Last Name"
          />
        </div>
        <div className="mb-4">
          
          <Input
            id="username"
            refEl={username}
            type="text"
            label="Username"
          />
        </div>
        <div className="mb-4">
          
          <Input
            id="password"
            refEl={password}
            type="password"
            label="Password"
          />
        </div>
        <div className="mb-4">

          <Input
            id="email"
            refEl={email}
            type="text"
            label="Email"
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300" onClick={submit}>Submit</button>
          </div>
          <div className="control">
            <Link href="/login">
              <button className="button bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-300">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
