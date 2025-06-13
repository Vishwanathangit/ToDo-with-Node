import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'

function App() {
  const [enteredvalue, setevalue] = useState("")
  const [fruits, setfruits] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/fruitslist") // 👈 Update to 3000
      .then((data) => {
        setfruits(data.data)
      })
      .catch((err) => console.error("GET failed", err))
  }, [])

  function handlechange(eve) {
    setevalue(eve.target.value)
  }

  function add() {
    axios.post("http://localhost:3000/addfruits", { newfruit: enteredvalue }) // 👈 Update to 3000
      .then(() => {
        setfruits([...fruits, { Name: enteredvalue }]) // Only update after successful POST
        setevalue("")
      })
      .catch((err) => console.error("POST failed", err))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Fruit List</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={enteredvalue}
            onChange={handlechange}
            placeholder="Enter fruit name"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={add}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="space-y-3">
          {fruits.map((item, index) => (
            <h1
              key={index}
              className="text-lg font-medium text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {item.Name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
