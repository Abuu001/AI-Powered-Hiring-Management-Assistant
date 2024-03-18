import { Fragment,useState ,useEffect} from 'react';
import './App.css';
import  {BrowserRouter as Router , Switch,Route,Redirect} from "react-router-dom"
import Login from './components/Login__Registration/Login';
import Registration from './components/Login__Registration/Registration';
import Dashboard from "./components/Login__Registration/Dashboard/Dashboard"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CensusQA from './components/Census QA/CensusQA';
import CensusForm from './components/Census QA/CensusForm';
import OnlineMeeting from './components/Census QA/OnlineMeeting';
import Final from './components/Census QA/Final';
import GoogleMeetCalendar from './components/GoogleMeetCalendar/GoogleMeetCalendar';
import ScheduleMeeting from './components/ScheduleMeeting/ScheduleMeeting';
import SharedMeeting from "./components/SharedMeetingPage/SharedMeeting"

toast.configure();

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const isAuth=async ()=>{
    try {
      const response = await fetch("/auth/is-verify",{
        method :"GET",
        headers : {token : localStorage.token}
      })

      const parseRes = await response.json()
      parseRes ===  true  ?   setIsAuthenticated(true) : setIsAuthenticated(false)
      console.log(parseRes);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    isAuth()
  },[])

  const setAuth =(boolean)=>{
    setIsAuthenticated(boolean)
  }
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
              <Route exact path="/" render={props => !isAuthenticated ?  (<Login  {...props} setAuth={setAuth} />)  :  (<Redirect to="/dashboard"/>)  }/>
              <Route exact path="/register" render={props => !isAuthenticated ?  (<Registration  {...props}  setAuth={setAuth} />)  : (<Redirect to="/"/>)  }  />
              <Route exact path="/dashboard" render={props => isAuthenticated ?  <Dashboard  {...props} setAuth={setAuth} />  :  (<Redirect  to="/" />) }/>
              <Route exact path="/dashboard/censusQA" render={props =>(<CensusQA/>)} />
              <Route exact path="/dashboard/censusForm" render={props =>(<CensusForm/>)} />
              <Route exact path="/dashboard/calendarGoogleMeet" render={props =>(<GoogleMeetCalendar/>)} />
              <Route exact path="/dashboard/meeting" render={props =>(<OnlineMeeting/>)} />
              <Route exact path="/dashboard/scheduleMeeting" render={props =>(<ScheduleMeeting/>)} />
              <Route path="/dashboard/meeting/shared" render={props =>(<SharedMeeting/>)} />
              <Route exact path="/final" render={props =>(<Final/>)} />
          </Switch>
        </div>
      </Router>
  
    </Fragment>
  );
}

export default App;
