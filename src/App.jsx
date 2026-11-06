import Header from './header.jsx'
import TopBody from './TopBody.jsx'
import LizardBackground from "./liz_background";
import PendulumTree from './PendulumTree'
import Body from './body.jsx'
import Project from './ProjectSection.jsx'
function App() {
  return (
    <>
    <LizardBackground></LizardBackground>
  
    <Header></Header>

 
    <TopBody></TopBody>
    <Body></Body>
        
    
    <Project></Project>
    </>
  )
}

export default App;