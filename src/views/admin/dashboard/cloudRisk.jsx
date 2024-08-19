// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

// ** Custom Components

import moment from 'moment'
import { ChevronDown, Search, Download, FileText, File, ArrowDown, Grid, Plus } from 'react-feather'
  
import Chart from 'react-apexcharts'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardHeader,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupText,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Toast,
    Spinner,
    Badge,
    UncontrolledButtonDropdown,

} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'


const CloudRisk = props => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [selectedYear, setYear] = useState()
    // const [maxValue, setMaxValue] = useState(0)
    // const resData = useSelector(selectTotalOverviewList)
    const [years, setYears] = useState([])
    // const [today, setToday] = useState(moment().format('DD-MM-YYYY').toString())
    const navigate = useNavigate()

    // console.log('resData overview', years)
    const checkYear = moment().year()
    const total_sales_amount = []
    const month_name = []
    // let maxValue = 0

    // const years = [{ value: '2023', label: '2023' }]
    // useEffect(() => {
    //     // const newYear = years '05-09-2026'
    //     const today = moment().format('DD-MM-YYYY').toString()
    //     const onlyYear = moment().year() // moment(today).year()
 
    //     const check2023 = onlyYear > '2022' && onlyYear < '2024'
    //     const check2024 = onlyYear > '2023' && onlyYear < '2025'
    //     const check2025 = onlyYear > '2024' && onlyYear < '2026'
    //     const check2026 = onlyYear > '2025' && onlyYear < '2027'

    //     if (check2023) {
    //         // console.log('if if')
    //         const object = { value: '2023', label: '2023' }
    //         setYears([...years, object])
    //     } else if (check2024) {
    //         setYears([...years, { value: '2023', label: '2023' }, { value: '2024', label: '2024' }])
    //     } else if (check2025) {
    //         setYears([...years, { value: '2023', label: '2023' }, { value: '2024', label: '2024' }, { value: '2025', label: '2025' }])
    //     } else if (check2026) {
    //         setYears([...years, { value: '2023', label: '2023' }, { value: '2024', label: '2024' }, { value: '2025', label: '2025' }, { value: '2026', label: '2026' }])
    //     } else {
    //         // console.log('else', today, onlyYear)
    //         const object = { value: onlyYear, label: onlyYear }
    //         setYears([...years, object])
    //     }

    // }, [])

    // if (resData.length > 0) {
    //     resData.forEach((item) => {
    //         total_sales_amount.push(item.total_orders_amount)
    //         // if (item.total_orders_amount) {
    //         //     total_sales_amount.push(item.total_orders_amount)
    //         // }
    //     })
    // }

    // if (resData.length > 0) {
    //     resData.forEach((item) => {
    //         if (item.month) {
    //             month_name.push(item.month)
    //         }
    //     })
    // }

    // if (total_sales_amount.length > 0) {
    //     const changeValue = total_sales_amount
    //     maxValue = Math.max(...changeValue)
    // }

    // console.log('props', props)
    // const fetchData = async () => {
    //     const result = await dashboardListService({ token });
    //     if (result?.data?.status) {
    //         setLoading(false)
    //         dispatch(setTotalOverviewList(result?.data?.data?.sales_overview))
    //     } else {
    //         setLoading(false)
    //         // toast.success(result)
    //     }
    // }

    // console.log('why resData', resData)

    // const filterData = async (filter) => {
    //     //  console.log('why', filter)
    //     if (filter) {
    //         const result = await dashboardFilterOverviewService({ filter, token });
    //         if (result?.data?.status) {
    //             setLoading(false)
    //             dispatch(setTotalOverviewList(result?.data?.data?.sales_overview))
    //         } else {
    //             setLoading(false)
    //             // toast.success(result)
    //         }
    //     } else {
    //         const result = await dashboardListService({ token });
    //         if (result?.data?.status) {
    //             setLoading(false)
    //             dispatch(setTotalOverviewList(result?.data?.data?.sales_overview))
    //         } else {
    //             setLoading(false)
    //             // toast.success(result)
    //         }
    //     }
    // }

    // const handleFilter = (e) => {
    //     const selectedFilter = e?.value
    //     // console.log(e?.value)
    //     filterData(selectedFilter)
    // }

    // useEffect(() => {
    //     setLoading(true)
    //     setYear(checkYear.toString())
    //     if (checkYear) {
    //         fetchData()
    //     }
    //     const timeoutId = setTimeout(() => 3000)
    //     return function cleanup() {
    //         clearTimeout(timeoutId)
    //     }
    // }, [])

    const revenueOptions = {
        chart: {
            stacked: true,
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        grid: {
            // padding: {
            //     top: -20,
            //     bottom: -10
            // },
            yaxis: {
                lines: { show: true }
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: '#b9b9c3',
                    fontSize: '0.86rem'
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            // max: maxValue > 0 ? maxValue + 1 : 0,
            min: 0,
            max: 898,
            // max: 15000,
            tickAmount: 5,
            stepSize: 500,
            labels: {
                style: {
                    colors: '#b9b9c3',
                    fontSize: '0.86rem'
                },
                formatter: function (val) {
                    const check = val.toFixed(0)
                    // console.log('check', check)
                    if (check > 9999) {
                        return `${check.toString().slice(0, 2)}K`
                    } else if (check > 1999) {
                        return `${check.toString().slice(0, 1)}K`
                    } else if (check > 999) {
                        return `${check.toString().slice(0, 1)}K`
                    } else if (check > 500) {
                        return `${check}`
                    } else {
                        return `${check}`
                    }
                }

            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        colors: [props.primary, props.warning],
        plotOptions: {
            bar: {
                columnWidth: '17%',
                borderRadius: [5]
            },
            distributed: true
        },

    },
        revenueSeries = [
            {
                name: 'Sales',
                data: [95, 177, 284, 256, 105, 63, 168, 218, 72, 98, 92, 107]
            },
            // {
            //     name: 'Expense',
            //     data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
            // }
        ]

    if (isLoading) {
        return (
            <>
                <Fragment>
                    <Card>
                        <div className='parent'>
                            <div className='myHeight'>
                                <Spinner color='success' />
                            </div>
                        </div>
                    </Card>
                </Fragment>
            </>
        )
    }

    return (
        <>
            <Fragment>
               <div className="div">
               <Chart id='revenue-report-chart' type='bar' height='270' options={revenueOptions} series={revenueSeries} />
               </div>

            </Fragment>
        </>

    )
}

export default CloudRisk