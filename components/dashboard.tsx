import { Component, ReactNode } from 'react'
import axios from 'axios'

type DashboardStatistics = {
  total_signup: number,
  total_active_today: number,
  average_active_weekly: number
} | undefined | null

type UserData = {
  email: string,
  name: string,
  logins_count: number,
  created_at: Date,
  last_login: Date,
  created_at_text?: string | undefined,
  last_login_text?: string | undefined
}

interface State {
    data: DashboardStatistics,
    userlist: Array<UserData> | []
}

interface Props {
    
}



class DashboardComponent extends Component<Props, State>{
  constructor(props: Props){
    super(props)

    this.state = {
      data: null,
      userlist: []
    }
  }

  async componentDidMount(){
    const res1 = await axios.post(`/api/users/get_session_data`)
    const res2 = await axios.post(`/api/users/get_average_sessions`, {
      back_date_count: 7
    })
    const res3 = await axios.post(`/api/users/list`, {
      page: 0
    })
    this.setState({
      data: {
        total_signup: res1.data.total_signup,
        total_active_today: res1.data.total_active_session_today,
        average_active_weekly: res2.data.average_weekly
      },
      userlist: res3.data
    })
  }

  render(): ReactNode {
    const { data, userlist } = this.state
    return <div>
      <div className='w-full grid grid-cols-3 text-center mb-8'>
        <div>Total Signup: {data?.total_signup ?? '-'}</div>
        <div>Total Active Session Today: {data?.total_active_today ?? '-'}</div>
        <div>Average Active User(Last 7 Days): {data?.average_active_weekly ?? '-'}</div>
      </div>    
      <table className="table-auto text-center border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th className='border border-slate-300 p-4'>Email</th>
            <th className='border border-slate-300 p-4'>Name</th>
            <th className='border border-slate-300 p-4'>Total Sign In</th>
            <th className='border border-slate-300 p-4'>Sign Up At</th>
            <th className='border border-slate-300 p-4'>Last Sign In</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map(userData => {

            return (         
              <tr>
                <td className='border border-slate-300 p-4'>{userData.email}</td>
                <td className='border border-slate-300 p-4'>{userData.name}</td>
                <td className='border border-slate-300 p-4'>{userData.logins_count}</td>
                <td className='border border-slate-300 p-4'>{userData.created_at_text}</td>
                <td className='border border-slate-300 p-4'>{userData.last_login_text}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  }
}

export default DashboardComponent