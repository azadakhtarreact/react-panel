// ** Icons Import
import { Mail, Home, Circle, Clipboard, Users, MessageSquare, Lock, DollarSign, Settings, Database, Bell, BarChart2, Award, Sliders, Briefcase, Box, CreditCard, Edit, Umbrella, Shuffle } from "react-feather"

export default [
  {
    id: 'dashboard',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Circle size={12} />,
        navLink: '/'
      },
      {
        id: 'eCommerceDash',
        title: 'eCommerce',
        icon: <Circle size={12} />,
        navLink: '/admin/test'
      }
    ]
  }
]
