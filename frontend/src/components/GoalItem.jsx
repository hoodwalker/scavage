import {useDispatch} from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'


function GoalItem({goal}) {
  const dispatch = useDispatch()
  
  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <p>{goal.text}</p>
        <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
    </div>
  )
}

export default GoalItem