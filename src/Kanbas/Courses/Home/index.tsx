import ModuleList from '../Modules/List'
import StatusPage from './Status'
function Home() {
  return (
    <div>
      <h2>Home</h2>
      <div style={{ display: 'flex' }}>
        <div className="col-md-9">
          <ModuleList />
        </div>
        <div className="col-md-3">
          <StatusPage />
        </div>
      </div>
    </div>
  )
}
export default Home
