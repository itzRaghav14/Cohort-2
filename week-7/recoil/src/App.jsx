import { useRecoilValue } from "recoil"
import { jobsAtom, messagingAtom, networkAtom, notificationAtom } from "./store/atoms"

function App() {
  const networkCount = useRecoilValue(networkAtom)
  const jobsCount = useRecoilValue(jobsAtom)
  const messagingCount = useRecoilValue(messagingAtom)
  const notificationCount = useRecoilValue(notificationAtom)
  
  return (
    <div>
      <Button title="Home" />
      
      <Button title="My Network" count={networkCount} />
      <Button title="Jobs" count={jobsCount} />
      <Button title="Messaging" count={messagingCount} />
      <Button title="Notifications" count={notificationCount} />

      <Button title="Me" />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Button = ({title, count}) => {

  if (count == 0) count = undefined
  else if (count >= 100) count = "99+"

  return (
    <button className="mx-4 pb-2 p-2 pt-2 space-x-2 border">
      {title} {count}
    </button>
  );
}

export default App
