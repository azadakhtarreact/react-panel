// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexRadiarChart = () => {
  const donutColors = {
    series1: '#d00505fc',
    series2: '#ffe700',
    series3: '#d3d3d3',
    series4: '#008000',
    series5: '#FFA1A1'
  }


  // ** Chart Series
  const series = [7253, 36, 681, 1689]

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'right'
    },
    labels: ['Passed (7253)', 'Warning (681)', 'Not Available (36)', 'Failed (1689)'],
    // labels: ['Passed', 'Warning', 'Not Available', 'Failed'],

    colors: [donutColors.series4, donutColors.series3, donutColors.series2, donutColors.series1],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${parseInt(val)}`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '0.5rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '0.7rem',
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}`
              }
            },
            total: {
              show: true,
              fontSize: '0.8rem',
              // fontWeight: 'bold',
              position: 'top',
              label: 'Total',
              formatter(val) {
                // console.log('JustAdd', val?.config?.series)
                const sum = val?.config?.series.reduce((accumulator, current) => accumulator + current);
                return `${parseInt(sum)}`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <>
    <div>
    <Chart options={options} series={series} type='donut' height={230} />
    </div>
    </>
  )
}

export default ApexRadiarChart
