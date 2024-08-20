// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexRadiarChart = () => {
  const donutColors = {
    series1: '#0080ff',
    series2: '#e5f1f7',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'right'
    },
    labels: ['Connected', 'Not Connected'],

    colors: [donutColors.series2, donutColors.series1],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            fontWeight: 'bold',
            show: true,
            name: {
              fontSize: '0.7rem',
              fontWeight: 'bold',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
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
              formatter(val) {
                const sum = val?.config?.series.reduce((accumulator, current) => accumulator + current);
                return `${parseInt(sum)}`
              },
              label: 'Total',
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
            height: 400
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
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  // ** Chart Series
  const series = [2, 2]

  return (
    <>
    <Chart options={options} series={series} type='donut' height={350} />
    </>
  )
}

export default ApexRadiarChart
