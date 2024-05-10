import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Input } from '../app/components/form-elements'
import Layout from '../app/components/layout'
import Navbar from '../app/components/navbar'
import { useAppContext } from '../context/state'
import { login } from '../data/auth'

export default function Login() {
  const {setToken} = useAppContext();
  const username = useRef('')
  const password = useRef('')
  const router = useRouter()

  const submit = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value,
    }

    login(user).then((res) => {
      if (res.token) {
        setToken(res.token)
        router.push('/')
        
      }
    })
  }

  return (
    <div className="max-w-xl mx-auto">
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-6">
      <h1 className="text-2xl font-semibold title">Login</h1>
      <form className="box">
        <div className="mb-4 mt-5">
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
        <div className="field is-grouped">
          <div className="control">
            <button className="button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300" onClick={submit}>Login</button>

            <Link href="/register">
              <button className="button bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-300">Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
