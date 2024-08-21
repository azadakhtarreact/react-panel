// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical, Circle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress,
  UncontrolledDropdown
} from 'reactstrap'

const ProgressPage = ({itemData}) => {
  console.log('cc', itemData)
  return (
<>
<Progress
    className="my-2"
    multi
  >
    <Progress
      bar
      value="15"
    >
      Meh
    </Progress>
    <Progress
      bar
      color="success"
      value="30"
    >
      Wow!
    </Progress>
    <Progress
      bar
      color="info"
      value="25"
    >
      Cool
    </Progress>
    <Progress
      bar
      color="warning"
      value="20"
    >
      20%
    </Progress>
    <Progress
      bar
      color="#000"
      value="5"
    >
      !!
    </Progress>
  </Progress>
</>
  )
}
export default ProgressPage
