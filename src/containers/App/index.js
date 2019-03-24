import React from 'react'
import { Route } from 'react-router-dom'
import CategoryView from '../CategoryView'
import Tagedetail from '../Tagedetail'
import AddRule from '../AddRule'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={CategoryView} />
      <Route exact path="/tagdetail-view" component={Tagedetail} />
      <Route exact path="/new-rule" component={AddRule} />
    </main>
  </div>
)

export default App
