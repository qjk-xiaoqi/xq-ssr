import * as React from 'react'

import Coffee from '@/assets/images/coffee.jpg'

// import './index.less'

const App: React.FC = () => {
  const handleClick = () => {
    console.log('66666')
  }
  return (
    <div className="wrapper">
      hello 小柒
      <div onClick={handleClick}>66666</div>
      <img src={Coffee} width={200} height={100} />
    </div>
  )
}

export default App
