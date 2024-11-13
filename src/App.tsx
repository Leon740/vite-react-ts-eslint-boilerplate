import { useState } from 'react'
import reactLogo from './assets/react.svg'
// Unable to resolve path to module '/vite.svg'.eslintimport/no-unresolved
import viteLogo from '/public/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // 'test' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
  const test = 123
  console.log('aaa')

  const f = [1, 2, 3, 4, 5].filter((n) => n % 2 === 0)

  return (
    <>
      <div>
        {/* Using target="_blank" without rel="noreferrer" (which implies rel="noopener") is a security risk in older browsers: see https://mathiasbynens.github.io/rel-noopener/#recommendationseslintreact/jsx-no-target-blank */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.eslintjsx-a11y/alt-text */}
      <img src="" />
      <h1>
        {/* * img elements must have an alt prop, either with meaningful text, or an empty string for decorative 
Missing an explicit type attribute for buttoneslintreact/button-has-type */}
        <button>test</button>
      </h1>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
